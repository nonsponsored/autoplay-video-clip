export class VideoClip {
	constructor(container) {
		// Wait for DOM
		window.addEventListener('load', () => {
			// Only if exists and OS has no preference set for prefers reduced motion
			if (container.prop && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
				return
			}
			
			// Set up elements
			this.container = container
			this.picture = this.container.querySelector('picture')
			this.video = this.container.querySelector('video')
			this.videoDesc = this.video.getAttribute('data-video-desc')
			this.videosrc = this.video.querySelector('source')
			this.datasrc = this.videosrc.getAttribute('data-src')
			
			// Initialize it
			this._init()
		})
	}

	_init() {		
		// Create Control Button
		this.clipControl = document.createElement('button')
		this.clipControl.setAttribute('type', 'button')
		this.clipControl.setAttribute('aria-live', 'assertive')
		this.clipControl.classList.add('video-clip-control')
		this.clipControl.textContent = 'Pause ' + this.videoDesc
		this.container.appendChild(this.clipControl)

		// Hide Image from Screen Readers
		this.picture.setAttribute('aria-hidden', 'true')
		
		// Set Video Source
		this.videosrc.setAttribute('src',this.datasrc);
		this.videosrc.removeAttribute('data-src');
			
		// Set Video Clip to Active
		this.container.classList.add('js-videoClip--active');
	
		// Load Video
		this.video.load();
		
		// Add Event Listeners
		this._addEventListeners()
	}
	
	
	_addEventListeners() {
		// Play Video After Transition
		this.video.addEventListener('transitionend', () => {
			this.video.play();
		});
		
		// Video Control
		this.clipControl.addEventListener('click', () => {
			if (this.video.paused || this.video.ended) {
				this.clipControl.classList.remove('video-clip-control--play')
				this.clipControl.classList.remove('video-clip-control--replay')
				this.clipControl.textContent = 'Pause ' + this.videoDesc
				this.video.play()
			} else {
				this.clipControl.classList.add('video-clip-control--play')
				this.clipControl.textContent = 'Play ' + this.videoDesc
				this.video.pause()
			}
		})
		
		// Set Replay State at End
		this.video.addEventListener('ended', () => {
			this.clipControl.classList.add('video-clip-control--replay')
			this.clipControl.textContent = 'Replay ' + this.videoDesc
		})	
	}
}
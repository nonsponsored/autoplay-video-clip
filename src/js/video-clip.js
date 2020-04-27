export class VideoClip {
	constructor(container) {
		
		this.container = document.querySelector(container)
		this.video = this.container.querySelector('video')
		this.videosrc = this.video.querySelector('source')
		this.datasrc = this.videosrc.getAttribute('data-src')
		this.replay = this.container.querySelector('.js-replay')
		
		
		this._init()
	}

	_init() {
		// Set Video Source
		this.videosrc.setAttribute('src',this.datasrc);
		this.videosrc.removeAttribute('data-src');
		
		// Set Active Class
		this.container.classList.add('js-video-clip--active');
	
		// Load Video
		this.video.load();
		
		// Play Video After Transition
		this.video.addEventListener('transitionend', () => {
			this.video.play();
		});
		
		// Handle Replay
		if(this.replay){
			// Show Replay Button at End
			this.video.addEventListener('ended', () => {
				this.replay.removeAttribute('hidden');
				const reflow = this.replay.offsetHeight;
				this.container.classList.add('js-video-clip--ended');
			})		
		
			// Replay Action
			this.replay.addEventListener('click', () => {
				this.container.classList.remove('js-video-clip--ended');
				this.video.play();
				this.replay.setAttribute('hidden','hidden');
			})
		}
	}
}



/*
export class VideoClip {
	constructor(element) {
		// Wait for DOM
		document.addEventListener('DOMContentLoaded', () => {
			[].map.call(document.querySelectorAll(element), (videoClip) => {
				const video = videoClip.querySelector('video'),
					  videosrc = videoClip.querySelector('source'),
					  datasrc = videosrc.getAttribute('data-src'),
					  replay = videoClip.querySelector('.js-replay');
				
				// Set Video Source
				videosrc.setAttribute('src',datasrc);
				videosrc.removeAttribute('data-src');
				
				// Set Active Class
				videoClip.classList.add('js-video-clip--active');
		
				// Load Video
				video.load();
				
				// Play Video After Transition
				video.addEventListener('transitionend', () => {
					video.play();
				});
				
				// Handle Replay
				if(replay){
					// Show Replay Button at End
					video.addEventListener('ended', () => {
						replay.removeAttribute('hidden');
						const reflow = replay.offsetHeight;
						videoClip.classList.add('js-video-clip--ended');
					})		
				
					// Replay Action
					replay.addEventListener('click', () => {
						videoClip.classList.remove('js-video-clip--ended');
						video.play();
						replay.setAttribute('hidden');
					})
				}
			})
		})
	}
}
*/
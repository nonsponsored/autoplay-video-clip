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
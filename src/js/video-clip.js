var manageVideoClips = function(trigger) {
	'use strict';
    
	[].map.call(document.querySelectorAll(trigger), function(videoClip){
		var video = videoClip.querySelector('video'),
			videosrc = videoClip.querySelector('source'),
			datasrc = videosrc.getAttribute('data-src'),
			replay = videoClip.querySelector('.js-replay');
		videosrc.setAttribute('src',datasrc);
		videosrc.removeAttribute('data-src');
		
		videoClip.classList.add('js-video-clip--active');

		video.load();
		
		video.addEventListener('transitionend', function() {
			video.play();
		});
		
		if(replay){
			video.onended = function() {
				videoClip.classList.add('js-video-clip--ended');
			};						
		
			replay.addEventListener('click', function() {
				videoClip.classList.remove('js-video-clip--ended');
				video.play();
			});
		}
	});	
};

window.addEventListener('load', function() {
	manageVideoClips('.js-video-clip');
}, false);
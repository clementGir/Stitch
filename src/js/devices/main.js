$(function() {

	// detect device
	var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

	if (is_firefox) {
		$('.section--devices li:nth-child(3)').addClass('authorised');
	}

	if (window.DeviceOrientationEvent) {

	  window.addEventListener('deviceorientation', function(eventData) {
	    
	    var tiltLR = eventData.gamma;

	    if (tiltLR) {
	    	$('.section--devices li:nth-child(1)').addClass('authorised');
		    $('.section--devices li:nth-child(2)').addClass('authorised');
	    }
	    else {
	    	$('.section--devices li:nth-child(3)').addClass('authorised');
	    }

	  }, false);
	} 
	else {
	  $('.section--devices li:nth-child(3)').addClass('authorised');
	}



	$('li').hover(function(e) {
		$(this).closest('li').toggleClass('active');
	}); 

	$('.homeLink').click(function(e) {
		e.preventDefault();
		$('body').addClass('homeLink--clicked');

		setTimeout(function(){
			window.location.href = "?p=home";
		}, 1000);
	});

	$('.appLink').click(function(e) {
		e.preventDefault();
		$('body').addClass('homeLink--clicked');

		var el = this;
		setTimeout(function(){
			
			if (el.classList[0] == 'vr') {
				window.location.href = "?p=appvr";
			}
			else if (el.classList[0] == 'gyro') {
				window.location.href = "?p=appgyro";
			}
			else if (el.classList[0] == 'computer') {
				window.location.href = "?p=app";
			}
			
		}, 1000);
	});
});
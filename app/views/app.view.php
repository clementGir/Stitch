<div class="loader">
	<div class="square"></div>
	<div class="mask"></div>
</div>

<section class="section--app">
	<a class='homeLink'>
		<p>stitch</p>
	</a>
	<button class="audio-btn">
		<span class="audio-btn--container">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</span>
	</button>
</section>

<script src="assets/js/pace.min.js"></script>
<script>
/*
* Debug parameters.
*/
WebVRConfig = {
//FORCE_ENABLE_VR: true, // Default: false.

// Complementary filter coefficient. 0 for accelerometer, 1 for gyro.
//K_FILTER: 0.98, // Default: 0.98.

// How far into the future to predict during fast motion.
//PREDICTION_TIME_S: 0.050, // Default: 0.050s.

// Flag to disable touch panner. In case you have your own touch controls
//TOUCH_PANNER_DISABLED: true, // Default: false.

// Enable yaw panning only, disabling roll and pitch. This can be useful
// for panoramas with nothing interesting above or below.
//YAW_ONLY: true, // Default: false.

// To disable keyboard and mouse controls, if you want to use your own
// implementation.
//MOUSE_KEYBOARD_CONTROLS_DISABLED: true, // Default: false.

// Prevent the polyfill from initializing immediately. Requiures the app
// to call InitializeWebVRPolyfill() before it can be used.
//DEFER_INITIALIZATION: true, // Default: false.

// Enable the deprecated version of the API (navigator.getVRDevices)
//ENABLE_DEPRECATED_API: true, // Default: false.

// Scales the recommended buffer size reported by WebVR, which can improve
// performance.
BUFFER_SCALE: 0.5, // Default: 1.0.

// Allow VRDisplay.submitFrame to change gl bindings, which is more
// efficient if the application code will re-bind it's resources on the
// next frame anyway. This has been seen to cause rendering glitches with
// THREE.js.
// Dirty bindings include: gl.FRAMEBUFFER_BINDING, gl.CURRENT_PROGRAM,
// gl.ARRAY_BUFFER_BINDING, gl.ELEMENT_ARRAY_BUFFER_BINDING,
// and gl.TEXTURE_BINDING_2D for texture unit 0
DIRTY_SUBMIT_FRAME_BINDINGS: true // Default: false.
};
</script>
<script src="assets/js/three.js"></script>

<script src="assets/js/VRControls.js"></script> 
<script src="assets/js/VREffect.js"></script>
<script src="assets/js/webvr-polyfill.js"></script>
<script src="assets/js/webvr-manager.js"></script> 



<script id="vertexShader" type="x-shader/x-vertex">
uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
void main() 
{
    vec3 vNormal = normalize( normalMatrix * normal );
	vec3 vNormel = normalize( normalMatrix * viewVector );
	intensity = pow( c - dot(vNormal, vNormel), p );
	
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
</script>

<script id="fragmentShader" type="x-shader/x-vertex"> 
uniform vec3 glowColor;
varying float intensity;
void main() 
{
	vec3 glow = glowColor * intensity;
    gl_FragColor = vec4( glow, 1.0 );
}
</script>
<script src="assets/js/jquery-2.2.3.min.js"></script>
<script src="assets/js/reticulum.js"></script>
<script src="assets/js/Webaudio.js"></script>
<script src="assets/js/Tween.js"></script>
<script src="assets/js/threex.dynamictexture.js"></script>
<script src="assets/js/scripts.min.js"></script>
<script type="text/javascript">

	var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");

	if(isIOSChrome){
	   // is Google Chrome on IOS
	   $('body').addClass('notChrome');
	} else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
	} else { 
	   $('body').addClass('notChrome');
	}

	$('.homeLink').hover(function() {
		$('body').toggleClass('homeLink--Hovered');
	});
	$('.homeLink').click(function(e) {
		e.preventDefault();
		$('body').addClass('homeLink--clicked');

		setTimeout(function(){
			window.location.href = "/";
		}, 1000);
	});

	for (var i = 0; i < 1; i++ ) {
		setTimeout(function(){
			if ($('body').hasClass('pace-done')) {
				setTimeout(function(){
					$('.app').addClass('maskOff');
				}, 1100);
			}
			else {
				i = 0;
			}
		}, 1500);
	}

	// allow audio on iOS by playing a muted sound on touch
	window.addEventListener('touchstart', function() {

		// create empty buffer
		var buffer = webaudio._ctx.createBuffer(1, 1, 22050);
		var source = webaudio._ctx.createBufferSource();
		source.buffer = buffer;

		// connect to output (your speakers)
		source.connect(webaudio._ctx.destination);

		// play the file
		source.noteOn(0);

	}, false);

	//toggle audio on off
	$('.audio-btn').click(function() {
		$('.audio-btn').toggleClass('muted');

		if (!webaudio._muted) {
			webaudio._muted = true;			

		  	sound1._gainNode.gain.value = 0;
			sound2._gainNode.gain.value = 0;
			sound3._gainNode.gain.value = 0;
			sound4._gainNode.gain.value = 0;
			sound5._gainNode.gain.value = 0;
			sound6._gainNode.gain.value = 0;
			sound7._gainNode.gain.value = 0;
			sound8._gainNode.gain.value = 0;
			sound9._gainNode.gain.value = 0;
			sound10._gainNode.gain.value = 0;
			sound11._gainNode.gain.value = 0;
			sound12._gainNode.gain.value = 0;
			sound13._gainNode.gain.value = 0;
			sound14._gainNode.gain.value = 0;
			sound15._gainNode.gain.value = 0;
			sound16._gainNode.gain.value = 0;
			sound17._gainNode.gain.value = 0;
			sound18._gainNode.gain.value = 0;
			sound19._gainNode.gain.value = 0;
			sound20._gainNode.gain.value = 0;
			sound21._gainNode.gain.value = 0;
			sound22._gainNode.gain.value = 0;
			sound23._gainNode.gain.value = 0;
			sound24._gainNode.gain.value = 0;
			sound25._gainNode.gain.value = 0;
			sound26._gainNode.gain.value = 0;
			sound27._gainNode.gain.value = 0;
			sound28._gainNode.gain.value = 0;
			sound29._gainNode.gain.value = 0;
			sound30._gainNode.gain.value = 0;
			sound31._gainNode.gain.value = 0;
			sound32._gainNode.gain.value = 0;
			sound33._gainNode.gain.value = 0;
			sound34._gainNode.gain.value = 0;
			sound35._gainNode.gain.value = 0;
			sound36._gainNode.gain.value = 0;
			sound37._gainNode.gain.value = 0;
			sound38._gainNode.gain.value = 0;
			sound39._gainNode.gain.value = 0;
			sound40._gainNode.gain.value = 0;
			sound41._gainNode.gain.value = 0;
			sound42._gainNode.gain.value = 0;
			sound43._gainNode.gain.value = 0;
			sound44._gainNode.gain.value = 0;
			sound45._gainNode.gain.value = 0;
			sound46._gainNode.gain.value = 0;
			sound47._gainNode.gain.value = 0;
			sound48._gainNode.gain.value = 0;
			sound49._gainNode.gain.value = 0;
			sound50._gainNode.gain.value = 0;
			sound51._gainNode.gain.value = 0;
			sound52._gainNode.gain.value = 0;
			sound53._gainNode.gain.value = 0;
			sound54._gainNode.gain.value = 0;
			sound55._gainNode.gain.value = 0;
			sound56._gainNode.gain.value = 0;
			sound57._gainNode.gain.value = 0;
			sound58._gainNode.gain.value = 0;
			sound59._gainNode.gain.value = 0;
			sound60._gainNode.gain.value = 0;
			sound61._gainNode.gain.value = 0;
			sound62._gainNode.gain.value = 0;
			sound63._gainNode.gain.value = 0;
			sound64._gainNode.gain.value = 0;
			sound65._gainNode.gain.value = 0;
			sound66._gainNode.gain.value = 0;
			sound67._gainNode.gain.value = 0;
			sound68._gainNode.gain.value = 0;
			sound69._gainNode.gain.value = 0;
			sound70._gainNode.gain.value = 0;
			sound71._gainNode.gain.value = 0;
			sound72._gainNode.gain.value = 0;
			sound73._gainNode.gain.value = 0;
			sound74._gainNode.gain.value = 0;
			sound75._gainNode.gain.value = 0;
			sound76._gainNode.gain.value = 0;
			sound77._gainNode.gain.value = 0;
			sound78._gainNode.gain.value = 0;
			sound79._gainNode.gain.value = 0;
			sound80._gainNode.gain.value = 0;
			sound81._gainNode.gain.value = 0;
			sound82._gainNode.gain.value = 0;
			sound83._gainNode.gain.value = 0;
			sound84._gainNode.gain.value = 0;
			sound85._gainNode.gain.value = 0;
			sound86._gainNode.gain.value = 0;
			sound87._gainNode.gain.value = 0;
			sound88._gainNode.gain.value = 0;
			sound89._gainNode.gain.value = 0;
			sound90._gainNode.gain.value = 0;
			sound91._gainNode.gain.value = 0;
			sound92._gainNode.gain.value = 0;
			sound93._gainNode.gain.value = 0;
		}
		else {
			webaudio._muted = false;

		  	sound1._gainNode.gain.value = 1;
			sound2._gainNode.gain.value = 1;
			sound3._gainNode.gain.value = 1;
			sound4._gainNode.gain.value = 1;
			sound5._gainNode.gain.value = 1;
			sound6._gainNode.gain.value = 1;
			sound7._gainNode.gain.value = 1;
			sound8._gainNode.gain.value = 1;
			sound9._gainNode.gain.value = 1;
			sound10._gainNode.gain.value = 1;
			sound11._gainNode.gain.value = 1;
			sound12._gainNode.gain.value = 1;
			sound13._gainNode.gain.value = 1;
			sound14._gainNode.gain.value = 1;
			sound15._gainNode.gain.value = 1;
			sound16._gainNode.gain.value = 1;
			sound17._gainNode.gain.value = 1;
			sound18._gainNode.gain.value = 1;
			sound19._gainNode.gain.value = 1;
			sound20._gainNode.gain.value = 1;
			sound21._gainNode.gain.value = 1;
			sound22._gainNode.gain.value = 1;
			sound23._gainNode.gain.value = 1;
			sound24._gainNode.gain.value = 1;
			sound25._gainNode.gain.value = 1;
			sound26._gainNode.gain.value = 1;
			sound27._gainNode.gain.value = 1;
			sound28._gainNode.gain.value = 1;
			sound29._gainNode.gain.value = 1;
			sound30._gainNode.gain.value = 1;
			sound31._gainNode.gain.value = 1;
			sound32._gainNode.gain.value = 1;
			sound33._gainNode.gain.value = 1;
			sound34._gainNode.gain.value = 1;
			sound35._gainNode.gain.value = 1;
			sound36._gainNode.gain.value = 1;
			sound37._gainNode.gain.value = 1;
			sound38._gainNode.gain.value = 1;
			sound39._gainNode.gain.value = 1;
			sound40._gainNode.gain.value = 1;
			sound41._gainNode.gain.value = 1;
			sound42._gainNode.gain.value = 1;
			sound43._gainNode.gain.value = 1;
			sound44._gainNode.gain.value = 1;
			sound45._gainNode.gain.value = 1;
			sound46._gainNode.gain.value = 1;
			sound47._gainNode.gain.value = 1;
			sound48._gainNode.gain.value = 1;
			sound49._gainNode.gain.value = 1;
			sound50._gainNode.gain.value = 1;
			sound51._gainNode.gain.value = 1;
			sound52._gainNode.gain.value = 1;
			sound53._gainNode.gain.value = 1;
			sound54._gainNode.gain.value = 1;
			sound55._gainNode.gain.value = 1;
			sound56._gainNode.gain.value = 1;
			sound57._gainNode.gain.value = 1;
			sound58._gainNode.gain.value = 1;
			sound59._gainNode.gain.value = 1;
			sound60._gainNode.gain.value = 1;
			sound61._gainNode.gain.value = 1;
			sound62._gainNode.gain.value = 1;
			sound63._gainNode.gain.value = 1;
			sound64._gainNode.gain.value = 1;
			sound65._gainNode.gain.value = 1;
			sound66._gainNode.gain.value = 1;
			sound67._gainNode.gain.value = 1;
			sound68._gainNode.gain.value = 1;
			sound69._gainNode.gain.value = 1;
			sound70._gainNode.gain.value = 1;
			sound71._gainNode.gain.value = 1;
			sound72._gainNode.gain.value = 1;
			sound73._gainNode.gain.value = 1;
			sound74._gainNode.gain.value = 1;
			sound75._gainNode.gain.value = 1;
			sound76._gainNode.gain.value = 1;
			sound77._gainNode.gain.value = 1;
			sound78._gainNode.gain.value = 1;
			sound79._gainNode.gain.value = 1;
			sound80._gainNode.gain.value = 1;
			sound81._gainNode.gain.value = 1;
			sound82._gainNode.gain.value = 1;
			sound83._gainNode.gain.value = 1;
			sound84._gainNode.gain.value = 1;
			sound85._gainNode.gain.value = 1;
			sound86._gainNode.gain.value = 1;
			sound87._gainNode.gain.value = 1;
			sound88._gainNode.gain.value = 1;
			sound89._gainNode.gain.value = 1;
			sound90._gainNode.gain.value = 1;
			sound91._gainNode.gain.value = 1;
			sound92._gainNode.gain.value = 1;
			sound93._gainNode.gain.value = 1;
		}
		
	});
	
	

</script>










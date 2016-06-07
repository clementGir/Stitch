// Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
// Only enable it if you actually need to.
var renderer = new THREE.WebGLRenderer({antialias: true}); //vr: false
//renderer.setPixelRatio(window.devicePixelRatio); //vr: uncoment
//renderer.setPixelRatio((window.devicePixelRatio || 1) * 2); //vr: coment

renderer.setClearColor(new THREE.Color(0xbebebe, 1.0));

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement)
             .className = "app";
 
// Create a three.js scene.
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0xbebebe, 0.001 );

// Create a three.js camera.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15000);

// Apply VR headset positional data to camera.
var controls = new THREE.VRControls(camera);


// Apply VR stereo rendering to renderer.
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

// VR manager helper to enter and exit VR mode.
var params = {
  hideButton: false, // Default: false.
  isUndistorted: true // Default: false.
};
var manager = new WebVRManager(renderer, effect, params);
var particles = [];




var floorMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: true, transparent: true, opacity: 0.2, overdraw: 0.5 } );
var floorGeometry = new THREE.PlaneGeometry(10000, 10000, 100, 100);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.name = 'floor';
floor.position.y = -100;
floor.rotation.x = Math.PI / 2;
scene.add(floor);




// -> reticle
Reticulum.init(camera, {
    proximity: false,
    clickevents: false,
    near: null, //near factor of the raycaster (shouldn't be negative and should be smaller than the far property)
    far: null, //far factor of the raycaster (shouldn't be negative and should be larger than the near property)
    reticle: {
        visible: true,
        restPoint: 0.9, //Defines the reticle's resting point when no object has been targeted
        color: 0x000000,
        innerRadius: 0.0001,
        outerRadius: 0.004, 
        hover: {
            color: 0x000000,
            innerRadius: 0.0101,
            outerRadius: 0.014,
            speed: 3,
            vibrate: 0 //Set to 0 or [] to disable
        }
    },
    fuse: {
        visible: true,
        duration: 1,
        color: 0x000000,
        innerRadius: 0.025,
        outerRadius: 0.035,
        vibrate: 0, //Set to 0 or [] to disable
        clickCancelFuse: false //If users clicks on targeted object fuse is canceled
    }
});
scene.add(camera);

// wait for typekit finished
var check_interval = 100;

var count = 0;
//var count_limit = give_up_after_ms / check_interval;
var html = $("html");
var font_loaded_check_interval;

var check_load_status = function(callback) {

    if(html.hasClass("wf-active")) {

        // fonts are loaded or give_up_after_ms was reached

        if(font_loaded_check_interval) {
            clearInterval(font_loaded_check_interval);
            font_loaded_check_interval = null;
        }

        // call the callback
        callback.call(this);
        return true;

    }

    count++;
    return false;

};

function doneCallback() {
    // code to run when fonts are loaded or timeout reached
    drawTutorial();
}

if( ! check_load_status(doneCallback)) {
    font_loaded_check_interval = setInterval(function() {
        check_load_status(doneCallback);
    }, check_interval);
}



// Request animation frame loop function
var lastRender = 0;
function animate(timestamp) {


  var delta = Math.min(timestamp - lastRender, 500);
  lastRender = timestamp;

  
  Reticulum.update();
  controls.update();
  camera.updateMatrixWorld();
  manager.render(scene, camera, timestamp); 
  requestAnimationFrame(animate);
  updateParticles();
  TWEEN.update(timestamp);
}

// Kick off animation loop
animate(performance ? performance.now() : Date.now());

function onResize(e) {
  effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', onResize, true);
window.addEventListener('vrdisplaypresentchange', onResize, true);
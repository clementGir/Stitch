//javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();stats.domElement.style.cssText='position:fixed;left:0;top:0;z-index:10000';document.body.appendChild(stats.domElement);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()

// Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
// Only enable it if you actually need to.
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
//renderer.setClearColor( 0x000000 );

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene.
var scene = new THREE.Scene();

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
  isUndistorted: false // Default: false.
};
var manager = new WebVRManager(renderer, effect, params);
// var mixer, boardOnebutton, mesh, material, start, updateFcts = [];



// -> lightSphere (for transitions)
var lightSpheregeometry = new THREE.SphereGeometry(1, 1, 1); 
var lightSpherematerial = new THREE.MeshBasicMaterial({ 
  color: 0x000000, 
  transparent: true,
  opacity: 0,
  side: THREE.BackSide, 
}); 
var lightSphere = new THREE.Mesh(lightSpheregeometry, lightSpherematerial); // Create a mesh based on the specified geometry (cube) and material (blue skin).
//scene.add(lightSphere);


// Create 3D objects.
var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);

// Position cube mesh
cube.position.z = -1;

// Add cube mesh to your three.js scene
scene.add(cube);




// -> reticle
// Reticulum.init(camera, {
//     proximity: false,
//     clickevents: true,
//     near: null, //near factor of the raycaster (shouldn't be negative and should be smaller than the far property)
//     far: null, //far factor of the raycaster (shouldn't be negative and should be larger than the near property)
//     reticle: {
//         visible: true,
//         restPoint: 0.9, //Defines the reticle's resting point when no object has been targeted
//         color: 0x111111,
//         innerRadius: 0.0001,
//         outerRadius: 0.004, 
//         hover: {
//             color: 0x111111,
//             innerRadius: 0.0101,
//             outerRadius: 0.014,
//             speed: 3,
//             vibrate: 0 //Set to 0 or [] to disable
//         }
//     },
//     fuse: {
//         visible: false,
//         duration: 1,
//         color: 0x111111,
//         innerRadius: 0.03,
//         outerRadius: 0.035,
//         vibrate: 0, //Set to 0 or [] to disable
//         clickCancelFuse: false //If users clicks on targeted object fuse is canceled
//     }
// });
// scene.add(camera);



//drawPrairie();
//drawPitchWorld();
//drawMusic();




  


// Request animation frame loop function
var lastRender = 0;
function animate(timestamp) {
  var delta = Math.min(timestamp - lastRender, 500);
  lastRender = timestamp;
  

  //updateParticles();
  //Reticulum.update();
  controls.update();
  //camera.updateMatrixWorld();
  manager.render(scene, camera, timestamp); 
  requestAnimationFrame(animate);
  
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
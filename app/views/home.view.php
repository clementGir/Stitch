<!-- HEADER -->
<header>
	<a class="info">
		<span></span>
	</a>
</header>

<!-- HOME -->
<section class="section--home">
	<h1>
    <span>stitch</span>
  </h1>
	<h2>
    <span>An immersive webGL beat maker using webVR</span>
  </h2>
	<a class="tour">
    <p>Take a tour</p> 
    <span>
      <svg viewBox="0 0 20 30">  
        <line fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="7" y1="7" x2="1" y2="13"/>
  
        <line fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="1" x2="7" y2="7"/>
      </svg>
    </span> 
  </a>
</section>

<!-- INFO -->
<section class="section--info">
	<header>
		<a class="close--info">
			<svg viewBox="0 0 14 14">
        <line fill="none" stroke="#8500ff" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="1" x2="11" y2="11" stroke-width="2px"/>
        <line fill="none" stroke="#8500ff" stroke-linecap="round" stroke-miterlimit="10" x1="11" y1="1" x2="1" y2="11" stroke-width="2px"/>
      </svg>
		</a>
	</header>

	<div class="container">
    <svg width="200px" height="200px" viewBox="0 0 200 200">
      <g>
        <polygon fill="#8E4FC5" points="72.167,173.667 68.167,85 166.833,126.667  "/>
        <polygon fill="#BA7DF3" points="68.167,85 126.5,26.333 166.833,126.667  "/>
        <polygon fill="#CA8CFF" points="68.167,85 33.167,76.5 126.5,26.333  "/>
        <polygon fill="#9F61D8" points="33.167,76.5 72.167,173.667 68.167,85  "/>
      </g>
    </svg>
		
    <h2>About</h2>
		<p>Stitch uses a combination of virtual reality, audio spatialisation and simple 3D shapes to create soundscapes. As the shapes move around you, your goal is to play and loop them to create different beats and environments.</p>

		<h2>Process</h2>
		<p>Stitch was imagined and brought to life as a student project for <a href='http://dwm.re' target='_blank'>DWM</a>. The main idea behind the project was to take part in the arisen of virtual reality on the web and as such, the whole project is open source and can be forked on <a href='' target='_blank'>github</a>.
    </p>

	</div>
</section>

<!-- SCRIPTS -->
<script src="assets/js/jquery-2.2.3.min.js"></script>
<script type="text/javascript">
	// Show Info
	$('.info').on('click',function() {
		$('.section--info').addClass('info--opened');
	});

	$('.close--info').on('click',function() {
		$('.section--info').removeClass('info--opened');
	});

  // Page transition (leaving)
  $('.tour').click(function(e) {
    e.preventDefault();
    $('body').addClass('leaving');
    setTimeout(function() {
      window.location.href = "?p=devices";
    }, 1150);
  });

</script>

<script src="assets/js/three.js"></script>
<script type="text/javascript">

  
  var _w = window.innerWidth;
  var _h = window.innerHeight;
  var aspect = _w/ _h;
  var scene = new THREE.Scene(); 
  var camera = new THREE.PerspectiveCamera( 65,  _w/_h, 0.1, 1000 );
  camera.position.z = 10; 
  var renderer = new THREE.WebGLRenderer({ antialias: true } ); 
  renderer.setClearColor(new THREE.Color(0x8500FF, 1.0));
  renderer.setSize( _w, _h ); 

  document.body.appendChild( renderer.domElement )
               .className = "circles";

  scene.fog = new THREE.FogExp2( 0x8500ff, 0.004 );
  var light = new THREE.HemisphereLight( 0x848785, 0x3C3D39, 2.18 );
  scene.add( light );

  var particles = [];
  makeParticles(); 

  function makeParticles() { 
    
    var particle, material; 
    

    // we're gonna move from z position -1000 (far away) 
    // to 1000 and add a random particle at every pos. 

    var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x8500ff, wireframe: true, transparent: true } ); 
    var darkMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, overdraw: 0.5, shading: THREE.FlatShading } );
    var multiMaterial = [darkMaterial];

    var ct = 0;

    for ( var zpos= -1500; zpos < 1500; zpos+=20 ) {

      if (ct == 0) {
        // octahedron
        var particle = THREE.SceneUtils.createMultiMaterialObject( 
        new THREE.OctahedronGeometry( 20, 0 ), 
        multiMaterial );        
      }

      if (ct == 1) {
        // icosahedron
        var particle = THREE.SceneUtils.createMultiMaterialObject( 
        new THREE.IcosahedronGeometry( 20, 0 ), 
        multiMaterial );
      }

      if (ct == 2) {
        // Tetrahedron
        var particle = THREE.SceneUtils.createMultiMaterialObject( 
        new THREE.TetrahedronGeometry( 20, 0 ), 
        multiMaterial );
      }

      if (ct == 3) {
        // cube
        var particle = THREE.SceneUtils.createMultiMaterialObject( 
        new THREE.CubeGeometry( 20, 20, 20 ,1 ,1 ,1 ), 
        multiMaterial );
      }

      if (ct == 4) {
        // Pyramid
        var particle = THREE.SceneUtils.createMultiMaterialObject( 
        new THREE.CylinderGeometry( 0, 20, 50, 4, 4 ), 
        multiMaterial );
      }

      if (ct == 5) {
        // Pyramid
        var particle = THREE.SceneUtils.createMultiMaterialObject( 
        new THREE.IcosahedronGeometry( 20, 1 ), 
        multiMaterial );
      }

      if (ct < 5) {
        ct += 1;
      }
      else {
        ct = 0;
      }


      // give it a random x position between -500 and 500
      particle.position.x = Math.random() * 1000 - 500;

      // give it z position
      var el = Math.random();
      if (el > 0.4) {
        particle.position.z = -150;
      }
      if (el > 0.2) {
        particle.position.z = -200;
      }
      else {
        particle.position.z = -250;
      }
      function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      // give it a random rotation
      var elx = getRandomInt(0, 6.2);
      var ely = getRandomInt(0, 6.2);
      var elz = getRandomInt(0, 6.2);
      particle.children[0].rotation.set(elx,ely,elz);

      


      

      // set its y position
      particle.position.y = zpos;

      // add it to the scene.
      scene.add(particle);
      // and to the array of particles. 
      particles.push(particle); 
    } 
  }

  function updateParticles() { 

    // loop through every particle
    for(var i=0; i<particles.length; i++) {

      particle = particles[i]; 


     
      particle.position.y +=  1;
          

      // rotate it
      particle.rotation.x += 0.025;
      particle.rotation.z += 0.025;

      // if the particle is too close move it to the back
      if(particle.position.y>1500) particle.position.y-=2500; 
    }
  }




  var loop = function loop() {
    requestAnimationFrame(loop);
    updateParticles();
    renderer.render(scene, camera);

  };

loop();

function onResize(e) {
  renderer.setSize( window.innerWidth, window.innerHeight ); 
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', onResize, true);

// Page transition (entering)
if ($('body').has('.circles')) {
  $('body').addClass('circlesLoaded');
  setTimeout(function() {
    $('.tour').addClass('loaded');
  }, 2000);
}


</script>




















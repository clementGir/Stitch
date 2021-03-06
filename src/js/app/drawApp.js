function drawApp() {
	makeParticles(); 	
};

function makeParticles() { 
		
	var particlesGroup = new THREE.Group();
	particlesGroup.name = 'particles';

	var particle, material; 
	var ct = 0;

	var wireframeMaterial = new THREE.MeshLambertMaterial( { color: 0x8500ff, wireframe: true, transparent: true } ); 
	var darkMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, overdraw: 0.5, shading: THREE.FlatShading } );
	var multiMaterial = [ darkMaterial, wireframeMaterial ];

	
	// we're gonna move from z position -1500 (far away) 
	// to 1500 and add a random particle at every pos. (150 in total)
	for ( var zpos= -1500; zpos < 1500; zpos+=20 ) {

		// set a counter from 0 to 5 to draw different 3d shapes
		ct<5 ? ct+=1 : ct=0;

		switch(ct) {
		    case 0:
		        // octahedron
				var particle = THREE.SceneUtils.createMultiMaterialObject( 
				new THREE.OctahedronGeometry( 20, 0 ), 
				multiMaterial );
		    break;

		    case 1:
			    // icosahedron
				var particle = THREE.SceneUtils.createMultiMaterialObject( 
				new THREE.IcosahedronGeometry( 20, 0 ), 
				multiMaterial );
		    break;

		    case 2:
			    // Tetrahedron
				var particle = THREE.SceneUtils.createMultiMaterialObject( 
				new THREE.TetrahedronGeometry( 20, 0 ), 
				multiMaterial );
		    break;

		    case 3:
		    	// Cube
			    var particle = THREE.SceneUtils.createMultiMaterialObject( 
				new THREE.CubeGeometry( 20, 20, 20 ,1 ,1 ,1 ), 
				multiMaterial );
		    break;

		    case 4:
			    // Pyramid
				var particle = THREE.SceneUtils.createMultiMaterialObject( 
				new THREE.CylinderGeometry( 0, 20, 50, 4, 4 ), 
				multiMaterial );
		    break;

		    case 5:
			    // Pyramid
				var particle = THREE.SceneUtils.createMultiMaterialObject( 
				new THREE.IcosahedronGeometry( 20, 1 ), 
				multiMaterial );
		    break;
		}

		
		// Name the particle and it's children for clarity
		particle.name = 'particle';
		particle.children[0].name = 'shape';
		particle.children[1].name = 'wireframe';


		// give it a random x and y position between -500 and 500
		particle.position.x = Math.random() * 1000 - 500;
		particle.position.y = Math.random() * 1000 - 500;


		// Scale it down so we can animate it's arrival afterwards
		particle.scale.set(0.001,0.001,0.001);


		// prevent colision with the camera
		isFacingCamera(particle.position);

		function isFacingCamera(shape) {
			if ((shape.x > -80 && shape.x < 80) && (shape.y > -80 && shape.y < 80)) {
				shape.x = Math.random() * 1000 - 500;
				shape.y = Math.random() * 1000 - 500;
				isFacingCamera(shape);
			}
		}
		

		// set its z position
		particle.position.z = zpos;


		// create the objects.
		scene.add(particlesGroup);
		particlesGroup.add(particle);
		particles.push(particle); 
	}	
	
	// Loop through each particles
	var ceci;
	for (var i = 0; i < particles.length; i++) {

		var shape = particles[i].getObjectByName( 'shape' );
		var wireframe = particles[i].getObjectByName( 'wireframe' );

		// give it a random rotation
		var elx = getRandomInt(0, 6.2);
		var ely = getRandomInt(0, 6.2);
		var elz = getRandomInt(0, 6.2);

		shape.rotation.set(elx,ely,elz);
		wireframe.rotation.set(elx,ely,elz);
		wireframe.scale.set(0.01,0.01,0.01);	
		

		// assign a different sound for each
		particles[i].sound = chooseRandomSound();
		// other particle states
		particles[i].playing = false;
		particles[i].action = 0;
		particles[i].hasTempo = false;
		particles[i].tempoVisible = false;
		
		Reticulum.add( shape, {
			clickCancelFuse: false, // Overrides global setting for fuse's clickCancelFuse
	        reticleHoverColor: 0xffffff, // Overrides global reticle hover color
	        fuseVisible: true, // Overrides global fuse visibility
	        fuseDuration: 1.5, // Overrides global fuse duration
	        fuseColor: 0xffffff, // Overrides global fuse color
			onGazeOver: function(){	

				// scale particle up 
				shapeHover(this);

			    // get particle sound				    
		    	var sound = window[this.parent.sound];
				
				// move this out of ongazeover?
				// audio settings
				var context = sound._context;
				var source = sound._source;
				var panner = sound._panner;

				// for spatial audio
				panner.panningModel = "HRTF";
				panner.refDistance = 150;

				source.connect(panner);
				panner.connect(context.destination);

				// Play particle sound
				sound.play();		
			},
			onGazeOut: function(){
				
				
				this.parent.action = 0;

				// scale particle up					
				shapeStopHover(this);					
				
			},
			onGazeLong: function(){	

				// Create tempo menu if it doesnt exist
				if (!this.parent.hasTempo) {
					createTempoMenu(this.parent);
				}	

				// forces a gazeout before accepting a new action
				this.parent.action += 1;

				if (this.parent.action == 1) {						
					 
					var tempoMenu = this.parent.getObjectByName( 'tempoMenu' );

					if (!this.parent.playing && !this.parent.tempoVisible) {
						this.parent.tempoVisible = true;
						showTempo(tempoMenu);
					}
					else if (!this.parent.playing && this.parent.tempoVisible) {
						this.parent.tempoVisible = false;
						hideTempo(tempoMenu);
					}

					explode(this.parent.children[1], this.parent.sound);
										
				}				
											
			}
		});



		function showTempo(tempo) {					

			var coordsButtonsScaleUp = { x: 0.01 };
		    var buttonsScaleUp = new TWEEN.Tween(coordsButtonsScaleUp)
		    .to({x: 1}, 500);

		    var coordsButtonsRotate = { z: 0 };
		    var buttonsRotate = new TWEEN.Tween(coordsButtonsRotate)
		    .to({z: -3.14159}, 500);

			var coordsMoveUp = { y: 0 };
		    var buttonsMoveUp = new TWEEN.Tween(coordsMoveUp)
		    .to({y: 100}, 500);

		    var coordsMoveRight = { x: 0 };
		    var buttonsMoveRight = new TWEEN.Tween(coordsMoveRight)
		    .to({x: 100}, 500);

		    var coordsMoveDown = { y: 0 };
		    var buttonsMoveDown = new TWEEN.Tween(coordsMoveDown)
		    .to({y: -100}, 500);

		    var coordsMoveLeft = { x: 0 };
		    var buttonsMoveLeft = new TWEEN.Tween(coordsMoveLeft)
		    .to({x: -100}, 500);

		    buttonsScaleUp.onUpdate(function() {
		    	tempo.children[0].scale.set(coordsButtonsScaleUp.x,coordsButtonsScaleUp.x,coordsButtonsScaleUp.x);
		    	tempo.children[1].scale.set(coordsButtonsScaleUp.x,coordsButtonsScaleUp.x,coordsButtonsScaleUp.x);
		    	tempo.children[2].scale.set(coordsButtonsScaleUp.x,coordsButtonsScaleUp.x,coordsButtonsScaleUp.x);
		    	tempo.children[3].scale.set(coordsButtonsScaleUp.x,coordsButtonsScaleUp.x,coordsButtonsScaleUp.x);
		    });		
		    buttonsScaleUp.start()

			buttonsRotate.onUpdate(function() {
		        tempo.rotation.z = coordsButtonsRotate.z;
		    });		
		    buttonsRotate.start();

		    buttonsMoveUp.onUpdate(function() {
		        tempo.children[0].position.y = coordsMoveUp.y;
		    });		
		    buttonsMoveUp.start();		

			buttonsMoveRight.onUpdate(function() {
		        tempo.children[1].position.x = coordsMoveRight.x;
		    });	
		    buttonsMoveRight.start();

		    buttonsMoveDown.onUpdate(function() {
		        tempo.children[2].position.y = coordsMoveDown.y;
		    });		
		    buttonsMoveDown.start();		

			buttonsMoveLeft.onUpdate(function() {
		        tempo.children[3].position.x = coordsMoveLeft.x;
		    });	
		    buttonsMoveLeft.start();

		}

		function hideTempo(tempo) {
			var coordsButtonsScaleDown = { x: 1 };
		    var buttonsScaleDown = new TWEEN.Tween(coordsButtonsScaleDown)
		    .to({x: 0.01}, 500);

		    var coordsButtonsRotate = { z: -3.14159 };
		    var buttonsRotate = new TWEEN.Tween(coordsButtonsRotate)
		    .to({z: 0}, 500);

			var coordsMoveUp = { y: 100 };
		    var buttonsMoveUp = new TWEEN.Tween(coordsMoveUp)
		    .to({y: 0}, 500);

		    var coordsMoveRight = { x: 100 };
		    var buttonsMoveRight = new TWEEN.Tween(coordsMoveRight)
		    .to({x: 0}, 500);

		    var coordsMoveDown = { y: -100 };
		    var buttonsMoveDown = new TWEEN.Tween(coordsMoveDown)
		    .to({y: 0}, 500);

		    var coordsMoveLeft = { x: -100 };
		    var buttonsMoveLeft = new TWEEN.Tween(coordsMoveLeft)
		    .to({x: 0}, 500);

		    
		    buttonsScaleDown.onUpdate(function() {
		    	tempo.children[0].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
		    	tempo.children[1].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
		    	tempo.children[2].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
		    	tempo.children[3].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
		    });		
		    buttonsScaleDown.start();

			buttonsRotate.onUpdate(function() {
		        tempo.rotation.z = coordsButtonsRotate.z;
		    });		
		    buttonsRotate.start();

		    buttonsMoveUp.onUpdate(function() {
		        tempo.children[0].position.y = coordsMoveUp.y;
		    });		
		    buttonsMoveUp.start();		

			buttonsMoveRight.onUpdate(function() {
		        tempo.children[1].position.x = coordsMoveRight.x;
		    });	
		    buttonsMoveRight.start();

		    buttonsMoveDown.onUpdate(function() {
		        tempo.children[2].position.y = coordsMoveDown.y;
		    });		
		    buttonsMoveDown.start();		

			buttonsMoveLeft.onUpdate(function() {
		        tempo.children[3].position.x = coordsMoveLeft.x;
		    });	
		    buttonsMoveLeft.start();
		}

		function createTempoMenu(el) {
			
			var sound = window[el.sound];				

			var tempo = new THREE.Group();
			tempo.name = 'tempoMenu';

			for (var i = 0; i < 4; i++) {

				// create the purple buttons
				var geometry = new THREE.CircleGeometry( 25, 32 );
				var material = new THREE.MeshBasicMaterial( { color: 0x8500ff, transparent: true, opacity: 0.75 } );
				var circle = new THREE.Mesh( geometry, material );	
				circle.buttonId = i;

				// create the white dots
				var dotGeometry = new THREE.CircleGeometry( 5, 32 );
				var dotMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.75 } );
				var dot = new THREE.Mesh( dotGeometry, dotMaterial );	
				
				
				var dots = new THREE.Group();	
				dots.name = 'dots';			
				
				switch(i) {
				    case 0:
				        // only one dot, nothing to do here
				        break;
				    case 1:
				        var dot2 = new THREE.Mesh( dotGeometry, dotMaterial );
				        dot.position.x = -8;
				        dot2.position.x = 8;
				        dots.add(dot2);
				        break;
				    case 2:
				    	var dot2 = new THREE.Mesh( dotGeometry, dotMaterial );				        
				        var dot3 = new THREE.Mesh( dotGeometry, dotMaterial );
				        dot.position.y = 8;
				        dot2.position.x = -8;
				        dot3.position.x = 8;
				        dot2.position.y = -4;
				        dot3.position.y = -4;
				        dots.add(dot2);
				        dots.add(dot3);
				        break;
				    case 3:
				        var dot2 = new THREE.Mesh( dotGeometry, dotMaterial );				        
				        var dot3 = new THREE.Mesh( dotGeometry, dotMaterial );				        
				        var dot4 = new THREE.Mesh( dotGeometry, dotMaterial );
				        dot.position.x = -11;
				        dot2.position.x = 11;
				        dot3.position.y = -11;
				        dot4.position.y = 11;
				        dots.add(dot2);
				        dots.add(dot3);
				        dots.add(dot4);
				        break;
				}
				dots.add(dot);
				dots.position.z = 0.5;
				circle.add(dots);

							

				Reticulum.add( circle, {
					clickCancelFuse: false, // Overrides global setting for fuse's clickCancelFuse
			        reticleHoverColor: 0xffffff, // Overrides global reticle hover color
			        fuseVisible: true, // Overrides global fuse visibility
			        fuseDuration: 1, // Overrides global fuse duration
			        fuseColor: 0xffffff, // Overrides global fuse color
					onGazeOver: function(){	
						
						if (tempo.parent.tempoVisible) {

							// toggle hovered
							this.parent.parent.hovered = true;

							//scale button up
							var coordsHoverUp = { x: 1, y: 1, a: 0.5 };
							var scaleHoverUp = new TWEEN.Tween(coordsHoverUp)
						    .to({ x: 2, y: 2, a: 1 }, 750)
						    .easing(TWEEN.Easing.Elastic.Out);

						    var dis = this;
						    scaleHoverUp.onUpdate(function() {
						        dis.scale.x = coordsHoverUp.x;
						        dis.scale.y = coordsHoverUp.y;
						        dis.material.opacity = coordsHoverUp.a;
						    });		
						    scaleHoverUp.start();  
						}
		 				
					},
					onGazeOut: function() {
						// toggle hovered
						this.parent.parent.hovered = false;
						
						if (tempo.parent.tempoVisible) {
							//scale button down
							var coordsHoverDown = { x: 2, y: 2, a: 1 };
							var scaleHoverDown = new TWEEN.Tween(coordsHoverDown)
						    .to({ x: 1, y: 1, a: 0.5 }, 750)
						    .easing(TWEEN.Easing.Elastic.Out);

						    var dis = this;
						    scaleHoverDown.onUpdate(function() {
						        dis.scale.x = coordsHoverDown.x;
						        dis.scale.y = coordsHoverDown.y;
						        dis.material.opacity = coordsHoverDown.a;
						    });		
						    scaleHoverDown.start();
						}
					},
					onGazeLong: function(){	
						
						hideTempo();
						this.parent.parent.tempoVisible = false;

						playLoopedSound(sound, this);
															
					}
				});	
				tempo.add( circle );				
			}

			el.add(tempo);
			el.hasTempo = true;				

			function hideTempo() {
				var coordsButtonsScaleDown = { x: 1 };
			    var buttonsScaleDown = new TWEEN.Tween(coordsButtonsScaleDown)
			    .to({x: 0.01}, 500);

			    var coordsButtonsRotate = { z: -3.14159 };
			    var buttonsRotate = new TWEEN.Tween(coordsButtonsRotate)
			    .to({z: 0}, 500);

				var coordsMoveUp = { y: 100 };
			    var buttonsMoveUp = new TWEEN.Tween(coordsMoveUp)
			    .to({y: 0}, 500);

			    var coordsMoveRight = { x: 100 };
			    var buttonsMoveRight = new TWEEN.Tween(coordsMoveRight)
			    .to({x: 0}, 500);

			    var coordsMoveDown = { y: -100 };
			    var buttonsMoveDown = new TWEEN.Tween(coordsMoveDown)
			    .to({y: 0}, 500);

			    var coordsMoveLeft = { x: -100 };
			    var buttonsMoveLeft = new TWEEN.Tween(coordsMoveLeft)
			    .to({x: 0}, 500);

			    
			    buttonsScaleDown.onUpdate(function() {
			    	tempo.children[0].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
			    	tempo.children[1].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
			    	tempo.children[2].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
			    	tempo.children[3].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
			    });		
			    buttonsScaleDown.start();

				buttonsRotate.onUpdate(function() {
			        tempo.rotation.z = coordsButtonsRotate.z;
			    });		
			    buttonsRotate.start();

			    buttonsMoveUp.onUpdate(function() {
			        tempo.children[0].position.y = coordsMoveUp.y;
			    });		
			    buttonsMoveUp.start();		

				buttonsMoveRight.onUpdate(function() {
			        tempo.children[1].position.x = coordsMoveRight.x;
			    });	
			    buttonsMoveRight.start();

			    buttonsMoveDown.onUpdate(function() {
			        tempo.children[2].position.y = coordsMoveDown.y;
			    });		
			    buttonsMoveDown.start();		

				buttonsMoveLeft.onUpdate(function() {
			        tempo.children[3].position.x = coordsMoveLeft.x;
			    });	
			    buttonsMoveLeft.start();
			}

		}// End of loop through each particles			
	}


	// Animate the particles on arrival
	for (var x = 0; x < particlesGroup.children.length; x++) {

		if (particlesGroup.children[x].scale.x == 0.001) {

			var delayy = x*100;
			particleStart(particlesGroup.children[x], delayy);

		}
	}

	function particleStart(el, delay) {
		
		var coordsApear = { x: 0.01, y: 0.01, z: 0.01 };
		var Apear = new TWEEN.Tween(coordsApear)
		.to({ x: 1, y: 1, z: 1 }, 750)
		.easing(TWEEN.Easing.Elastic.Out);

		setTimeout(function() {
			var ceci = el;
			Apear.onUpdate(function() {
				ceci.scale.set(coordsApear.x,coordsApear.y,coordsApear.z);
			});
			Apear.start();
		}, delay);
		
	}
} // end of make particles


function shapeHover(el) {

	// Stop it
	el.parent.hovered = true;

	// Scale it up
	var coordsUpHover = { x: 1, y: 1, z: 1 };
    var scaleUpHover = new TWEEN.Tween(coordsUpHover)
    .to({ x: 1.5, y: 1.5, z: 1.5 }, 200);

    scaleUpHover.onUpdate(function() {
		el.scale.set(coordsUpHover.x,coordsUpHover.y,coordsUpHover.z);
    });		
    scaleUpHover.start();
}

function shapeStopHover(el) {

	// Make it move again
	el.parent.hovered = false;

	// Scale it down
	var coordsDownHover = { x: 1.5, y: 1.5, z: 1.5 };
    var scaleDownHover = new TWEEN.Tween(coordsDownHover)
    .to({ x: 1, y: 1, z: 1 }, 200);

    scaleDownHover.onUpdate(function() {
		el.scale.set(coordsDownHover.x,coordsDownHover.y,coordsDownHover.z);
    });		
    scaleDownHover.start();
}

THREE.Object3D.prototype.lookAtWorld = function( vector ) {

	this.parent.worldToLocal( vector );
	this.lookAt( vector );

}


function explode(e, sound) {
	
	// e = wireframe


	// explosion animation
	var coordsDown = { x: 4, y: 4, z: 4 };
    var scaleDown = new TWEEN.Tween(coordsDown)
    .to({ x: 1, y: 1, z: 1 }, 750)
    .easing(TWEEN.Easing.Elastic.In);

    

    sound = window[sound];


    // is the shape currently playing?
    // no	    
	if (!e.parent.playing) {
		// play it
		sound.play();

	}
	// yes
	else {
		
		// Stop the loop
		e.parent.playing = false;

		// play 'deselected' sound
		sound8.play();

		if (scene.step !== 3) {
			//if playing
			if (!e.parent.children[2].visible) {
				scaleDown.onUpdate(function() {
			        e.scale.set(coordsDown.x,coordsDown.y,coordsDown.z);
			    });		
			    scaleDown.start();
			}
		}
		else {
			//if playing
			if (!e.parent.children[2].visible) {
				scaleDown.onUpdate(function() {
			        e.scale.set(coordsDown.x,coordsDown.y,coordsDown.z);
			    });		
			    scaleDown.start();
			}
		}
	}	
}





	

function playLoopedSound (sound, e) {

  var loopDelay;
  var tempo = e.buttonId;

  if (scene.step !== 3) {
		var coordsDown = { x: 4, y: 4, z: 4 };
		var scaleDown = new TWEEN.Tween(coordsDown)
		.to({ x: 0.01, y: 0.01, z: 0.01 }, 750)
		.easing(TWEEN.Easing.Elastic.In);

		// explose wireframe
		var coordsUp = { x: 1, y: 1, z: 1 };
		var scaleUp = new TWEEN.Tween(coordsUp)
		.to({ x: 4, y: 4, z: 4 }, 750)
		.easing(TWEEN.Easing.Elastic.Out);
  }
  else {
  	  var coordsDown = { x: 1.5, y: 1.5, z: 1.5 };
	  var scaleDown = new TWEEN.Tween(coordsDown)
	  .to({ x: 0.01, y: 0.01, z: 0.01 }, 750)
	  .easing(TWEEN.Easing.Elastic.In);

	    // explose wireframe
		var coordsUp = { x: 1, y: 1, z: 1 };
		var scaleUp = new TWEEN.Tween(coordsUp)
		.to({ x: 1.5, y: 1.5, z: 1.5 }, 750)
		.easing(TWEEN.Easing.Elastic.Out);
  }
 
  // Assign the loop delay (tempo)
  if (tempo == 0) {
  	loopDelay = 4000;
  }
  else if (tempo == 1) {
  	loopDelay = 2000;
  }
  else if (tempo == 2) {
  	loopDelay = 1000;
  }
  else {
  	loopDelay = 500;
  }

  	


    setTimeout(function() {
    	// Assign playing state to particle
		e.parent.parent.playing = true;

    	sound.play();
    	scaleUp.onUpdate(function() {
	    	e.parent.parent.children[1].scale.set(coordsUp.x,coordsUp.y,coordsUp.z);
	    });		
	    scaleUp.start();

	    // add light
	    if (scene.step !== 3) {
	    	var particleLight = new THREE.PointLight( 0x330066, 10.76, 500 ); //-> 10.76
			//e.parent.parent.add( particleLight );
	    }
		

		// show glow
		//e.parent.parent.children[2].visible = true;

	    function myLoop () {  

	    	

    		if (!e.parent.parent.playing) {
		   		loopDelay = 0;
		   	}  

		   	


		   setTimeout(function () {  


		   	// check if shape is currently playing 
		   	if (e.parent.parent.playing) {
		   		sound.play();
		   		myLoop();
		   	}
		   	if (!e.parent.parent.playing) {

		   		scaleDown.onUpdate(function() {
			        e.parent.parent.children[1].scale.set(coordsDown.x,coordsDown.y,coordsDown.z);
			    });		
			    scaleDown.start();

			    
			    if (scene.step !== 3 && e.parent.parent.children[4]) {
			    	// switch off light
			    	//e.parent.parent.children[4].intensity = 0;
			    
				    // switch off glow
				    e.parent.parent.children[2].visible = false;
			    }
			    
		   	}   

                      
		   }, loopDelay)
		}
		
		
		myLoop();
		
    }, 500) 
}

	
function chooseRandomSound(){
	// 93 is the total number of samples
	var randomSoundId = getRandomInt(1, 93);
	var randomSound = "sound" + randomSoundId.toString();
	return randomSound;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

if ($('body').hasClass('app')) {

}

// stop spatial audio on desktop
var isDesktop = false;
if ($('body').hasClass('app')){
	isDesktop = true;
}

function updateParticles() { 

	var tweenFn = TWEEN.Easing.Linear.None;
	var sound, cameraDirection, cameraTop;
    cameraDirection = camera.getWorldDirection();
	cameraTop = new THREE.Vector3(0,1,0).applyEuler(camera.getWorldRotation());
	
	// loop through every particle
	for(var i=0; i<particles.length; i++) {

		particle = particles[i]; 

		// and move it forward dependent on the mouseY position. 
		// on hover, stop it
		if (!particle.hovered) {
			particle.position.z +=  1;
		}	

		// if the tempo group exists
		if (particle.children.length >= 3) {		

			// make it face the camera
			particle.children[2].lookAtWorld( camera.getWorldPosition() );
		}
				

		// rotate childrens
		particle.children[0].rotation.x += 0.025;
		particle.children[0].rotation.z += 0.025;
		particle.children[1].rotation.x += 0.025;
		particle.children[1].rotation.z += 0.025;
		

		// if the particle is too close move it to the back
		if(particle.position.z>2000) particle.position.z-=3000; 

		var sound = window[particle.sound];

		//if one is playing
	    if (particle.playing) {
	      // Measure amplitude at given time
	      var amplitude = sound.amplitude();
	      amplitude = tweenFn(amplitude);
	      // animate the scale of the shape based on the amplitude
	      particle.children[0].scale.set(1.3+(amplitude*1.1),1.3+(amplitude*1.1),1.3+(amplitude*1.1));
	      //particle.children[4].intensity = 2+amplitude*5;

	      
	    }	
	      // Audio spacialisation
	      if (!isDesktop) {
	      	sound._context.listener.setOrientation(cameraDirection.x, cameraDirection.y, cameraDirection.z, cameraTop.x, cameraTop.y, cameraTop.z);
	      	sound._panner.setPosition(particle.position.x, particle.position.y, particle.position.z);	
	      }	
	}

	// tutorial animations
	if (scene.tutorial) {
		scene.children[5].children[0].rotation.y += 0.025; 
		scene.children[5].children[1].rotation.y += 0.025; 
		scene.children[5].children[2].rotation.y += 0.025; 
		scene.children[5].children[3].rotation.y += 0.025; 

		for (var i = 0; i < 4; i++) {
			if (scene.children[5].children[i].children.length == 3) {		
				scene.children[5].children[i].children[2].lookAtWorld( camera.getWorldPosition() );
			}

			if (scene.children[5].children[i].playing) {

				var sound = window[scene.children[5].children[i].sound];
				// Measure amplitude at given time
				var amplitude = sound.amplitude();
				amplitude = tweenFn(amplitude);
				// animate the scale of the shape based on the amplitude
				scene.children[5].children[i].children[0].scale.set(1+(amplitude*1.1),1+(amplitude*1.1),1+(amplitude*1.1));
				scene.children[5].children[i].children[1].scale.set(3,3,3);
			}
		}

		if (!scene.children[5].children[0].hovered && !scene.children[5].children[1].hovered && !scene.children[5].children[2].hovered && !scene.children[5].children[3].hovered) {
			for (var i = 0; i < 4; i++) { 
				
				// 0: to down /  1: to up
				if (scene.children[5].direction == 0) {					
					scene.children[5].children[i].position.y += -0.007; 
				}
				if (scene.children[5].direction == 1) {
					scene.children[5].children[i].position.y += 0.007; 
				}

				if (scene.children[5].children[i].position.y < -0.5) {
					scene.children[5].direction = 1;
				}
				if (scene.children[5].children[i].position.y > 1) {
					scene.children[5].direction = 0;
				}	
			}
		}
	}
}
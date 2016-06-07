// *** Tutorial ***

function drawTutorial() {

  var tutorialWorld = new THREE.Group();
  tutorialWorld.name = 'tutorial';

  var count2 = 0;


  // -> Lights
  var light = new THREE.HemisphereLight( 0x848785, 0x3C3D39, 2 );
  tutorialWorld.add( light );
 
  var lightr = new THREE.HemisphereLight( 0xDF88B9, 0x282828, 0 );
  tutorialWorld.add( lightr );

  var directionalLight = new THREE.DirectionalLight( 0xffffff , 0 );
  directionalLight.position.set( 0, -10, 0 );
  scene.add( directionalLight );

  light = new THREE.DirectionalLight( 0xffffff, 0 );
  light.position.copy( camera.position );
  scene.add(light);


  
  // duplicate four times on 4 directions
  for (var i = 0; i < 4; i++) {

    // -> Board 1

    var cube = new THREE.Group();

    cube.position.z = -1;

    tutorialWorld.add(cube);

    // Board 1 - Button start
    // button__background
    var geometryButton = new THREE.CircleGeometry( 0.07, 50 );
    var materialButton = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1
    });
    var boardOnebutton = new THREE.Mesh(geometryButton, materialButton);

    boardOnebutton.position.z = 0.02;
    boardOnebutton.position.y = -0.13;
    cube.add(boardOnebutton);

    // button__text
    var geometryText = new THREE.PlaneGeometry( 0.1, 0.08 );
    var dynamicTexture  = new THREEx.DynamicTexture(250, 200);
    dynamicTexture.context.font = "60px 'source-sans-pro'";
    dynamicTexture.context.strokeStyle  = "#8500ff";
    dynamicTexture.drawText('Start', undefined, 115, '#8500ff');
    var materialText = new THREE.MeshBasicMaterial({
        map : dynamicTexture.texture,
        transparent: true,
        opacity: 1
    })

    var text = new THREE.Mesh(geometryText, materialText);
    text.position.z = 0.01;
    boardOnebutton.add(text);




    // // Board 1 - Button skip
    var skipBtn = new THREE.Group();
    skipBtn.name = 'skip';

    // button__background
    var materialButtonSkip = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0
    });
    var geometryButtonSkip = new THREE.CircleGeometry( 0.05, 50 );
    var boardOnebuttonSkip = new THREE.Mesh(geometryButtonSkip, materialButtonSkip);

    boardOnebuttonSkip.position.z = 0.02;
    boardOnebuttonSkip.position.y = -0.13;
    boardOnebuttonSkip.position.x = 0.15;
    
    skipBtn.add(boardOnebuttonSkip);
    cube.add(skipBtn);

    // // button__background wireframe
    var segmentCount = 32,
    radius = 0.05,
    geometryWf = new THREE.Geometry(),
    materialWf = new THREE.LineBasicMaterial({ color: 0xFFFFFF, linewidth: 2, transparent: true });
    materialWf.depthTest = false;

    for (var ctt = 0; ctt <= segmentCount; ctt++) {
      var theta = (ctt / segmentCount) * Math.PI * 2;
      geometryWf.vertices.push(
          new THREE.Vector3(
              Math.cos(theta) * radius,
              Math.sin(theta) * radius,
              0));            
    }


    var line = new THREE.Line(geometryWf, materialWf);
    line.position.z = 0.02;
    line.position.y = -0.13;
    line.position.x = 0.15;
    skipBtn.add(line);

    // button__text
    var dynamicTextureSkip  = new THREEx.DynamicTexture(250, 200);
    dynamicTextureSkip.context.font = "50px 'source-sans-pro'";
    dynamicTextureSkip.context.strokeStyle  = "#ffffff";
    dynamicTextureSkip.drawText('skip', undefined, 115, '#ffffff');
    var materialTextSkip = new THREE.MeshBasicMaterial({
        map : dynamicTextureSkip.texture,
        transparent: true,
        opacity: 1
    })

    materialTextSkip.color.r = 255;
    materialTextSkip.color.g = 255;
    materialTextSkip.color.b = 255;

    var textSkip = new THREE.Mesh(geometryText, materialTextSkip);
    textSkip.scale.set(1.2,1.2,1.2);
    textSkip.position.z = 0.01;
    boardOnebuttonSkip.add(textSkip);





    // Board 1 - logo
    var geometryTextLogo = new THREE.PlaneGeometry( 0.2, 0.08 );
    var dynamicTextureLogo  = new THREEx.DynamicTexture(2500, 1000);
    dynamicTextureLogo.context.font = "1000px 'fira-sans-2'";
    dynamicTextureLogo.context.strokeStyle  = "#ffffff";
    dynamicTextureLogo.drawText('stitch', undefined, 900, '#ffffff');
    var materialTextLogo = new THREE.MeshBasicMaterial({
        map : dynamicTextureLogo.texture,
        transparent: true
    })

    var textLogo = new THREE.Mesh(geometryTextLogo, materialTextLogo);

    textLogo.material.color.r = 255;
    textLogo.material.color.g = 255;
    textLogo.material.color.b = 255;

    textLogo.position.z = 0.15;
    textLogo.position.y = 0.13;
    cube.add(textLogo);


    // Board 1 - paragraph
    // paragraph__background
    var geometryParagraphBackground = new THREE.PlaneGeometry( 0.4, 0.15 );
    var materialParagraphBackground = new THREE.MeshBasicMaterial({ 
      transparent: true, 
      opacity: 0
    });
    var paragraphBackground = new THREE.Mesh(geometryParagraphBackground, materialParagraphBackground);

    paragraphBackground.position.z = 0.05;
    paragraphBackground.position.y = 0.03;
    cube.add(paragraphBackground);

    // paragraph__text
    var geometryTextParagraph = new THREE.PlaneGeometry( 0.4, 0.15 );
    var dynamicTextureParagraph  = new THREEx.DynamicTexture(2500, 1000);
    dynamicTextureParagraph.context.font = "150px 'source-sans-pro'";
    dynamicTextureParagraph.context.strokeStyle  = "#ffffff";
    dynamicTextureParagraph.drawText('Look at the button to start the tutorial', undefined, 600, 'white');
    var materialTextParagraph = new THREE.MeshBasicMaterial({
        map : dynamicTextureParagraph.texture,
        transparent: true
    })

    var textParagraph = new THREE.Mesh(geometryTextParagraph, materialTextParagraph);

    textParagraph.material.color.r = 255;
    textParagraph.material.color.g = 255;
    textParagraph.material.color.b = 255;
    textParagraph.position.z = 0.01;
    paragraphBackground.add(textParagraph);


    // -> Reticle interactions
    var count = 0;
    Reticulum.add( boardOnebutton, {
      clickCancelFuse: false, // Overrides global setting for fuse's clickCancelFuse
      reticleHoverColor: 0x8500ff, // Overrides global reticle hover color
      fuseVisible: true, // Overrides global fuse visibility
      fuseDuration: 1.5, // Overrides global fuse duration
      fuseColor: 0x8500ff, // Overrides global fuse color

      onGazeOver: function(){ 
        if (count == 0) {

          // scale particle up 
          startShapeHover(this); 
        }    
                    
      },
      onGazeOut: function(){
        if (count == 0) {
          // scale particle down          
          startShapeStopHover(this); 
        }        

      },
      onGazeLong: function(){ 
        if (count == 0) {
          count = 1;
          stepTwo(this);
        }                
      }
    });


    // skip button interactions
    var count = 0;
    Reticulum.add( boardOnebuttonSkip, {
      clickCancelFuse: false, // Overrides global setting for fuse's clickCancelFuse
      reticleHoverColor: 0x8500ff, // Overrides global reticle hover color
      fuseVisible: true, // Overrides global fuse visibility
      fuseDuration: 1.5, // Overrides global fuse duration
      fuseColor: 0x8500ff, // Overrides global fuse color

      onGazeOver: function(){ 
        if (count == 0) {

          // scale particle up 
          startShapeSkipHover(this); 
        }    
                    
      },
      onGazeOut: function(){
        if (count == 0) {
          // scale particle down          
          startShapeSkipStopHover(this); 
        }        

      },
      onGazeLong: function(){ 
        if (count == 0) {
          count = 1;

          hideChildrenObjects(tutorialWorld.children[3]);
          hideChildrenObjects(tutorialWorld.children[4]);
          hideChildrenObjects(tutorialWorld.children[5]);
          hideChildrenObjects(tutorialWorld.children[2]);

          setTimeout(function() {   
            Reticulum.remove(tutorialWorld.children[3].children[0]);
            Reticulum.remove(tutorialWorld.children[4].children[0]);
            Reticulum.remove(tutorialWorld.children[5].children[0]);
            Reticulum.remove(tutorialWorld.children[2].children[0]);
            Reticulum.remove(tutorialWorld.children[3].children[1].children[0]);
            Reticulum.remove(tutorialWorld.children[4].children[1].children[0]);
            Reticulum.remove(tutorialWorld.children[5].children[1].children[0]);
            Reticulum.remove(tutorialWorld.children[2].children[1].children[0]);
          }, 500);


          setTimeout(function() {
            scene.step = 0;
            // remove tutorial
            tutorialWorld.remove(tutorialWorld.children[2]);
            tutorialWorld.remove(tutorialWorld.children[3]);
            tutorialWorld.remove(tutorialWorld.children[4]);
            tutorialWorld.remove(tutorialWorld.children[5]);

            // start the app
            drawApp();

          }, 1000)
        }                
      }
    });

    function startShapeHover(el) {

      // Scale it up
      var coordsUpHover = { x: 1, y: 1, z: 1 };
        var scaleUpHover = new TWEEN.Tween(coordsUpHover)
        .to({ x: 1.3, y: 1.3, z: 1.3 },100);

        scaleUpHover.onUpdate(function() {
        el.scale.set(coordsUpHover.x,coordsUpHover.y,coordsUpHover.z);   
        });   
        scaleUpHover.start();
    }

    function startShapeStopHover(el) {

      // Scale it down
      var coordsDownHover = { x: 1.3, y: 1.3, z: 1.3 };
      var scaleDownHover = new TWEEN.Tween(coordsDownHover)
      .to({ x: 1, y: 1, z: 1 }, 100);

      scaleDownHover.onUpdate(function() {
      el.scale.set(coordsDownHover.x,coordsDownHover.y,coordsDownHover.z);
      });   
      scaleDownHover.start();
    }

    function startShapeSkipHover(el) {

      // Scale it up
      var coordsUpHoverSkip = { x: 1, y: 1, z: 1 };
      var scaleUpHoverSkip = new TWEEN.Tween(coordsUpHoverSkip)
      .to({ x: 1.3, y: 1.3, z: 1.3 },100);


      scaleUpHoverSkip.onUpdate(function() {
        el.parent.children[1].scale.set(coordsUpHoverSkip.x,coordsUpHoverSkip.y,coordsUpHoverSkip.z); 
        el.parent.children[0].scale.set(coordsUpHoverSkip.x,coordsUpHoverSkip.y,coordsUpHoverSkip.z);    
      });   
      scaleUpHoverSkip.start();

    }

    function startShapeSkipStopHover(el) {

      // Scale it down
      var coordsDownHover = { x: 1.3, y: 1.3, z: 1.3 };
      var scaleDownHover = new TWEEN.Tween(coordsDownHover)
      .to({ x: 1, y: 1, z: 1 }, 100);

      scaleDownHover.onUpdate(function() {
      el.parent.children[0].scale.set(coordsDownHover.x,coordsDownHover.y,coordsDownHover.z);
      el.parent.children[1].scale.set(coordsDownHover.x,coordsDownHover.y,coordsDownHover.z); 
      });   
      scaleDownHover.start();
    }


    // -> Step two
    function stepTwo(el) {

      scene.step = 2;

      // hide the boards childrens
      hideChildrenObjects(tutorialWorld.children[3]);
      hideChildrenObjects(tutorialWorld.children[4]);
      hideChildrenObjects(tutorialWorld.children[5]);
      hideChildrenObjects(tutorialWorld.children[2]);

      setTimeout(function() {        
        Reticulum.remove(tutorialWorld.children[3].children[0]);
        Reticulum.remove(tutorialWorld.children[4].children[0]);
        Reticulum.remove(tutorialWorld.children[5].children[0]);
        Reticulum.remove(tutorialWorld.children[2].children[0]);

        Reticulum.remove(tutorialWorld.children[3].children[1].children[0]);
        Reticulum.remove(tutorialWorld.children[4].children[1].children[0]);
        Reticulum.remove(tutorialWorld.children[5].children[1].children[0]);
        Reticulum.remove(tutorialWorld.children[2].children[1].children[0]);
      }, 500);

      setTimeout(function() {

        // Remove the skip button
        tutorialWorld.children[3].remove(tutorialWorld.children[3].children[0]);
        tutorialWorld.children[4].remove(tutorialWorld.children[4].children[0]);
        tutorialWorld.children[5].remove(tutorialWorld.children[5].children[0]);
        tutorialWorld.children[2].remove(tutorialWorld.children[2].children[0]);


        updateShowText(tutorialWorld.children[3], 'In stitch, each sound is represented by a 3D shape.', 'You can select and play them just by looking at them.');
        updateShowText(tutorialWorld.children[4], 'In stitch, each sound is represented by a 3D shape.', 'You can select and play them just by looking at them.');
        updateShowText(tutorialWorld.children[5], 'In stitch, each sound is represented by a 3D shape.', 'You can select and play them just by looking at them.');
        updateShowText(tutorialWorld.children[2], 'In stitch, each sound is represented by a 3D shape.', 'You can select and play them just by looking at them.');
      }, 1500);

      setTimeout(function() {
        //make four shapes

        scene.tutorial = true;

        var tutoShapes = new THREE.Group();

        var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x8500ff, wireframe: true, transparent: true } ); 
        var darkMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, overdraw: 0.5, shading: THREE.FlatShading } );
        var multiMaterial = [ darkMaterial, wireframeMaterial ];

        for (var i = 0; i < 4; i++) {
        
          if (i == 0) {
            // octahedron
            var particle = THREE.SceneUtils.createMultiMaterialObject( 
            new THREE.OctahedronGeometry( 0.2, 0 ), 
            multiMaterial ); 

            particle.position.z = -1.4;
            particle.position.x = -1.4; 

            particle.sound = 'sound63';  
          }

          if (i == 1) {
            // icosahedron
            var particle = THREE.SceneUtils.createMultiMaterialObject( 
            new THREE.IcosahedronGeometry( 0.2, 0 ), 
            multiMaterial );

            particle.position.z = -1.4;
            particle.position.x = 1.4; 

            particle.sound = 'sound2'; 
          }

          if (i == 2) {
            // Tetrahedron
            var particle = THREE.SceneUtils.createMultiMaterialObject( 
            new THREE.TetrahedronGeometry( 0.2, 0 ), 
            multiMaterial );

            particle.position.z = 1.4;
            particle.position.x = -1.4; 

            particle.sound = 'sound87'; 
          }

          if (i == 3) {
            // cube
            var particle = THREE.SceneUtils.createMultiMaterialObject( 
            new THREE.CubeGeometry( 0.2, 0.2, 0.2 ,1 ,1 ,1 ), 
            multiMaterial ); 

            particle.position.z = 1.4;
            particle.position.x = 1.4;   

            particle.sound = 'sound82';          
          }

          particle.scale.set(0.001,0.001,0.001);
          particle.hovered = false;
          particle.action = 0;



          // particle playing state
          particle.playing = false;

          particle.hasTempo = false;
          particle.tempoVisible = false;


          Reticulum.add( particle.children[0], {
            clickCancelFuse: false, // Overrides global setting for fuse's clickCancelFuse
            reticleHoverColor: 0xffffff, // Overrides global reticle hover color
            fuseVisible: false, // Overrides global fuse visibility
            fuseDuration: 1.5, // Overrides global fuse duration
            fuseColor: 0xffffff, // Overrides global fuse color
            onGazeOver: function(){ 
              particle.hovered = true;
              startShapeHover(this); 

              var elsoundo = this.parent.sound;
              elsoundo = window[elsoundo];

              elsoundo.play();
              
              if (scene.step == 2) {
                scene.children[1].children[0].children[1].material.visible = false;
              }
              else if (scene.step == 3) {
                scene.children[1].children[0].children[1].material.visible = true;
              }

              
            },
            onGazeOut: function(){
              this.parent.action = 0;
              particle.hovered = false;

              startShapeStopHover(this); 
              if (scene.step == 2) {
                scene.children[1].children[0].children[1].material.visible = true;
              }
              else if (scene.step == 3) {
                scene.children[1].children[0].children[1].material.visible = true;
              }
            },
            onGazeLong: function(){
              this.parent.action += 1;

              if (scene.step == 3) {

                if (!this.parent.hasTempo) {
                  createTutTempoMenu(this.parent);
                }

                if (this.parent.action == 1) { 
                
                  if (!this.parent.playing && !this.parent.tempoVisible) {
                    this.parent.tempoVisible = true;
                    showTempoTut(this.parent.children[2]);
                  }
                  else if (!this.parent.playing && this.parent.tempoVisible) {
                    this.parent.tempoVisible = true;
                    showTempoTut(this.parent.children[2]);
                  }

                  explode(this.parent.children[1], this.parent.sound);

                } 
              }
            }
          });
          tutoShapes.add(particle);

          particle.children[1].scale.set(0.01,0.01,0.01);


          function showTempoTut(tempo) {  
            tempo.visible = true;       
            tempo.children[0].visible = true;
            tempo.children[1].visible = true;
            tempo.children[2].visible = true;
            tempo.children[3].visible = true;

            var coordsButtonsScaleUp = { x: 0.01 };
              var buttonsScaleUp = new TWEEN.Tween(coordsButtonsScaleUp)
              .to({x: 1}, 500);

              var coordsButtonsRotate = { z: 0 };
              var buttonsRotate = new TWEEN.Tween(coordsButtonsRotate)
              .to({z: -3.14159}, 500);

            var coordsMoveUp = { y: 0 };
              var buttonsMoveUp = new TWEEN.Tween(coordsMoveUp)
              .to({y: 0.5}, 500);

              var coordsMoveRight = { x: 0 };
              var buttonsMoveRight = new TWEEN.Tween(coordsMoveRight)
              .to({x: 0.5}, 500);

              var coordsMoveDown = { y: 0 };
              var buttonsMoveDown = new TWEEN.Tween(coordsMoveDown)
              .to({y: -0.5}, 500);

              var coordsMoveLeft = { x: 0 };
              var buttonsMoveLeft = new TWEEN.Tween(coordsMoveLeft)
              .to({x: -0.5}, 500);

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

          function hideTempoTut(tempo) {
            var coordsButtonsScaleDown = { x: 1 };
              var buttonsScaleDown = new TWEEN.Tween(coordsButtonsScaleDown)
              .to({x: 0.01}, 500);

              var coordsButtonsRotate = { z: -3.14159 };
              var buttonsRotate = new TWEEN.Tween(coordsButtonsRotate)
              .to({z: 0}, 500);

            var coordsMoveUp = { y: 0.5 };
              var buttonsMoveUp = new TWEEN.Tween(coordsMoveUp)
              .to({y: 0}, 500);

              var coordsMoveRight = { x: 0.5 };
              var buttonsMoveRight = new TWEEN.Tween(coordsMoveRight)
              .to({x: 0}, 500);

              var coordsMoveDown = { y: -0.5 };
              var buttonsMoveDown = new TWEEN.Tween(coordsMoveDown)
              .to({y: 0}, 500);

              var coordsMoveLeft = { x: -0.5 };
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

        }
        scene.add(tutoShapes);
        
        setTimeout(function(){
          // Scale'em up
          var coordsTutAppear = { x: 0.01, y: 0.01, z: 0.01 };
          var tutAppear = new TWEEN.Tween(coordsTutAppear)
          .to({ x: 1, y: 1, z: 1 }, 1250)
          .easing(TWEEN.Easing.Elastic.Out);

          tutAppear.onUpdate(function() {
            tutoShapes.children[0].scale.set(coordsTutAppear.x,coordsTutAppear.y,coordsTutAppear.z);
            tutoShapes.children[1].scale.set(coordsTutAppear.x,coordsTutAppear.y,coordsTutAppear.z);
            tutoShapes.children[2].scale.set(coordsTutAppear.x,coordsTutAppear.y,coordsTutAppear.z);
            tutoShapes.children[3].scale.set(coordsTutAppear.x,coordsTutAppear.y,coordsTutAppear.z);
          });   
          tutAppear.start();
          scene.children[5].direction = 0;
        }, 750)
        

      }, 2000);
    }

    function hideChildrenObjects (parent) {

      parent.traverse( function( node ) {
          node.hidden = false;

          if( node.material && node.material.opacity == 1 ) {   
              node.hidden = true;

              var coordsHideChildren = { a: 1 };
              var hideChildren = new TWEEN.Tween(coordsHideChildren)
              .to({ a: 0 }, 1000);

              hideChildren.onUpdate(function() {
                node.material.opacity = coordsHideChildren.a;
              });
              hideChildren.start();

              setTimeout(function() {
                node.parent.remove(node);
              }, 1000);
                          
          }
      });
    }

    function updateShowText(parent, topText, bottomText) {
      // create text
      var cube= new THREE.Group();

      // LINE 1
      // paragraph__background
      var paragraphBackground = new THREE.Mesh(geometryParagraphBackground, materialParagraphBackground);
      paragraphBackground.position.y = 0.12; 

      // paragraph__text
      var geometryTextParagraph = new THREE.PlaneGeometry( 0.6, 0.15 );
      var dynamicTextureParagraph  = new THREEx.DynamicTexture(4000, 1000);
      dynamicTextureParagraph.context.font = "150px 'source-sans-pro'";
      dynamicTextureParagraph.context.strokeStyle  = "#ffffff";
      dynamicTextureParagraph.drawText(topText, undefined, 600, 'white');
      var materialTextParagraph = new THREE.MeshBasicMaterial({
          map : dynamicTextureParagraph.texture,
          transparent: true
      })

      var textParagraph = new THREE.Mesh(geometryTextParagraph, materialTextParagraph);

      textParagraph.material.color.r = 255;
      textParagraph.material.color.g = 255;
      textParagraph.material.color.b = 255;
      textParagraph.position.z = 0.01;

      textParagraph.material.transparent = true;
      textParagraph.material.opacity = 0;
      textParagraph.hidden = true;
      paragraphBackground.add(textParagraph);
      cube.add(paragraphBackground);


      // LINE 2
      var paragraphBackgroundBottom = new THREE.Mesh(geometryParagraphBackground, materialParagraphBackground);
      paragraphBackgroundBottom.position.y = 0.02;      

      // paragraph__text
      var dynamicTextureParagraphBottom  = new THREEx.DynamicTexture(3500, 1000)
      dynamicTextureParagraphBottom.context.font = "150px 'source-sans-pro'";
      dynamicTextureParagraphBottom.context.strokeStyle  = "#ffffff";
      dynamicTextureParagraphBottom.drawText(bottomText, undefined, 600, 'white');
      var materialTextParagraphBottom = new THREE.MeshBasicMaterial({
          map : dynamicTextureParagraphBottom.texture,
          transparent: true
      })

      var textParagraphBottom = new THREE.Mesh(geometryTextParagraph, materialTextParagraphBottom);

      textParagraphBottom.material.color.r = 255;
      textParagraphBottom.material.color.g = 255;
      textParagraphBottom.material.color.b = 255;
      textParagraphBottom.position.z = 0.01;

      textParagraphBottom.material.transparent = true;
      textParagraphBottom.material.opacity = 0;
      textParagraphBottom.hidden = true;

      paragraphBackgroundBottom.add(textParagraphBottom);
      cube.add(paragraphBackgroundBottom);

      // BUTTON
      // button__background
      var boardOnebutton = new THREE.Mesh(geometryButton, materialButton);

      boardOnebutton.position.z = 0.02;
      boardOnebutton.position.y = -0.13;
      boardOnebutton.hidden = true;

      // button__text
      var dynamicTexturebutton  = new THREEx.DynamicTexture(250, 200);
      dynamicTexturebutton.context.font = "60px 'source-sans-pro'";
      dynamicTexturebutton.context.strokeStyle  = "#8500ff";
      dynamicTexturebutton.drawText('Next', undefined, 115, '#8500ff');
      var materialTextbutton = new THREE.MeshBasicMaterial({
          map : dynamicTexturebutton.texture,
          transparent: true,
          opacity: 0
      })

      var textbutton = new THREE.Mesh(geometryText, materialTextbutton);
      textbutton.position.z = 0.01;
      textbutton.hidden = true;

      boardOnebutton.add(textbutton)
      cube.add(boardOnebutton);

      parent.add(cube);

      //next button
      
      Reticulum.add( boardOnebutton, {
        clickCancelFuse: false, // Overrides global setting for fuse's clickCancelFuse
        reticleHoverColor: 0x8500ff, // Overrides global reticle hover color
        fuseVisible: true, // Overrides global fuse visibility
        fuseDuration: 1.5, // Overrides global fuse duration
        fuseColor: 0x8500ff, // Overrides global fuse color
        onGazeOver: function(){ 
          if (count2 == 0) {
            // scale particle up 
            startShapeHover(this); 
          }    

                      
        },
        onGazeOut: function(){
          if (count2 == 0) {
            // scale particle down          
            startShapeStopHover(this); 
          }   
        },
        onGazeLong: function(){ 

          if (count2 == 0) {
            count2 = 1;

            if (scene.step == 2) {
              stepThree(this);
            }
            else if (scene.step == 3) {
              

              scene.children[5].children[0].playing = false;
              scene.children[5].children[1].playing = false;
              scene.children[5].children[2].playing = false;
              scene.children[5].children[3].playing = false;

              Reticulum.remove(scene.children[4].children[2].children[2].children[2]);
              Reticulum.remove(scene.children[4].children[3].children[2].children[2]);
              Reticulum.remove(scene.children[4].children[4].children[2].children[2]);
              Reticulum.remove(scene.children[4].children[5].children[2].children[2]);

              Reticulum.remove(scene.children[5].children[0].children[0]);
              Reticulum.remove(scene.children[5].children[1].children[0]);
              Reticulum.remove(scene.children[5].children[2].children[0]);
              Reticulum.remove(scene.children[5].children[3].children[0]);

              setTimeout(function(){
                removeTut(scene.children[4]);
                removeTut(scene.children[5]);
              }, 4500);

              scene.children[4].traverse( function( node ) {

                if( node.material && node.material.opacity == 1 ) {   
                    var coordsHideChildren = { a: 1 };
                    var hideChildren = new TWEEN.Tween(coordsHideChildren)
                    .to({ a: 0 }, 1000);

                    hideChildren.onUpdate(function() {
                      node.material.opacity = coordsHideChildren.a;
                    });
                    hideChildren.start();                                
                  }
              });

              
              var coordsHideChildrensh = { a: 1 };
              var hideChildrensh = new TWEEN.Tween(coordsHideChildrensh)
              .to({ a: 0.001 }, 1000);

              hideChildrensh.onUpdate(function() {
                scene.children[5].children[0].scale.set(coordsHideChildrensh.a,coordsHideChildrensh.a,coordsHideChildrensh.a);
                scene.children[5].children[1].scale.set(coordsHideChildrensh.a,coordsHideChildrensh.a,coordsHideChildrensh.a);
                scene.children[5].children[2].scale.set(coordsHideChildrensh.a,coordsHideChildrensh.a,coordsHideChildrensh.a);
                scene.children[5].children[3].scale.set(coordsHideChildrensh.a,coordsHideChildrensh.a,coordsHideChildrensh.a);
              });
              hideChildrensh.start();  

              
              
              function removeTut(parent) {
              
                parent.traverse( function( node ) {
                  node.hidden = false;
                  node.tut = true;

                  if( node.material && node.hey == 0 ) {   
                      node.hidden = true;

                      var coordsHideChildren = { a: 1 };
                      var hideChildren = new TWEEN.Tween(coordsHideChildren)
                      .to({ a: 0 }, 1000);

                      hideChildren.onUpdate(function() {
                        node.material.opacity = coordsHideChildren.a;
                      });
                      hideChildren.start();

                      setTimeout(function() {
                        node.parent.remove(node);
                      }, 1000);
                                  
                    }
                });
              }
              

              setTimeout(function() {
                scene.step = 0;
                drawApp();
              }, 1000)

            }
            
            count2 = 0;
          }                
        }
      });

      
      //show text
      parent.traverse( function( node ) {
          if( node.material && node.material.opacity == 0 && node.hidden) {   
              node.hidden = false;

              var coordsHideChildren = { a: 0 };
              var hideChildren = new TWEEN.Tween(coordsHideChildren)
              .to({ a: 1 }, 1500);

              hideChildren.onUpdate(function() {
                node.material.opacity = coordsHideChildren.a;
              });
              hideChildren.start();
                          
          }
      });
    }

    function stepThree(el) {
      
      //el = previusly clicked button
      scene.step = 3;

      Reticulum.remove(el.parent.parent.parent.children[2].children[1].children[2]);
      Reticulum.remove(el.parent.parent.parent.children[3].children[1].children[2]);
      Reticulum.remove(el.parent.parent.parent.children[4].children[1].children[2]);
      Reticulum.remove(el.parent.parent.parent.children[5].children[1].children[2]);


      // hide the boards childrens
      hideChildrenObjects(tutorialWorld.children[3]);
      hideChildrenObjects(tutorialWorld.children[4]);
      hideChildrenObjects(tutorialWorld.children[5]);
      hideChildrenObjects(tutorialWorld.children[2]);


      setTimeout(function() {
        updateShowText(tutorialWorld.children[3], 'To loop a sound, first look at it,', 'then select a tempo for the loop.');
        updateShowText(tutorialWorld.children[4], 'To loop a sound, first look at it,', 'then select a tempo for the loop.');
        updateShowText(tutorialWorld.children[5], 'To loop a sound, first look at it,', 'then select a tempo for the loop.');
        updateShowText(tutorialWorld.children[2], 'To loop a sound, first look at it,', 'then select a tempo for the loop.');

        //console.log(tutorialWorld.children[3]);
        var button;
        //Reticulum.remove()
      
      }, 1500);
    }




    // four boards positions
    if (i == 1) {
      cube.position.z = 0;
      cube.position.x = 1;
      cube.rotation.y = -1.5708;
    }
    if (i == 2) {
      cube.position.z = 0;
      cube.position.x = -1;
      cube.rotation.y = 1.5708;
    }
    if (i == 3) {
      cube.position.z = 1;
      cube.rotation.y = 3.14159;
    }
  }

  scene.add(tutorialWorld);

} // end Tutorial

function createTutTempoMenu(el) {
      
  var sound = window[el.sound];       

  var tempo = new THREE.Group();

  for (var i = 0; i < 4; i++) {

    // create the purple buttons
    var geometry = new THREE.CircleGeometry( 0.2, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0x8500ff, transparent: true, opacity: 0.75 } );
    var circle = new THREE.Mesh( geometry, material );  
    circle.buttonId = i;

    // create the white dots
    var dotGeometry = new THREE.CircleGeometry( 0.033, 32 );
    var dotMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.75 } );
    var dot = new THREE.Mesh( dotGeometry, dotMaterial ); 
    dot.scale.set
    
    
    var dots = new THREE.Group();       
    
    switch(i) {
        case 0:
            // only one dot, nothing to do here
            dot.position.y = -0.03;
            break;
        case 1:
            var dot2 = new THREE.Mesh( dotGeometry, dotMaterial );
            dot.position.x = -0.08;
            dot2.position.x = 0.04;
            dots.add(dot2);
            break;
        case 2:
          var dot2 = new THREE.Mesh( dotGeometry, dotMaterial );                
            var dot3 = new THREE.Mesh( dotGeometry, dotMaterial );
            dot.position.y = 0.08;
            dot2.position.x = -0.07;
            dot3.position.x = 0.07;
            dot2.position.y = -0.02;
            dot3.position.y = -0.02;
            dots.add(dot2);
            dots.add(dot3);
            break;
        case 3:
            var dot2 = new THREE.Mesh( dotGeometry, dotMaterial );                
            var dot3 = new THREE.Mesh( dotGeometry, dotMaterial );                
            var dot4 = new THREE.Mesh( dotGeometry, dotMaterial );
            dot.position.x = -0.07;
            dot2.position.x = 0.07;
            dot3.position.y = -0.07;
            dot4.position.y = 0.07;
            dots.position.x = 0.02;
            dots.add(dot2);
            dots.add(dot3);
            dots.add(dot4);
            break;
    }
    dots.add(dot);
    dots.position.z = 0.1;
    circle.add(dots);

          

    Reticulum.add( circle, {

      onGazeOver: function(){ 
        
        if (tempo.parent.tempoVisible) {

          // toggle hovered
          this.parent.parent.hovered = true;

          //scale button up
          var coordsHoverUp = { x: 1, y: 1, a: 1 };
          var scaleHoverUp = new TWEEN.Tween(coordsHoverUp)
            .to({ x: 1.4, y: 1.4, a: 1 }, 750)
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
          var coordsHoverDown = { x: 1.4, y: 1.4, a: 1 };
          var scaleHoverDown = new TWEEN.Tween(coordsHoverDown)
            .to({ x: 1, y: 1, a: 1 }, 750)
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
        hideTempoTuto(this.parent.parent.children[2]);
      
        playLoopedSound(sound, this);
                          
      }
    }); 
    tempo.add( circle );        
  }

  el.add(tempo);
  el.hasTempo = true;       

  function hideTempoTuto(tempo) {
    var coordsButtonsScaleDown = { x: 1 };
      var buttonsScaleDown = new TWEEN.Tween(coordsButtonsScaleDown)
      .to({x: 0.01}, 500);

      var coordsButtonsRotate = { z: -3.14159 };
      var buttonsRotate = new TWEEN.Tween(coordsButtonsRotate)
      .to({z: 0}, 500);

    var coordsMoveUp = { y: 0.5 };
      var buttonsMoveUp = new TWEEN.Tween(coordsMoveUp)
      .to({y: 0}, 500);

      var coordsMoveRight = { x: 0.5 };
      var buttonsMoveRight = new TWEEN.Tween(coordsMoveRight)
      .to({x: 0}, 500);

      var coordsMoveDown = { y: -0.5 };
      var buttonsMoveDown = new TWEEN.Tween(coordsMoveDown)
      .to({y: 0}, 500);

      var coordsMoveLeft = { x: -0.5 };
      var buttonsMoveLeft = new TWEEN.Tween(coordsMoveLeft)
      .to({x: 0}, 500);

      
      buttonsScaleDown.onUpdate(function() {
        tempo.children[0].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
        tempo.children[1].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
        tempo.children[2].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
        tempo.children[3].scale.set(coordsButtonsScaleDown.x,coordsButtonsScaleDown.x,coordsButtonsScaleDown.x);
      });   
      //buttonsScaleDown.start();

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

      setTimeout(function() {
        tempo.children[0].visible = false;
        tempo.children[1].visible = false;
        tempo.children[2].visible = false;
        tempo.children[3].visible = false;

      }, 500)
  }
}
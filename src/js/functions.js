function switchLightsOff() {
  createjs.Tween.get(lightSphere.material, { })
  .to({ opacity: 1 }, 1500, createjs.Ease.sineIn);
}


function switchLightsOn() {
  createjs.Tween.get(lightSphere.material, { })
  .to({ opacity: 0 }, 1500, createjs.Ease.sineIn);
}


function clearScene(name) {
  var obj = scene.getObjectByName(name);
  scene.remove(obj);
}


function showTitle (module, level) {
  var title = new THREE.Group();
  title.name = 'title';

  // Module
  var geometryModule = new THREE.PlaneGeometry( 0.4, 0.16 );
  var textureModule  = new THREEx.DynamicTexture(2500, 1000);
  textureModule.context.font = "300px 'source-sans-pro'";
  textureModule.drawText(module, undefined, 250, 'white');
  var materialModule = new THREE.MeshBasicMaterial({
      map : textureModule.texture,
      transparent: true
  })

  var module = new THREE.Mesh(geometryModule, materialModule);
  module.position.z = -1;
  title.add(module);

  // Level
  var geometryLevel = new THREE.PlaneGeometry( 0.4, 0.16 );
  var textureLevel  = new THREEx.DynamicTexture(2500, 1000);
  textureLevel.context.font = "200px 'source-sans-pro'";
  textureLevel.drawText(level, undefined, 800, 'white');
  var materialLevel = new THREE.MeshBasicMaterial({
      map : textureLevel.texture,
      transparent: true
  })

  var level = new THREE.Mesh(geometryLevel, materialLevel);
  level.position.z = -1;
  title.add(level);

  // Rectangle
  var geometryRectangle = new THREE.PlaneGeometry( 0.1, 0.005 );
  var materialRectangle = new THREE.MeshBasicMaterial({
    color: 0x8500ff
  });
  rectangle = new THREE.Mesh(geometryRectangle, materialRectangle);

  rectangle.position.z = -1;
  rectangle.position.y = 0.01;
  title.add(rectangle);

  scene.add(title);
}
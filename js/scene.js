/*

  Using three.js to animate and render
  3D objects!!

*/


// Initialize Website Assets

function init() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#0e2f49");

  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  // camera will be window size (100vw x 100 vh)
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#background")
  });
  renderer.setSize( window.innerWidth, window.innerHeight );

  // making object
  const geometry = new THREE.IcosahedronGeometry( 4, 1 );
  const wireframe = new THREE.WireframeGeometry( geometry );
  const obj =  new THREE.LineSegments( wireframe );
  obj.material.depthTest = false;
  obj.material.opacity = 0.75;
  obj.material.transparent = true;
  obj.material.color = new THREE.Color('#6694ab');

  scene.add( obj );

  // adjusting camera
  camera.position.y = -2;
  camera.position.z = 9;

  // animating object
  function animate() {
    requestAnimationFrame( animate );
    obj.rotation.x += 0.001;
    obj.rotation.y += 0.001;
    renderer.render( scene, camera );
  }
  animate();
}

init();

// If there is an resizing website event,
// fix all assets again.

window.onresize = () => init(); 
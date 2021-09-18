import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(50);
camera.position.setX(-30);
camera.position.setY(5);


renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347 } );
const torus = new THREE.Mesh( geometry, material );
torus.position.setZ(10);
torus.position.setX(50);
torus.position.setY(0);

scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight );

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  const geometry = new THREE.SphereBufferGeometry(0.25, 50, 54);
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('bg.jpg');
scene.background = spaceTexture;

const jefTexture = new THREE.TextureLoader().load('pikachu.png');
const jef = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial( { map: jefTexture} )
)

jef.position.setZ(10);
jef.position.setX(50);
jef.position.setY(0);


scene.add(jef);


//Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg'); 

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture,
  } ),
)
scene.add(moon);

moon.position.z = 25;
moon.position.setX(20);
moon.position.y = 15;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.005;

  jef.rotation.y += 0.001;
  jef.rotation.z += 0.001;

  camera.position.z = t * -0.075;
  camera.position.x = t * 0.0015;
  camera.position.y = t * -0.0055;

}
document.body.onscroll = moveCamera





function animate() {
  requestAnimationFrame ( animate );

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  
  jef.rotation.x += 0.00;
  jef.rotation.y += 0.01;
  jef.rotation.z += 0.00;


  renderer.render ( scene, camera)

}

animate();
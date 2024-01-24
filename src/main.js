import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import GUI from 'lil-gui'
import gsap from "gsap";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// GLTFLoader

/**
 * Models
 */

const gltfLoader = new GLTFLoader()

gltfLoader.load(
    '/models/ticket.glb',
    (gltf) =>
    {
        gltf.scene.position.set(3, -1.1, -1)
        gltf.scene.rotation.y = Math.PI * - 0.5 + 0.5;
        scene.add(gltf.scene)
    },
)

gltfLoader.load(
    '/models/suitcaseV4.glb',
    (gltf) =>
    {
        gltf.scene.scale.set(5, 5, 5)
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.rotation.y = Math.PI * - 0.5;
        scene.add(gltf.scene)
    },
)

/**
 * Textures
 */


// add texture in 

/**
 * Object
 */


/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientLight);


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 1;
camera.position.z = 7;

// camera.position.y = 3;
// camera.position.z = 2;

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//Animate

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
let currentIntersect = null;

function animate() {
  const elapsedTime = clock.getElapsedTime();

  // camera.lookAt(cube.position);

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

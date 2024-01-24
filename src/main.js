import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GUI from "lil-gui";
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
const gltfLoader = new GLTFLoader();

/**
 * Textures
 */

/**
 * Object
 */

const cube = new THREE.Group();
scene.add(cube);

// Cube
const leftFace = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
);
leftFace.position.x = -1;
leftFace.position.y = -0.5;
leftFace.rotation.y = Math.PI / 2;
cube.add(leftFace);

const rightFace = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
);
rightFace.position.x = 1;
rightFace.position.y = -0.5;
rightFace.rotation.y = Math.PI / 2;
cube.add(rightFace);

const bottomFace = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 3),
  new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
);
bottomFace.rotation.x = Math.PI / 2;
bottomFace.position.y = -1;
cube.add(bottomFace);

const frontFace = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1),
  new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide })
);
frontFace.position.y = -0.5;
frontFace.position.z = 1.5;
cube.add(frontFace);

const backFace = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1),
  new THREE.MeshBasicMaterial({ color: 0xffff, side: THREE.DoubleSide })
);
backFace.position.y = -0.5;
backFace.position.z = -1.5;
cube.add(backFace);

cube.rotation.y = Math.PI * 0.5;

// CinemaTicket

const cinemaTicket = new THREE.Mesh(
  new THREE.PlaneGeometry(0.5, 1),
  new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
);

cinemaTicket.position.x = 0.2;
cinemaTicket.position.y = -0.4;
cinemaTicket.position.z = 0.3;
cinemaTicket.rotation.x = Math.PI / 2 + 0.3;

scene.add(cinemaTicket);

// CinemaTicket2

// gltfLoader.load('./assets/ticket.gltf', function (gltf) {
//     ticket = gltf.scene;
//     ticket.scale.set(2, 2, 2);
//     ticket.position.y = 4;

//     scene.add(ticket);
// });

// gltfLoader.load(
//     '/assets/ticket.gltf',
//     (gltf) =>
//     {
//         console.log('success')
//         console.log(gltf)
//     },
//     (progress) =>
//     {
//         console.log('progress')
//         console.log(progress)
//     },
//     (error) =>
//     {
//         console.log('error')
//         console.log(error)
//     }
// )

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
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

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

  camera.lookAt(cube.position);

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

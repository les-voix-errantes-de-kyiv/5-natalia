import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import GUI from "lil-gui";
import gsap from "gsap";

/**
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// GLTFLoader

/**
 * Models
 */

const gltfLoader = new GLTFLoader();
let valise;
let ticket;

gltfLoader.load("/models/ticket.glb", (gltf) => {
  gltf.scene.position.set(3, -1.1, -1);
  gltf.scene.rotation.y = Math.PI * -0.5 + 0.5;
  ticket = gltf.scene;
  scene.add(gltf.scene);
});

gltfLoader.load("/models/suitcaseV4.glb", (gltf) => {
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.rotation.y = Math.PI * -0.5;
  valise = gltf.scene;

  scene.add(gltf.scene);
});

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

//Mouse Moove

const mouse = new THREE.Vector2();
let currentValise = null;
let currentTicket = null;

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -((event.clientY / sizes.height) * 2 - 1);
});

window.addEventListener("click", () => {
  if (currentValise) {
    gsap.to(camera.position, { duration: 1, delay: 0, z: 5 });
    gsap.to(camera.position, { duration: 0.8, delay: 0, y: 8 });
  }
  if (currentTicket) {
    gsap.to(ticket.position, { duration: 0.8, delay: 0, x: -0.5 });
    gsap.to(ticket.position, { duration: 0.8, delay: 0, y: 6 });
    gsap.to(ticket.position, { duration: 0.8, delay: 0, z: 3.5 });
    gsap.to(ticket.rotation, { duration: 0.8, delay: 0, y: 0 });
  }
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
camera.position.z = 20;

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

function animate() {
  const elapsedTime = clock.getElapsedTime();

  if (valise) {
    camera.lookAt(valise.position);

    //Raycaster

    const raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, camera);

    const valiseInter = raycaster.intersectObject(valise);
    const ticketInter = raycaster.intersectObject(ticket);

    if (valiseInter.length) {
      currentValise = valiseInter[0];
    } else {
      currentValise = null;
    }

    if (ticketInter.length) {
      currentTicket = ticketInter[0];
    } else {
      currentTicket = null;
    }
  }

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

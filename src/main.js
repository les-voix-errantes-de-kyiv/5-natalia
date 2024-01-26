import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import textPopup from "./textPopup";

/**
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Pop up
const popup = document.querySelector(".popUp");
const close = document.querySelector(".exit");

let popupContent = document.createElement("p");
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#FEF3E3");

// GLTFLoader

const gltfLoader = new GLTFLoader();

// Animation
let mixer = null;
let action = null;

/**
 * Models
 */

let valise;
let ticket;
let leaf;
let lipstick;
let musicbox;
let pyramid;

gltfLoader.load("/models/ticket.glb", (gltf) => {
  gltf.scene.scale.set(1.1, 1.1, 1.1);
  gltf.scene.position.set(3, -0.7, -2);
  gltf.scene.rotation.y = Math.PI * -0.5 + 0.5;
  ticket = gltf.scene;
  scene.add(gltf.scene);
});

gltfLoader.load("/models/suitcaseV6.glb", (gltf) => {
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.rotation.y = Math.PI * -0.5;
  valise = gltf.scene;

  valise.receiveShadow = true;

  mixer = new THREE.AnimationMixer(valise);
  action = mixer.clipAction(gltf.animations[0]);
  action.clampWhenFinished = true;
  action.setLoop(THREE.LoopOnce);
  scene.add(gltf.scene);
});

gltfLoader.load("/models/leaf.glb", (gltf) => {
  gltf.scene.scale.set(1, 1, 1);
  gltf.scene.position.set(3, -0.7, 1.2);
  gltf.scene.rotation.y = Math.PI * -0.5;
  leaf = gltf.scene;

  scene.add(leaf);
});

gltfLoader.load("/models/lipstick.glb", (gltf) => {
  gltf.scene.scale.set(0.4, 0.4, 0.4);
  gltf.scene.position.set(-4, -0.8, -0.8);
  gltf.scene.rotation.y = Math.PI * -0.5 + 0.2;
  lipstick = gltf.scene;

  scene.add(lipstick);
});

gltfLoader.load("/models/musicbox.glb", (gltf) => {
  gltf.scene.scale.set(6.7, 6.7, 6.7);
  gltf.scene.position.set(0, -0.8, 0);
  gltf.scene.rotation.y = Math.PI * 0.5 - 0.2;
  musicbox = gltf.scene;

  scene.add(musicbox);
});

gltfLoader.load("/models/pyramid.glb", (gltf) => {
  gltf.scene.scale.set(0.75, 0.75, 0.75);
  gltf.scene.position.set(-3, -0.8, 1.5);
  gltf.scene.rotation.y = Math.PI * 0.5 - 0.2;
  pyramid = gltf.scene;

  scene.add(pyramid);
});

/**
 * Textures
 */

/**
 * Object
 */

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
ambientLight.castShadow = true;
scene.add(ambientLight);

const spotLight = new THREE.SpotLight("#F9B856", 30.5, 20, Math.PI * 0.5, 1, 1);
spotLight.position.set(0, 9, 3);
scene.add(spotLight);

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

// Mouse Moove

const mouse = new THREE.Vector2();
let currentValise;
let currentTicket;
let currentLeaf;
let currentLipstick;
let currentMusicbox;
let currentPyramid;

let objectActive = true;

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -((event.clientY / sizes.height) * 2 - 1);
});

window.addEventListener("click", () => {
  if (currentValise) {
    gsap.to(camera.position, { duration: 1, delay: 0, z: 6 });
    gsap.to(camera.position, { duration: 0.8, delay: 0, y: 12 });
    action.play();
  }

  if (currentTicket && objectActive && camera.position.y === 12) {
    objectActive = false;
    popup.classList.add("active");
    popupContent.innerHTML = textPopup[0];
    popup.appendChild(popupContent);
    gsap.to(ticket.position, { duration: 0.8, delay: 0, x: -0.5 });
    gsap.to(ticket.position, { duration: 0.8, delay: 0, y: 6 });
    gsap.to(ticket.position, { duration: 0.8, delay: 0, z: 3.5 });
    gsap.to(ticket.rotation, { duration: 0.8, delay: 0, y: 0 });
  }
  if (currentLeaf && objectActive && camera.position.y === 12) {
    objectActive = false;
    popup.classList.add("active");
    popupContent.innerHTML = textPopup[1];
    popup.appendChild(popupContent);
    gsap.to(leaf.position, { duration: 0.8, delay: 0, x: 0 });
    gsap.to(leaf.position, { duration: 0.8, delay: 0, y: 6 });
    gsap.to(leaf.position, { duration: 0.8, delay: 0, z: 3.5 });
    gsap.to(leaf.rotation, { duration: 0.8, delay: 0, y: 0 });
  }
  if (currentLipstick && objectActive && camera.position.y === 12) {
    objectActive = false;
    popup.classList.add("active");
    popupContent.innerHTML = textPopup[2];
    popup.appendChild(popupContent);
    gsap.to(lipstick.position, { duration: 0.8, delay: 0, x: 0.5 });
    gsap.to(lipstick.position, { duration: 0.8, delay: 0, y: 5 });
    gsap.to(lipstick.position, { duration: 0.8, delay: 0, z: 3.5 });
    gsap.to(lipstick.rotation, { duration: 0.8, delay: 0, y: 0 });
  }
  if (currentMusicbox && objectActive && camera.position.y === 12) {
    objectActive = false;
    popup.classList.add("active");
    popupContent.innerHTML = textPopup[3];
    popup.appendChild(popupContent);
    gsap.to(musicbox.position, { duration: 0.8, delay: 0, x: 0 });
    gsap.to(musicbox.position, { duration: 0.8, delay: 0, y: 4 });
    gsap.to(musicbox.position, { duration: 0.8, delay: 0, z: 3 });
    gsap.to(musicbox.rotation, { duration: 0.8, delay: 0, y: 0 });
  }
  if (currentPyramid && objectActive && camera.position.y === 12) {
    objectActive = false;
    popup.classList.add("active");
    popupContent.innerHTML = textPopup[4];
    popup.appendChild(popupContent);
    gsap.to(pyramid.position, { duration: 0.8, delay: 0, x: 0 });
    gsap.to(pyramid.position, { duration: 0.8, delay: 0, y: 4 });
    gsap.to(pyramid.position, { duration: 0.8, delay: 0, z: 3 });
    gsap.to(pyramid.rotation, { duration: 0.8, delay: 0, y: 0 });
  }
});

close.addEventListener("click", () => {
  objectActive = true;
  currentTicket = null;
  currentLeaf = null;
  currentLipstick = null;
  currentMusicbox = null;
  currentPyramid = null;

  popup.removeChild(popupContent);
  gsap.to(ticket.position, { duration: 0.8, delay: 0, x: 3, y: -0.7, z: -2 });
  gsap.to(leaf.position, { duration: 0.8, delay: 0, x: 3, y: -0.7, z: 1.2 });
  gsap.to(lipstick.position, {
    duration: 0.8,
    delay: 0,
    x: -4,
    y: -0.8,
    z: -0.8,
  });
  gsap.to(lipstick.rotation, {
    duration: 0.8,
    delay: 0,
    y: Math.PI * -0.5 + 0.2,
  });
  gsap.to(musicbox.position, { duration: 0.8, delay: 0, x: 0, y: -0.8, z: 0 });
  gsap.to(pyramid.position, {
    duration: 0.8,
    delay: 0,
    x: -3,
    y: -0.8,
    z: 1.5,
  });

  gsap.to(pyramid.rotation, {
    duration: 0.8,
    delay: 0,
    y: Math.PI * 0.5 - 0.2,
  });
  popup.classList.remove("active");
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
camera.position.z = 30;

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
renderer.shadowMap.enabled = true;

const clock = new THREE.Clock();
let previousTime = 0;

// const rgbeLoader = new RGBELoader();

// rgbeLoader.load("./map/industrial_sunset_puresky_1k.hdr", (environmentMap) => {
//   environmentMap.mapping = THREE.EquirectangularReflectionMapping;

//   scene.background = environmentMap;
//   scene.environment = environmentMap;
// });

function animate() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Model animation
  if (mixer) {
    // the animation happens just once
    mixer.update(deltaTime);
  }

  if (valise) {
    camera.lookAt(valise.position);

    //Raycaster

    const raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, camera);

    const valiseInter = raycaster.intersectObject(valise);
    const ticketInter = raycaster.intersectObject(ticket);
    const leafInter = raycaster.intersectObject(leaf);
    const lipstickInter = raycaster.intersectObject(lipstick);
    const musicboxInter = raycaster.intersectObject(musicbox);
    const pyramidInter = raycaster.intersectObject(pyramid);

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

    if (leafInter.length) {
      currentLeaf = leafInter[0];
    } else {
      currentLeaf = null;
    }

    if (lipstickInter.length) {
      currentLipstick = lipstickInter[0];
    } else {
      currentLipstick = null;
    }

    if (musicboxInter.length) {
      currentMusicbox = musicboxInter[0];
    } else {
      currentMusicbox = null;
    }

    if (pyramidInter.length) {
      currentPyramid = pyramidInter[0];
    } else {
      currentPyramid = null;
    }
  }

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

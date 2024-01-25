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
const gui = new GUI();

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
let leaf;
let lipstick;
let musicbox;
let pyramid;

gltfLoader.load("/models/ticket.glb", (gltf) => {
  gltf.scene.scale.set(1.1, 1.1, 1.1);
  gltf.scene.position.set(3, -1.1, -2);
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

gltfLoader.load("/models/leaf.glb", (gltf) => {
  gltf.scene.scale.set(1, 1, 1);
  gltf.scene.position.set(3, -1.1, 1.2);
  gltf.scene.rotation.y = Math.PI * -0.5;
  leaf = gltf.scene;

  scene.add(leaf);
});

gltfLoader.load("/models/lipstick.glb", (gltf) => {
  gltf.scene.scale.set(0.4, 0.4, 0.4);
  gltf.scene.position.set(-4, -1.2, -0.8);
  gltf.scene.rotation.y = Math.PI * -0.5 +0.2;
  lipstick = gltf.scene;

  scene.add(lipstick);
});

gltfLoader.load("/models/musicbox.glb", (gltf) => {
  gltf.scene.scale.set(6.7, 6.7, 6.7);
  gltf.scene.position.set(0, -1.1, 0);
  gltf.scene.rotation.y = Math.PI * 0.5 - 0.2;
  musicbox = gltf.scene;


  scene.add(musicbox);
});

gltfLoader.load("/models/pyramid.glb", (gltf) => {
  gltf.scene.scale.set(0.75, 0.75, 0.75);
  gltf.scene.position.set(-13.5, 8.5, -0.5);
  gltf.scene.rotation.y = Math.PI * 0.5 - 0.2;
  pyramid = gltf.scene;

  scene.add(pyramid);
});



/**
 * Textures
 */

// add texture in

/**
 * Object
 */

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 6.5),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
plane.position.y = -1.2;
plane.rotation.x = -Math.PI * 0.5;
scene.add(plane);

// const plane2 = new THREE.Mesh(
//   new THREE.PlaneGeometry(1, 2),
//   new THREE.MeshBasicMaterial({ color: 0x000000 })
// );
// plane.position.y = -1;
// gui.add(plane2.position, "x").min(-4).max(4).step(0.01).name("plane2X");
// gui.add(plane2.position, "z").min(-4).max(4).step(0.01).name("plane2Z");

// scene.add(plane2);
/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 4);
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
let currentValise;
let currentTicket;
let currentLeaf;
let currentLipstick;
let currentMusicbox;
let currentPyramid;


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
    console.log("ticket ouvert");
  }
  if(currentLeaf){
    console.log("leaf");
  }
  if(currentLipstick){
    console.log("lipstick");
  }
  if(currentMusicbox){
    console.log("musicbox");
  }
  if(currentPyramid){
    console.log("pyramid");
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

function animate() {
  const elapsedTime = clock.getElapsedTime();

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
    }
    else{
      currentLipstick = null;
    }

    if (musicboxInter.length) {
      currentMusicbox = musicboxInter[0];
    }
    else{
      currentMusicbox = null;
    }

    if (pyramidInter.length) {
      currentPyramid = pyramidInter[0];
    }
    else{
      currentPyramid = null;
    }


  }

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

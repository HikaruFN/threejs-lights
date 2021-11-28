import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

/*Dat.gui*/
const gui = new dat.GUI();

/*Canvas*/
const canvas = document.querySelector("canvas.webgl");

/*Scene*/
const scene = new THREE.Scene();

// /*Axis Helper*/
// const axisHelper = new THREE.AxisHelper();
// scene.add(axisHelper);

/*Sized*/
const sizes = {
  widht: window.innerWidth,
  height: window.innerHeight,
};

/*Meshes*/
const material = new THREE.MeshBasicMaterial();
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);

/*Camera*/
const camera = new THREE.PerspectiveCamera(75, sizes.widht / sizes.height);
camera.position.z = 3;
scene.add(camera);

/*Controls*/
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/*Adaptive*/
window.addEventListener("resize", () => {
  /*Dimensioni*/
  sizes.widht = window.innerWidth;
  sizes.height = window.innerHeight;
  /*Dimensioni Camera*/
  camera.aspect = sizes.widht / sizes.height;
  camera.updateProjectionMatrix;
  /*Dimensioni Renderer*/
  renderer.setSize(sizes.widht, sizes.height);
  renderer.pixelRatio = Math.min(window.devicePixelRatio, 2);
});

/*Renderer*/
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.widht, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

/*Animation*/
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  window.requestAnimationFrame(tick);
  controls.update;
  renderer.render(scene, camera);
};
tick();

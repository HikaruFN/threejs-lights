import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";
import { DirectionalLight } from "three";

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

/*Material*/
const material = new THREE.MeshStandardMaterial({
  roughness: 0.5,
}); /*MeshStandardMaterial richiede la luce!*/
gui.add(material, "roughness").min(1).max(10); /*Debug roughness*/

/*Torus*/
const torusGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64);
const torus = new THREE.Mesh(torusGeometry, material);
torus.position.x = 1.5;

/*Cube*/
const cubeGeometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);
const cube = new THREE.Mesh(cubeGeometry, material);

/*Sphere*/
const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = -1.5;

/*Plane*/
const planeGeometry = new THREE.PlaneBufferGeometry(4.5, 4.5);
const plane = new THREE.Mesh(planeGeometry, material);
plane.rotation.x = -Math.PI * 0.5; /*CERCA DI CAPIRE COM ELO HA RUOTATO!*/
plane.position.y = -0.65; /*CERCA DI CAPIRE COM ELO HA RUOTATO!*/

scene.add(torus, cube, sphere, plane);

/*Camera*/
const camera = new THREE.PerspectiveCamera(75, sizes.widht / sizes.height);
camera.position.z = 3;
scene.add(camera);

/*Light*/
const ambientLight = new THREE.AmbientLight(
  /*Irrealistica, luce ovunque*/ "0xffffff" /*Colore*/,
  0.5 /*intensità*/
);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
  "0xffffff",
  0.5
); /*LUCE DA UNA SIREZIONE, SENZA BOUNCINGN*/
directionalLight.position.set(1, 0.5, 0); /*Puoi gestire la direzione*/
scene.add(directionalLight);
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

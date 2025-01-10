import * as THREE from 'three';
import { OrbitControls, GLTFLoader } from 'three-stdlib';
import { NPC } from './npc';
import { find } from './collection';
import { Track, TrackConfig } from './track';
import { EV } from './ev';
import { Game } from './game';




//Renderer does the job of rendering the graphics
let renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//set up the renderer with the default settings for threejs.org/editor - revision r153
renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1
renderer.useLegacyLights  = false;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
//make sure three/build/three.module.js is over r152 or this feature is not available. 
renderer.outputColorSpace = THREE.SRGBColorSpace 

const scene = new THREE.Scene();
window.scene = scene;

let cameraList = [];

let camera;

async function loadScene(){
  const loader = new GLTFLoader();
  loader.load("./src/scene (2).glb", (gltf)=>{
    console.warn(gltf);
    scene.add(gltf.scene);
    window.root = gltf.scene.children[0];
    _gameTest();
    retrieveListOfCameras(gltf);
  });
  
}

function _gameTest(){
  let game = new Game();
  game.ready();
  game.start();
  // let t1 = find(root, "Plane");
  // let t2 = find(root, "Plane001");
  // let group = new THREE.Group();
  // group.add(...t1, ...t2);
  // root.add(group);
  // let npc0 = new NPC(root.children[2]);
  // let track = new Track(new TrackConfig(1), group);
  GEV.on("update", ()=>{
    game.update();
  })
}

//retrieve list of all cameras
function retrieveListOfCameras(gltf){
  // Get a list of all cameras in the scene
  scene.traverse(function (object) {
    if (object.isCamera) {
      cameraList.push(object);
    }
  });
  // const camera = gltf.scene.children[0].children[0];
  // console.warn(camera);
  // cameraList.push(camera);
  //Set the camera to the first value in the list of cameras
  camera = cameraList[0];

  updateCameraAspect(camera);
  
  // new OrbitControls(camera, renderer.domElement);
  // Start the animation loop after the model and cameras are loaded
  animate();
}

// Set the camera aspect ratio to match the browser window dimensions
function updateCameraAspect(camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
export const GEV = new EV();
//A method to be run each time a frame is generated
function animate() {
  requestAnimationFrame(animate);
  GEV.emit("update");
  renderer.render(scene, camera);
};


loadScene();


    
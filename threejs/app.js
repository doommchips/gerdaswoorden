import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//create a blue LineBasicMaterial
const material2 = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry2 = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry2, material2 );
scene.add( line );



const planeSize = 40;
     
const textLoader = new THREE.TextureLoader();
const texture = textLoader.load('resources/images/checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

const lightColor = 0xFFFFFF;
const lightIntensity = 10;
const light = new THREE.AmbientLight(lightColor, lightIntensity);
scene.add( light );

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
const mesh2 = new THREE.Mesh(planeGeo, planeMat);
mesh2.rotation.x = Math.PI * -.5;
scene.add(mesh2);


const loader = new GLTFLoader();
// loader.load( 
// 	'models/test-01.gltf', 
// 	function ( gltf ) {
// 		scene.add( gltf.scene.children[0] );
// 	}, 
// 	undefined, 
// 	function ( error ) {
// 		console.error( error );
// 	} 
// );

loader.load(
    'models/test-01.gltf', 
    (gltf) =>
    {
		//add it to the scene
		// scene.add(gltf.scene.children[0])
    }
)



camera.position.z = 8;

function animate() {
	requestAnimationFrame( animate );
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

animate();



class ColorGUIHelper {
	constructor(object, prop) {
		this.object = object;
		this.prop = prop;
	}
	get value() {
		return `#${this.object[this.prop].getHexString()}`;
	}
	set value(hexString) {
		this.object[this.prop].set(hexString);
	}
}

const gui = new GUI();
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2, 0.01);
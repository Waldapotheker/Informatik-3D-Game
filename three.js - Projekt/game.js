//Code von Bennett Roth


//three.js 

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';



//neue scene mit Kamera

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );



//bewegungstasten für den keylistener

let KEY_W;
let KEY_A;
let KEY_S;
let KEY_D;


var zMovement = 0.1; // vor, zurück
var xMovement = 0.1; //rechts, links


//key listener (mit console.log um funktionalität zu prüfen)

document.addEventListener('keydown', event => {
    var code = event.code;
    switch(code) {
        case 'KeyW': 
            KEY_W = true;
            robot.rotation.y = Math.PI/100;
			robot.position.z -= zMovement;
			camera.lookAt(robot.position); 
            camera.position.z -= zMovement;
            console.log('W pressed');
            break;
        case 'KeyA':
            KEY_A = true;
            robot.rotation.y = Math.PI/2;
			robot.position.x -= xMovement;
			camera.lookAt(robot.position);
            camera.position.x -= xMovement;
            console.log('A pressed');
            break;
        case 'KeyS': 
            KEY_S = true;
            robot.rotation.y = Math.PI/1;
			robot.position.z += zMovement;
			camera.lookAt(robot.position);
            camera.position.z += zMovement;
            console.log('S pressed');
            break;
        case 'KeyD':
            KEY_D = true;
            robot.rotation.y = Math.PI/-2;
			robot.position.x += xMovement;
			camera.lookAt(robot.position);
            camera.position.x += xMovement;
            console.log('D pressed');
            break;
        case 'KeyE':
            let KEY_E
            KEY_E = true;
            console.log('E pressed');
            if(KEY_E = true){prompt('Kaputte Drohne: "Du hast es hierher geschafft! Leider gibt es noch nicht viel zu entdecken, doch du kannst dich gerne umschauen. :")')};
            break;
            
            
    }
}, false);




//interval, in der die console gecleared wird

//setInterval(function(){
  //  console.clear();
//}, 10000);




//renderer und bewegung der camera

const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//bezeichnungen für Modelle



let mixer;

let robot;

let enemy;

let enemy_mixer;




//boden + textur

const floorTexture = new THREE.TextureLoader().load('textures/floor/Steinfurnier-Mars.jpg');
const geometry = new THREE.BoxGeometry( 100, 1, 100 );
const material = new THREE.MeshBasicMaterial( { map: floorTexture } );
const cube = new THREE.Mesh( geometry, material );


cube.position.z = 0;
cube.position.y = -0.45;
scene.add( cube );

camera.position.z = 3;
camera.position.y = 2;





//laden der spielfigur

const gLoader = new GLTFLoader();
gLoader.load('./models/mech_drone/scene.gltf', (gltf) => {
    console.log(gltf);
    robot = gltf.scene;
	robot.position.z = -1;
	robot.position.y = 0.1;
    mixer = new THREE.AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });

    scene.add(gltf.scene);
});


//laden der anderen Drohne auf dem Boden

const enemy_loader = new GLTFLoader();
enemy_loader.load('./models/enemy/cam drone/enemy_scene.gltf',(enemy) => {
    enemy = enemy;
    enemy.scene.scale.set(0.001, 0.001, 0.001);
    enemy_mixer = new THREE.AnimationMixer(enemy.scene);
    enemy.animations.forEach((clip) => {
        enemy_mixer.clipAction(clip).play();
    })
    scene.add(enemy.scene);
    
});






//lichtquelle

const light = new THREE.AmbientLight(0xeded91);
scene.add(light);

//skybox

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
	'./textures/penguins/arid_ft.jpg',
	'./textures/penguins/arid_bk.jpg',
	'./textures/penguins/arid_up.jpg',
	'./textures/penguins/arid_dn.jpg',
	'./textures/penguins/arid_rt.jpg',
	'./textures/penguins/arid_lf.jpg',
]);
scene.background = texture;

//clock für animationen

let clock = new THREE.Clock();

//funktion, damit Spieler animation gerendered wird

function animate() {
	requestAnimationFrame( animate );
	
	var delta = clock.getDelta();
	if (mixer){
		mixer.update(delta);

		renderer.render( scene, camera );
	}
	
	
	
}




//update funktion

function update(renderer, scene, camera, controls){
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls);
    });
}

//ausführung der animation



animate();

//Abschnitt Niklas & Frederik

//Game button in 3D game überflüssung
//Bäume und Gestaltung der Fläche inplementiert

let tree ;
let tree_mixer;
const tree_loader = new GLTFLoader();
tree_loader.load('./models/enemy/oak_tree/oak_scene.gltf',(tree) => {
    tree = tree;
    tree.scene.scale.set(2, 2, 2);
    tree.scene.position.set(-0.5,0,-1)
    tree_mixer = new THREE.AnimationMixer(tree.scene);
    tree.animations.forEach((clip) => {
        tree_mixer.clipAction(clip).play();
    })
    scene.add(tree.scene);

});

let tree1 ;
let tree1_mixer;
const tree1_loader = new GLTFLoader();
tree1_loader.load('./models/enemy/oak_tree/oak_scene.gltf',(tree1) => {
    tree1 = tree1;
    tree1.scene.scale.set(4, 4, 4);
    tree1.scene.position.set(-1,0,-2)
    tree1_mixer = new THREE.AnimationMixer(tree1.scene);
    tree1.animations.forEach((clip) => {
        tree1_mixer.clipAction(clip).play();
    })
    scene.add(tree1.scene);

});

if (robot.position==enemy.position){
    alert("test")
}



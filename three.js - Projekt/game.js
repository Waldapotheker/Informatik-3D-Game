//Code von Bennett Roth


//three.js 

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


alert(
    'Willkommen zu unserer Tech-Demo:)\n\nSteuerung:\nW -> vorwärts\nA -> links\nS -> zurück\nD -> rechts\nQ -> links-vorwärts\nE -> rechts-vorwärts\nY -> links-zurück\nX -> rechts-zurück\nF -> interagieren\nF11 -> Full-Screen'
);



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
        case 'KeyF':
            let KEY_F
            KEY_F = true;
            console.log('F pressed');
            if(KEY_F = true){prompt('Kaputte Drohne:\n"Du hast es hierher geschafft! Leider gibt es noch nicht viel zu entdecken, doch du kannst dich gerne umschauen. :")')};
            break;
//Code Jonas Luster
        case 'KeyQ':
            let KEY_Q
            KEY_Q = true
            robot.rotation.y = Math.PI/4.5;
            robot.position.z -= zMovement/1.5;
            robot.position.x -= xMovement/1.5;
            camera.lookAt(robot.position);
            camera.position.z -= zMovement/1.5;
            camera.position.x -= xMovement/1.5;
            break;
        case 'KeyE':
            let KEY_E
            KEY_E = true
            robot.rotation.y = Math.PI/-4.5;
            robot.position.z -= zMovement/1.5;
            robot.position.x += xMovement/1.5;
            camera.lookAt(robot.position);
            camera.position.z -= zMovement/1.5;
            camera.position.x += xMovement/1.5;
            break;
        case 'KeyZ':
            let KEY_Z
            KEY_Z = true
            robot.rotation.y = Math.PI/1.5;
            robot.position.z += zMovement/1.5;
            robot.position.x -= xMovement/1.5;
            camera.lookAt(robot.position);
            camera.position.z += zMovement/1.5;
            camera.position.x -= xMovement/1.5;
            break;
        case 'KeyX':
            let KEY_X
            KEY_X = true
            robot.rotation.y = Math.PI/-1.5;
            robot.position.z += zMovement/1.5;
            robot.position.x += xMovement/1.5;
            camera.lookAt(robot.position);
            camera.position.z += zMovement/1.5;
            camera.position.x += xMovement/1.5;
            break;
//Code Jonas Luster Ende
    }
}, false);




//interval, in der die console gecleared wird

setInterval(function(){
    console.clear();
}, 10000);




//renderer und bewegung der camera

const renderer = new THREE.WebGLRenderer();
//const controls = new OrbitControls(camera, renderer.domElement);




//Audio Listener für Geräusche

const listener = new THREE.audioListener();
camera.add(audioListener)

//AudioLoader um sfx zu laden
const sound = new THREE.AudioLoader();
AudioLoader.load('', function(buffer){
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
})




renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//bezeichnungen für Modelle



let mixer;

let robot;

let enemy;

let enemy_mixer;




//boden + textur (forestCube)

const floorTexture = new THREE.TextureLoader().load('textures/floor/Boden-Erde-Steine_A_P4171308.jpg');
const geometry = new THREE.BoxGeometry( 10, 1, 10 );
const material = new THREE.MeshBasicMaterial( { map: floorTexture } );
const forestCube = new THREE.Mesh( geometry, material );


forestCube.position.z = 0;
forestCube.position.y = -0.45;
scene.add( forestCube );



camera.position.z = 1;
camera.position.y = 1;





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

//Code von Niklas Kijek
//Game button in 3D game überflüssig geworden
//Bäume und sämtliche objekte zur Gestaltung der Fläche inplementiert

//Implementierung Bäume --> können geladen werden
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


//Implementierung Grass --> kann im Ordner nicht gefunden werden Error 404
let grass;
let grass_mixer;
const grass_loader = new GLTFLoader();
grass_loader.load('./textures/floor/grass texture/grass_scene.gltf',(grass) => {
    grass = grass;
    grass.scene.scale.set(3, 3, 3);
    grass.scene.position.set(15,1,20)
    grass_mixer = new THREE.AnimationMixer(grass.scene);
    grass.animations.forEach((clip) => {
        grass_mixer.clipAction(clip).play();
    })
    scene.add(grass.scene);
});

// Implementierung Leiche  --> kann im Ordner nicht gefunden werden Error 404
let leiche;
let leiche_mixer;
const leiche_loader = new GLTFLoader();
leiche_loader.load('./models/enemy/leiche/textures/scene.gltf',(leiche) => {
    leiche = leiche;
    leiche.scene.scale.set(1, 1, 1);
    leiche.scene.position.set(-2,1,3)
    leiche_mixer = new THREE.AnimationMixer(leiche.scene);
    leiche.animations.forEach((clip) => {
        leiche_mixer.clipAction(clip).play();
    })
    scene.add(leiche.scene);
});

//Implementierung Haus  --> kann im Ordner nicht gefunden werden Error 404
let haus;
let haus_mixer;
const haus_loader = new GLTFLoader();
haus_loader.load('./house/textures/scene.gltf',(haus) => {
    haus = haus;
    haus.scene.scale.set(0.5, 0.5, 0.5);
    haus.scene.position.set(-10,1,5)
    haus_mixer = new THREE.AnimationMixer(haus.scene);
    haus.animations.forEach((clip) => {
        haus_mixer.clipAction(clip).play();
    })
    scene.add(haus.scene);
});

//Implementierung Brunnen  --> kann im Ordner nicht gefunden werden Error 404
let brunnen;
let brunnen_mixer;
const brunnen_loader = new GLTFLoader();
brunnen_loader.load('./models/environment/brunnen/textures/brunnen_scene.gltf',(brunnen) => {
    brunnen = brunnen;
    brunnen.scene.scale.set(3, 3, 3);
    brunnen.scene.position.set(15,1,20)
    brunnen_mixer = new THREE.AnimationMixer(brunnen.scene);
    brunnen.animations.forEach((clip) => {
        brunnen_mixer.clipAction(clip).play();
    })
    scene.add(brunnen.scene);
});



//Code von Frederik Heine
//Implementierung Baum
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


//Code von Franz Beykirch
//Implementierung Baum
let tree2 ;
let tree2_mixer;
const tree2_loader = new GLTFLoader();
tree2_loader.load('./models/enemy/oak_tree/oak_scene.gltf',(tree2) => {
    tree2 = tree2;
    tree2.scene.scale.set(2, 2, 2);
    tree2.scene.position.set(2,0,-2)
    tree2_mixer = new THREE.AnimationMixer(tree2.scene);
    tree2.animations.forEach((clip) => {
        tree2_mixer.clipAction(clip).play();
    })
    scene.add(tree2.scene);

});


//Code Jonas Luster
//Implementierung Baum
let Tree3 ;
let tree3_mixer;
const tree3_loader = new GLTFLoader();
tree3_loader.load('./models/enemy/oak_tree/oak_scene.gltf',(tree3) => {
    Tree3 = tree3;
    tree3.scene.scale.set(2.5, 2.5, 2.5);
    tree3.scene.position.set(-3,0,-2)
    tree3_mixer = new THREE.AnimationMixer(tree3.scene);
    tree3.animations.forEach((clip) => {
        tree3_mixer.clipAction(clip).play();
    })
    scene.add(tree3.scene);

});

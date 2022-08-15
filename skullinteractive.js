// import './style.css'

// document.querySelector('#app').innerHTML = `
//   <h1>Hello</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import gsap from 'gsap'
import { FontLoader } from './three/three.js-master/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from './three/three.js-master/examples/jsm/geometries/TextGeometry';

import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader'
import Stats from 'https://unpkg.com/three@0.126.1/examples/jsm/libs/stats.module'
import { neonCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'

// neonCursor({
//     el: document.getElementById('canvasID'),
//     shaderPoints: 16,
//     curvePoints: 80,
//     curveLerp: 0.5,
//     radius1: 5,
//     radius2: 30,
//     velocityTreshold: 10,
//     sleepRadiusX: 100,
//     sleepRadiusY: 100,
//     sleepTimeCoefX: 0.0025,
//     sleepTimeCoefY: 0.0025
// })
const scene = new THREE.Scene()
    // scene.add(new THREE.AxesHelper(5))

// const light = new THREE.SpotLight()
// light.position.set(5, 5, 5)
// scene.add(light)
var pointLights = [];
var scale = 9

const particlesGeometry = new THREE.BufferGeometry;
const starloader = new THREE.TextureLoader();
const cross = starloader.load('./Images/star.png')
const group2 = new THREE.Group();
scene.add(group2)

var pointLight = new THREE.PointLight({ color: '0xcc1111' }, 0.2);
pointLight.decay = 1;
// pointLight.position.set(-2.37, -18.15, 20.48);

pointLight.position.set(0, 20, 20);
scene.add(pointLight);

var sphere = new THREE.SphereGeometry(0.1, 16, 8);
for (var i = 0; i <= 8; i++) {
    var colorArray = [16722020, 61722020, 96929020, 16722020, 16722020, 10118111, 10118111, 10118111, 10118111]
    var light2 = new THREE.PointLight(colorArray[i], .8, 10);
    light2.add(new THREE.Points(particlesGeometry, new THREE.PointsMaterial({
        size: 0.007,
        map: cross,
        color: colorArray[i],
    })));

    group2.add(light2);
    pointLights.push(light2);
}

var centersphere = new THREE.SphereGeometry(0.1, 16, 8);
for (var i = 0; i <= 8; i++) {
    var light3 = new THREE.PointLight(80909090, .8, 10);
    light3.add(new THREE.Mesh(centersphere, new THREE.MeshBasicMaterial({ color: 80909090 })));

    group2.add(light3);

}
//  var sphereSize = 1;
//  var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
//  scene.add( pointLightHelper );
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 12
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
// renderer.physicallyCorrectLights = true
// renderer.shadowMap.enabled = true
// renderer.outputEncoding = THREE.sRGBEncoding
renderer.setClearColor(0x000109, 1);
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

const fontLoader = new FontLoader();
fontLoader.load(
    './Fonts/Unique_Regular.json',
    (font) => {
        const textGeometry1 = new TextGeometry(' T I T L E', {
            size: 20,
            height: 4,
            font: font,
        });

        const textGeometry2 = new TextGeometry(' ART|PROJECTS|ABOUT ', {
            size: 20,
            height: 4,
            font: font,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xeeee22 });

        const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial);
        textMesh1.position.x = -10;
        textMesh1.position.y = 1;
        textMesh1.scale.set(0.05, 0.04, 0.01)
        scene.add(textMesh1);
        const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial);
        textMesh2.position.x = 5;
        textMesh2.position.y = 1;
        textMesh2.scale.set(0.03, 0.03, 0.01)
        scene.add(textMesh2);

    }
);
const group1 = new THREE.Group();
scene.add(group1)
const loader = new GLTFLoader()
loader.load(
    'Models/Skull/scene.gltf',
    function(gltf) {
        // gltf.scene.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         const m = (child as THREE.Mesh)
        //         m.receiveShadow = true
        //         m.castShadow = true
        //     }
        //     if (((child as THREE.Light)).isLight) {
        //         const l = (child as THREE.Light)
        //         l.castShadow = true
        //         l.shadow.bias = -.003
        //         l.shadow.mapSize.width = 2048
        //         l.shadow.mapSize.height = 2048
        //     }
        // })
        gltf.scene.scale.set(4, 4, 4)

        group1.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)
const loader2 = new GLTFLoader()
loader2.load(
    'Models/Eye/eye1.gltf',
    function(gltf) {
        gltf.scene.scale.set(0.3, 0.3, 0.3)
        gltf.scene.position.set(1.2, -0.2, 2.8)
            // group.add(gltf.scene)
    }
)
const loader3 = new GLTFLoader()
loader3.load(
    'Models/Eye/eye1.gltf',
    function(gltf) {
        gltf.scene.scale.set(0.3, 0.3, 0.3)
        gltf.scene.position.set(-1.2, -0.2, 2.8)
            // group.add(gltf.scene)
    }
)
var mouseX = 0;
var mouseY = 0
window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
document.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
    event.preventDefault();

    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
};


var mouseDown = 0;
document.body.onmousedown = function() {
    ++mouseDown;
    if (mouseDown > 1) {
        mouseDown = 1;
    }
}
document.body.onmouseup = function() {
    --mouseDown;
}
const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    // controls.update()
    if (group1) {
        group1.rotation.y = mouseX * .45;
        group1.rotation.x = mouseY * -.45;
    }
    // textMesh.rotation.x += 0.5

    if (mouseX > -2 && mouseX < 2) {
        if (mouseY > -2 && mouseY < 2) {

            var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
            vector.unproject(camera);
            var dir = vector.sub(camera.position).normalize();
            var distance = -camera.position.z / dir.z;
            var pos = camera.position.clone().add(dir.multiplyScalar(distance));

            if (mouseDown) {

                group1.position.x = pos.x * 0.2;
                group1.position.y = pos.y * 0.2;
                gsap.to(group1.scale, { x: 1.8, y: 1.8, z: 1.8 })
                group2.position.x = pos.x * 0.2;
                group2.position.y = pos.y * 0.2;
                group2.position.z = pos.z * 1;
                gsap.to(group2.scale, { x: 1.8, y: 1.8, z: 1.8 })
            } else {
                gsap.to(group1.position, { x: 0, y: 0, z: 0 })
                gsap.to(group1.scale, { x: 0.4, y: 0.4, z: 0.4 })
                gsap.to(group2.position, { x: 0, y: 0, z: 0 })
                gsap.to(group2.scale, { x: 0.4, y: 0.4, z: 0.4 })

            }

        }


    }




    render()
    var time = Date.now() * 0.0008;
    pointLights[0].position.x = Math.sin(time * 2.3) * scale;
    pointLights[0].position.y = Math.sin(time * 2.5) * scale;
    pointLights[0].position.z = Math.cos(time * 2.4) * scale;


    pointLights[1].position.x = Math.sin(time * 2.6) * scale;
    pointLights[1].position.y = Math.cos(time * 2.7) * scale;
    pointLights[1].position.z = Math.sin(time * 2.3) * scale;

    pointLights[2].position.x = Math.cos(time * 2.5) * scale;
    pointLights[2].position.y = Math.cos(time * 2.6) * scale;
    pointLights[2].position.z = Math.sin(time * 2.8) * scale;

    pointLights[3].position.x = Math.sin(time * 2.3) * scale;
    pointLights[3].position.y = Math.cos(time * 2.5) * scale;
    pointLights[3].position.z = Math.cos(time * 2.7) * scale;

    pointLights[4].position.x = Math.sin(time * 2.7) * scale;
    pointLights[4].position.y = Math.sin(time * 2.3) * scale;
    pointLights[4].position.z = Math.cos(time * 2.2) * scale;

    pointLights[5].position.x = Math.sin(time * 2.5) * scale;
    pointLights[5].position.y = Math.cos(time * 2.8) * scale;
    pointLights[5].position.z = Math.sin(time * 2.5) * scale;

    pointLights[6].position.x = Math.sin(time * 2.5) * scale;
    pointLights[6].position.y = Math.cos(time * 2.8) * scale;
    pointLights[6].position.z = Math.cos(time * 2.7) * scale;

    pointLights[7].position.x = Math.sin(time * 2.3) * scale;
    pointLights[7].position.y = Math.cos(time * 2.5) * scale;
    pointLights[7].position.z = Math.sin(time * 2.2) * scale;

    pointLights[8].position.x = Math.sin(time * 2.8) * scale;
    pointLights[8].position.y = Math.cos(time * 2.3) * scale;
    pointLights[8].position.z = Math.cos(time * 2.3) * scale;

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
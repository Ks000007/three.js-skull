// import './style.css'

// document.querySelector('#app').innerHTML = `
//   <h1>Hello</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import gsap from 'gsap'


const gui = new dat.GUI();
const world = {
    plane: {
        width: 20,
        height: 20,
        widthSegments: 18,
        heightSegments: 18
    }
}

gui.add(world.plane, 'width', 1, 20).
onChange(() => {

    generatePlane()

})
gui.add(world.plane, 'height', 1, 20).
onChange(() => {
    generatePlane()

})
gui.add(world.plane, 'widthSegments', 1, 60).
onChange(() => {
    generatePlane()

})
gui.add(world.plane, 'heightSegments', 1, 60).
onChange(() => {
    generatePlane()

})

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const raycaster = new THREE.Raycaster();

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments);
const planeMaterial = new THREE.MeshPhongMaterial({

    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading,
    vertexColors: true
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

function generatePlane() {
    planeMesh.geometry.dispose()

    planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments);

    const { array } = planeMesh.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];

        array[i + 2] = z + Math.random();
        array[i] = x + (Math.random() - 0.5) * 0.1;
        array[i + 1] = y + (Math.random() - 0.5) * 0.1;
    }
    planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array;
    const colors = [];
    for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
        colors.push(0.2, 0.5, 0.7);
    }
    planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))

}
const colors = [];
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(0.2, 0.5, 0.7);
}
planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))
const lightA = new THREE.DirectionalLight(0xffffff, 1);
lightA.position.set(0, 0, 3);
scene.add(lightA);
const lightB = new THREE.DirectionalLight(0xffffff, 1);
lightB.position.set(0, 0, -3);
scene.add(lightB);

new OrbitControls(camera, renderer.domElement)
camera.position.z = 5;
console.log(planeMesh.geometry.attributes.position.array);
const { array } = planeMesh.geometry.attributes.position;

for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
}

const mouse = {
    x: undefined,
    y: undefined
}
addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1;
})

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    raycaster.setFromCamera(mouse, camera);
    const { array, originalPosition } = planeMesh.geometry.attributes.position;

    const intersects = raycaster.intersectObject(planeMesh);
    if (intersects.length > 0) {
        const { color } = intersects[0].object.geometry.attributes;

        const initialColor = {
            r: 0.2,
            g: 0.5,
            b: 0.7
        }
        const hoverColor = {
            r: 1,
            g: 0.5,
            b: 1
        }
        gsap.to(hoverColor, {
            r: initialColor.r,
            g: initialColor.g,
            b: initialColor.b,
            onUpdate: () => {
                //a
                color.setX(intersects[0].face.a, hoverColor.r);
                color.setY(intersects[0].face.a, hoverColor.g);
                color.setZ(intersects[0].face.a, hoverColor.b);
                //b
                color.setX(intersects[0].face.b, hoverColor.r);
                color.setY(intersects[0].face.b, hoverColor.g);
                color.setZ(intersects[0].face.b, hoverColor.b);
                //c
                color.setX(intersects[0].face.c, hoverColor.r);
                color.setY(intersects[0].face.c, hoverColor.g);
                color.setZ(intersects[0].face.c, hoverColor.b);
                color.needsUpdate = true;
            }

        })
    }


}
animate()
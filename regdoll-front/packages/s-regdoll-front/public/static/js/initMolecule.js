/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-18 13:32:04
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 11:13:01
 */

import * as THREE from "./three.module.js";

import { TrackballControls } from "./TrackballControls.js";
import { PDBLoader } from "./PDBLoader.js";
import { CSS3DRenderer, CSS3DObject, CSS3DSprite } from "./CSS3DRenderer.js";

let camera, scene, renderer;
let controls;
let root;
const objects = [];
const tmpVec1 = new THREE.Vector3();
const tmpVec2 = new THREE.Vector3();
const tmpVec3 = new THREE.Vector3();
const tmpVec4 = new THREE.Vector3();
const offset = new THREE.Vector3();

let visualizationType = 2;

// const MOLECULES = {
//     "Ethanol": "ethanol.pdb",
//     "Aspirin": "aspirin.pdb",
//     "Caffeine": "caffeine.pdb",
//     "Nicotine": "nicotine.pdb",
//     "LSD": "lsd.pdb",
//     "Cocaine": "cocaine.pdb",
//     "Cholesterol": "cholesterol.pdb",
//     "Lycopene": "lycopene.pdb",
//     "Glucose": "glucose.pdb",
//     "Aluminium oxide": "Al2O3.pdb",
//     "Cubane": "cubane.pdb",
//     "Copper": "cu.pdb",
//     "Fluorite": "caf2.pdb",
//     "Salt": "nacl.pdb",
//     "YBCO superconductor": "ybco.pdb",
//     "Buckyball": "buckyball.pdb",
//     // "Diamond": "diamond.pdb",
//     "Graphite": "graphite.pdb"
// };
const MOLECULES = [
    "ybco.pdb",
    "aspirin.pdb",
    "caffeine.pdb",
    "nacl.pdb",
    "Al2O3.pdb",
    "nicotine.pdb",
    "lsd.pdb",
    "cocaine.pdb",
    "graphite.pdb",
];
const loader = new PDBLoader();
const colorSpriteMap = {};
const baseSprite = document.createElement("img");

const menu = document.getElementById("menu");

window.onload = () => {
    init();
    animate();
};

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    root = new THREE.Object3D();
    scene.add(root);

    //

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("container").appendChild(renderer.domElement);

    //

    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;

    //

    baseSprite.onload = function() {
        loadMolecule("/static/models/caffeine.pdb");
        // createMenu();
    };

    baseSprite.src = "static/picture/ball.png";

    //

    window.addEventListener("resize", onWindowResize);
    let nowMolecule = 2;
    setInterval(() => {
        nowMolecule = ++nowMolecule % MOLECULES.length;
        const url = "./static/models/" + MOLECULES[nowMolecule];
        console.log(MOLECULES[nowMolecule]);
        loadMolecule(url);
    }, 5000);
}

//

function generateButtonCallback(url) {
    return function() {
        loadMolecule(url);
    };
}

function createMenu() {
    for (const m in MOLECULES) {
        const button = document.createElement("button");
        button.innerHTML = m;
        menu.appendChild(button);

        const url = "/static/models/" + MOLECULES[m];

        button.addEventListener("click", generateButtonCallback(url));
    }

    const b_a = document.getElementById("b_a");
    const b_b = document.getElementById("b_b");
    const b_ab = document.getElementById("b_ab");

    b_a.addEventListener("click", function() {
        visualizationType = 0;
        showAtoms();
    });
    b_b.addEventListener("click", function() {
        visualizationType = 1;
        showBonds();
    });
    b_ab.addEventListener("click", function() {
        visualizationType = 2;
        showAtomsBonds();
    });
}

//

function showAtoms() {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];

        if (object instanceof CSS3DSprite) {
            object.element.style.display = "";
            object.visible = true;
        } else {
            object.element.style.display = "none";
            object.visible = false;
        }
    }
}

function showBonds() {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];

        if (object instanceof CSS3DSprite) {
            object.element.style.display = "none";
            object.visible = false;
        } else {
            object.element.style.display = "";
            object.element.style.height = object.userData.bondLengthFull;
            object.visible = true;
        }
    }
}

function showAtomsBonds() {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];

        object.element.style.display = "";
        object.visible = true;

        if (!(object instanceof CSS3DSprite)) {
            object.element.style.height = object.userData.bondLengthShort;
        }
    }
}

//

function colorify(ctx, width, height, color) {
    const r = color.r,
        g = color.g,
        b = color.b;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0, l = data.length; i < l; i += 4) {
        data[i + 0] *= r;
        data[i + 1] *= g;
        data[i + 2] *= b;
    }

    ctx.putImageData(imageData, 0, 0);
}

function imageToCanvas(image) {
    const width = image.width;
    const height = image.height;

    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, width, height);

    return canvas;
}

//

function loadMolecule(url) {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        object.parent.remove(object);
    }

    objects.length = 0;

    loader.load(url, function(pdb) {
        const geometryAtoms = pdb.geometryAtoms;
        const geometryBonds = pdb.geometryBonds;
        const json = pdb.json;

        geometryAtoms.computeBoundingBox();
        geometryAtoms.boundingBox.getCenter(offset).negate();

        geometryAtoms.translate(offset.x, offset.y, offset.z);
        geometryBonds.translate(offset.x, offset.y, offset.z);

        const positionAtoms = geometryAtoms.getAttribute("position");
        const colorAtoms = geometryAtoms.getAttribute("color");

        const position = new THREE.Vector3();
        const color = new THREE.Color();

        for (let i = 0; i < positionAtoms.count; i++) {
            position.fromBufferAttribute(positionAtoms, i);
            color.fromBufferAttribute(colorAtoms, i);

            const atomJSON = json.atoms[i];
            const element = atomJSON[4];

            if (!colorSpriteMap[element]) {
                const canvas = imageToCanvas(baseSprite);
                const context = canvas.getContext("2d");

                colorify(context, canvas.width, canvas.height, color);

                const dataUrl = canvas.toDataURL();

                colorSpriteMap[element] = dataUrl;
            }

            const colorSprite = colorSpriteMap[element];

            const atom = document.createElement("img");
            atom.src = colorSprite;

            const object = new CSS3DSprite(atom);
            object.position.copy(position);
            object.position.multiplyScalar(100);

            object.matrixAutoUpdate = false;
            object.updateMatrix();

            root.add(object);

            objects.push(object);
        }

        const positionBonds = geometryBonds.getAttribute("position");

        const start = new THREE.Vector3();
        const end = new THREE.Vector3();

        for (let i = 0; i < positionBonds.count; i += 2) {
            start.fromBufferAttribute(positionBonds, i);
            end.fromBufferAttribute(positionBonds, i + 1);

            start.multiplyScalar(100);
            end.multiplyScalar(100);

            tmpVec1.subVectors(end, start);
            const bondLength = tmpVec1.length() - 50;

            //

            let bond = document.createElement("div");
            bond.className = "bond";
            bond.style.height = bondLength + "px";

            let object = new CSS3DObject(bond);
            object.position.copy(start);
            object.position.lerp(end, 0.5);

            object.userData.bondLengthShort = bondLength + "px";
            object.userData.bondLengthFull = bondLength + 55 + "px";

            //

            const axis = tmpVec2.set(0, 1, 0).cross(tmpVec1);
            const radians = Math.acos(tmpVec3.set(0, 1, 0).dot(tmpVec4.copy(tmpVec1).normalize()));

            const objMatrix = new THREE.Matrix4().makeRotationAxis(axis.normalize(), radians);
            object.matrix.copy(objMatrix);
            object.quaternion.setFromRotationMatrix(object.matrix);

            object.matrixAutoUpdate = false;
            object.updateMatrix();

            root.add(object);

            objects.push(object);

            //

            bond = document.createElement("div");
            bond.className = "bond";
            bond.style.height = bondLength + "px";

            const joint = new THREE.Object3D(bond);
            joint.position.copy(start);
            joint.position.lerp(end, 0.5);

            joint.matrix.copy(objMatrix);
            joint.quaternion.setFromRotationMatrix(joint.matrix);

            joint.matrixAutoUpdate = false;
            joint.updateMatrix();

            object = new CSS3DObject(bond);
            object.rotation.y = Math.PI / 2;

            object.matrixAutoUpdate = false;
            object.updateMatrix();

            object.userData.bondLengthShort = bondLength + "px";
            object.userData.bondLengthFull = bondLength + 55 + "px";

            object.userData.joint = joint;

            joint.add(object);
            root.add(joint);

            objects.push(object);
        }

        //console.log( "CSS3DObjects:", objects.length );

        // switch (visualizationType) {

        //     case 0:
        //         showAtoms();
        //         break;
        //     case 1:
        //         showBonds();
        //         break;
        //     case 2:
        //         showAtomsBonds();
        //         break;

        // }
        showAtomsBonds();
    });
}

//

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    const time = Date.now() * 0.0004;

    root.rotation.x = time;
    root.rotation.y = time * 0.7;

    render();
}

function render() {
    renderer.render(scene, camera);
}
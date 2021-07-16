import * as THREE from "three";
// @ts-ignore
import { GUI } from "/@/assets/js/dat.gui.js";

// @ts-ignore
import { TransformControls } from "/@/assets/js/TransformControls.js";
// @ts-ignore
import { OrbitControls } from "/@/assets/js/OrbitControls.js";

import { onMounted, ref, watchEffect, shallowRef } from "vue";

import { MoleculeRequest } from '/@/api/MoleculeRequest'
import { AtomRequest } from '/@/api/AtomRequest'
import { ElMessage } from 'element-plus'
const nowSelectObj = ref(undefined),
    // atomChangeNameVisible = ref(false),
    // atomNameInput = ref(""),
    selectAtomPosition = ref({
        x: 0,
        y: 0,
        z: 0
    }),
    atomPositionWindow = ref(false),
    // openAtomChangeName = () => {
    //     if (nowSelectObj.value) {
    //         atomNameInput.value = nowSelectObj.value.atomName
    //     }
    //     atomChangeNameVisible.value = true;
    // },
    // closeAtomChangeName = () => {
    //     atomChangeNameVisible.value = false;
    //     atomNameInput.value = ""
    // },
    changeSelectAtomName = () => {
        nowSelectObj.value.atomName = atomNameInput.value
        closeAtomChangeName();
    },
    openAtomPositionWindow = () => {
        atomPositionWindow.value = true;
    },
    closeAtomPositionWindow = () => {
        atomPositionWindow.value = false;
        console.log(splineHelperObjects);
    },
    changeSelectAtomPosition = () => {

        for (let tmpAtom of splineHelperObjects.value) {
            if (nowSelectObj.value.uuid == tmpAtom.uuid) {
                nowSelectObj.value.position.set(parseFloat(selectAtomPosition.value.x), parseFloat(selectAtomPosition.value.y), parseFloat(selectAtomPosition.value.z))

            }
        }
        closeAtomPositionWindow()

    },
    valenceInput = ref(0),
    valenceInputVis = ref(false),
    openValence = () => {
        valenceInput.value = nowSelectObj.value.valence
        valenceInputVis.value = true;

    },
    closeValence = () => {
        valenceInputVis.value = false;
    },
    setSelectAtomValence = () => {
        nowSelectObj.value.valence = valenceInput.value
        closeValence();
    },
    // radiusInput = ref(""),
    // radiusInputVib = ref(false),
    // openRadiusInput = () => {
    //     radiusInput.value = nowSelectObj.value.geometry.parameters.radius
    //     radiusInputVib.value = true;
    // },
    // closeRadiusInput = () => {
    //     radiusInputVib.value = false;
    // },
    changeSelectAtomRadius = () => {
        // if () {

        updateGroupGeometry(nowSelectObj.value, new THREE.SphereGeometry(parseFloat(radiusInput.value), 58, 58))
        closeRadiusInput()
            // }
    },
    // atomColorSet = ref("rgb(0,0,0)"),
    // atomColorSetVib = ref(false),
    // openAtomColorWindow = () => {
    //     atomColorSet.value = nowSelectObj.value.material.color.getStyle()
    //     atomColorSetVib.value = true;
    // },
    // closeAtomColorWindow = () => {
    //     atomColorSetVib.value = false;
    // },
    // setSelectAtomColor = () => {
    //     nowSelectObj.value.material.color = new THREE.Color(atomColorSet.value);
    //     closeAtomColorWindow()
    // // },
    // addAtomForm = ref({
    //     color: "rgb(0,224,198)",
    //     radius: 20,
    //     atomName: "H",
    //     valence: 0
    // }),
    // addAtomFormVib = ref(false),
    // openAddAtomWindow = () => {
    //     addAtomForm.value = {
    //         color: "rgb(0,224,198)",
    //         radius: 20,
    //         atomName: "H",
    //         valence: 0
    //     };
    //     addAtomFormVib.value = true;
    // },
    // closeAtomWindow = () => {
    //     addAtomFormVib.value = false;
    // },
    addPoint = (addAtom) => {
        splinePointsLength++;
        // positions.push(addSplineObject(null,
        //   parseFloat(addAtomForm.value.radius),
        //   addAtomForm.value.color, addAtomForm.value.atomName, addAtomForm.value.valence).position);
        // closeAtomWindow()
        positions.push(addSplineObject(null, addAtom, valenceInput.value).position)
    }



import E from 'wangeditor'

let knowledgePointEditor;
const inLeftAtom = ['H', 'Li', 'Be', 'C', 'N', 'Na', 'Mg', 'Al', 'K', 'Ca', 'Cu', 'Fe'];
const inSceneAtoms = ref(new Map()),
    numberSubscript = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'],
    saveToMoleculeVis = ref(false),
    openSaveMoleculeWindow = () => {
        initSaveToMoleculeFrom()
        saveToMoleculeVis.value = true;
        if (!knowledgePointEditor) {
            setTimeout(() => {
                knowledgePointEditor = new E('#wangEditor')
                knowledgePointEditor.config.uploadImgShowBase64 = true
                knowledgePointEditor.config.height = 600
                knowledgePointEditor.config.onchange = function(html) {
                    // 第二步，监控变化，同步更新到 textarea
                    moleculeForm.value.knowledgePoint = knowledgePointEditor.txt.html()
                }
                knowledgePointEditor.create()
            }, 500)
        }
    },
    closeSaveMoleculeWindow = () => {
        saveToMoleculeVis.value = false;
    },
    moleculeForm = ref({
        name: '', //分子名
        expression: '', //分子表达式
        knowledgePoint: '', //知识点
        matterState: '', //物态（常温）
        meltingPoint: '', //熔点
        density: '', //密度
        reactivity: '氧化性' //反应活性
    }),
    reactivityOption = [{
        value: "氧化性",
        label: "氧化性"
    }, {
        value: "还原性",
        label: "还原性"
    }, {
        value: "惰性",
        label: "惰性"
    }],
    valenceList = ref([]),
    saveValenceChange = (current, old, item) => {
        for (let tmpAtom of splineHelperObjects.value) {
            if (tmpAtom.uuid == item.uuid) {
                tmpAtom.valence = current
            }
        }
    },
    expressionInput = (value) => {
        let matchRes;
        while ((matchRes = value.match(/[\d]/))) {
            value = value.replace(matchRes[0], numberSubscript[parseInt(matchRes[0])]);
        }
        moleculeForm.value.expression = value;
    },
    saveMolecule = async() => {
        let atomDatas = []
        for (let tmpAtom of splineHelperObjects.value) {
            // tmpAtom

            atomDatas.push({
                atom: tmpAtom.atom,
                x: tmpAtom.position.x,
                y: tmpAtom.position.y,
                z: tmpAtom.position.z,
                valence: tmpAtom.valence
            })
        }
        moleculeForm.value.atomDatas = atomDatas
        let saveRes = await MoleculeRequest.addMolecule(moleculeForm.value)
        if (saveRes.code == "200") {
            ElMessage({ type: "success", message: "保存成功" })
            location.reload();
        }
    }




function initSaveToMoleculeFrom() {
    // inSceneAtoms.value = new Map();
    valenceList.value = [];
    for (let tmpAtom of splineHelperObjects.value) {
        valenceList.value.push({
                en_name: tmpAtom.atom.en_name,
                valence: tmpAtom.valence,
                uuid: tmpAtom.uuid
            })
            // if (inSceneAtoms.value.has(tmpAtom.atomName)) {
            //     inSceneAtoms.value.set(tmpAtom.atomName, inSceneAtoms.value.get(tmpAtom.atomName) + 1)
            // } else {
            //     inSceneAtoms.value.set(tmpAtom.atomName, 1)
            // }
    }

}

import { inject } from 'vue'
import { OPEN_LOADING_WINDOW, CLOSE_LOADING_WINDOW } from '/@/PROVIDE_KEY'
const showAtomChooseWindow = ref(false),
    openLoadingWindow = inject(OPEN_LOADING_WINDOW),
    closeLoadingWindow = inject(CLOSE_LOADING_WINDOW),
    atomArray = ref([]),
    chooseAtomEnName = ref(""),
    closeAtomChooseWindow = () => {
        setTimeout(() => {
            showAtomChooseWindow.value = false;
        }, 200);
    },
    openAtomChooseWindow = async() => {
        if (atomArray.value.length == 0) {
            let atomListResult = await AtomRequest.reqAtomList();
            if (atomListResult.code == "200") {
                atomArray.value = atomListResult.data;
            }
        }
        showAtomChooseWindow.value = true;
    },
    affirmChooseAtom = () => {
        closeAtomChooseWindow();
        openLoadingWindow && openLoadingWindow();
        if (chooseAtomEnName.value.length > 0) {
            atomArray.value.map((item, i) => {
                if (item.en_name == chooseAtomEnName.value) {
                    valenceInput.value = 0;
                    addPoint(item)
                }
            });
        }
        closeLoadingWindow && closeLoadingWindow();
    };

export function initMoleculeEditScene() {
    onMounted(() => {
        init();
        animate();
    });
    return {
        showAtomChooseWindow,
        openAtomChooseWindow,
        affirmChooseAtom,
        chooseAtomEnName,
        atomArray,
        closeAtomChooseWindow,
        openSaveMoleculeWindow,
        closeSaveMoleculeWindow,
        expressionInput,
        valenceList,
        reactivityOption,
        moleculeForm,
        saveToMoleculeVis,
        // atomColorSet,
        saveMolecule,
        // atomColorSetVib,
        // openAtomColorWindow,
        // closeAtomColorWindow,
        // setSelectAtomColor,
        // atomChangeNameVisible,
        // openAtomChangeName,
        // closeAtomChangeName,
        // atomNameInput,
        changeSelectAtomName,
        nowSelectObj,
        selectAtomPosition,
        atomPositionWindow,
        openAtomPositionWindow,
        closeAtomPositionWindow,
        changeSelectAtomPosition,
        // radiusInput,
        // radiusInputVib,
        // openRadiusInput,
        // closeRadiusInput,
        // changeSelectAtomRadius,
        // addAtomForm,
        // addAtomFormVib,
        // openAddAtomWindow,
        // closeAtomWindow,
        addPoint,
        valenceInput,
        valenceInputVis,
        openValence,
        closeValence,
        setSelectAtomValence,
        splineHelperObjects,
        saveValenceChange
    }
}


function updateGroupGeometry(mesh, geometry) {

    mesh.geometry.dispose();
    // mesh.children[1].geometry.dispose();
    // mesh.children[0].geometry = new WireframeGeometry(geometry);
    mesh.geometry = geometry;
    // these do not update nicely together if shared
}
class MoleculeAtom extends THREE.Mesh {
    atom;
    valence;
    constructor(geometry, material) {
        super(geometry, material)
    }

}
let container;

let camera, scene, renderer;
const splineHelperObjects = shallowRef([]);
let splinePointsLength = 0;
const positions = [];

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const onUpPosition = new THREE.Vector2();
const onDownPosition = new THREE.Vector2();

let transformControl;

const ARC_SEGMENTS = 200;

const params = {
    openAtomChooseWindow,
    removePoint: removePoint,
    openSaveMoleculeWindow,
    // exportSpline: exportSpline,
    // changeAtomName: changeAtomName,
    openAtomPositionWindow,
    // openRadiusInput,
    // openAtomColorWindow,
    openValence
};
let mainGui, selectObjFolder

function init() {
    container = document.getElementById("container");

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        10000
    );
    camera.position.set(0, 250, 1000);
    scene.add(camera);

    scene.add(new THREE.AmbientLight(0xf0f0f0));
    const light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 1500, 200);
    light.angle = Math.PI * 0.2;
    light.castShadow = true;
    light.shadow.camera.near = 200;
    light.shadow.camera.far = 2000;
    light.shadow.bias = -0.000222;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add(light);

    const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    planeGeometry.rotateX(-Math.PI / 2);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });

    const plane = new MoleculeAtom(planeGeometry, planeMaterial);
    plane.position.y = -200;
    plane.receiveShadow = true;
    scene.add(plane);

    const helper = new THREE.GridHelper(2000, 100);
    helper.position.y = -199;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    scene.add(helper);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);


    if (!mainGui) {
        mainGui = new GUI();

        mainGui.add(params, "openAtomChooseWindow", "添加原子");

        mainGui.add(params, "openSaveMoleculeWindow", "保存分子");
        mainGui.open();
        selectObjFolder = mainGui.addFolder("选中原子");
        selectObjFolder.add(params, "removePoint", "删除选中原子");
        // selectObjFolder.add(params, "changeAtomName", "改变原子名");
        selectObjFolder.add(params, "openAtomPositionWindow", "输入位置")
            // selectObjFolder.add(params, "openRadiusInput", "打开半径输入框")

        // selectObjFolder.add(params, "openAtomColorWindow", "设定原子颜色")
        selectObjFolder.add(params, "openValence", "元素化合价设定")
    }

    watchEffect(() => {
            if (nowSelectObj.value == undefined) {
                selectObjFolder.hide();

            } else {
                params.selectName = nowSelectObj.value.atomName;
                selectObjFolder.open();
                selectObjFolder.show();

                selectAtomPosition.value.x = nowSelectObj.value.position.x;
                selectAtomPosition.value.y = nowSelectObj.value.position.y
                selectAtomPosition.value.z = nowSelectObj.value.position.z
            }
        })
        // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.damping = 0.2;
    controls.addEventListener("change", render);

    transformControl = new TransformControls(camera, renderer.domElement);
    transformControl.addEventListener("change", render);
    transformControl.addEventListener("dragging-changed", function(event) {
        controls.enabled = !event.value;
    });
    scene.add(transformControl);

    transformControl.addEventListener("objectChange", function() {});

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointermove", onPointerMove);

    /*******
     * Curves
     *********/

    // for (let i = 0; i < splinePointsLength; i++) {
    //     addSplineObject(positions[i]);
    // }

    // positions.length = 0;

    // for (let i = 0; i < splinePointsLength; i++) {
    //     positions.push(splineHelperObjects[i].position);
    // }

    // const geometry = new THREE.BufferGeometry();
    // geometry.setAttribute(
    //     "position",
    //     new THREE.BufferAttribute(new Float32Array(ARC_SEGMENTS * 3), 3)
    // );

    // load([
    //     new THREE.Vector3(
    //         289.76843686945404,
    //         452.51481137238443,
    //         56.10018915737797
    //     ),
    //     new THREE.Vector3(-53.56300074753207,
    //         171.49711742836848, -14.495472686253045
    //     ),
    //     new THREE.Vector3(-91.40118730204415,
    //         176.4306956436485, -6.958271935582161
    //     ),
    //     new THREE.Vector3(-383.785318791128, 491.1365363371675, 47.869296953772746),
    // ]);
}


function addSplineObject(position, atomData, valence) {
    const material = new THREE.MeshLambertMaterial({
        color: atomData.color
    });
    const object = new MoleculeAtom(new THREE.SphereGeometry(atomData.radius, 48, 48), material);
    object.atom = atomData;
    object.valence = valence;
    if (position) {
        object.position.copy(position);
    } else {
        object.position.x = 200;
        object.position.y = 200;
        object.position.z = 0;
    }

    object.castShadow = true;
    object.receiveShadow = true;
    scene.add(object);
    splineHelperObjects.value.push(object);
    return object;
}



function removePoint() {

    if (!nowSelectObj.value) {
        return;
    }
    let deleteNum = -1
    console.log(splineHelperObjects.value, nowSelectObj.value);
    for (let i = 0; i < splinePointsLength; i++) {
        if (nowSelectObj.value.uuid == splineHelperObjects.value[i].uuid) {
            deleteNum = i;
            scene.remove(splineHelperObjects.value[i]);
            break;
        }
    }
    splineHelperObjects.value.splice(deleteNum, 1);
    splinePointsLength--;
    positions.splice(deleteNum, 1);
    transformControl.detach()
        // scene.remove(nowSelectObj.value);
    nowSelectObj.value = undefined;
}

function changeAtomName() {
    if (nowSelectObj.value) {
        openAtomChangeName();
    }
}

// function exportSpline() {
//     const strplace = [];

//     for (let i = 0; i < splinePointsLength; i++) {
//         const p = splineHelperObjects[i].position;
//         strplace.push(`new THREE.Vector3(${p.x}, ${p.y}, ${p.z})`);
//     }

//     console.log(strplace.join(",\n"));
//     const code = "[" + strplace.join(",\n\t") + "]";
//     prompt("copy and paste code", code);
// }

// function load(new_positions) {
//     while (new_positions.length > positions.length) {
//         addPoint();
//     }


//     while (new_positions.length < positions.length) {
//         removePoint();
//     }

//     for (let i = 0; i < positions.length; i++) {
//         positions[i].copy(new_positions[i]);
//     }
// }

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
    if (!atomPositionWindow.value && nowSelectObj.value && nowSelectObj.value.position) {
        selectAtomPosition.value.x = nowSelectObj.value.position.x;
        selectAtomPosition.value.y = nowSelectObj.value.position.y
        selectAtomPosition.value.z = nowSelectObj.value.position.z
    }
}

function onPointerDown(event) {
    onDownPosition.x = event.clientX;
    onDownPosition.y = event.clientY;
}

function onPointerUp() {
    onUpPosition.x = event.clientX;
    onUpPosition.y = event.clientY;

    if (onDownPosition.distanceTo(onUpPosition) === 0) {
        nowSelectObj.value = undefined;
        transformControl.detach();
    }
}

function onPointerMove(event) {
    pointer.x = event.clientX / window.innerWidth * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(splineHelperObjects.value);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        // console.log(transformControl.object)
        if (object !== transformControl.object) {
            nowSelectObj.value = object
            transformControl.attach(object);
        }
    }
}
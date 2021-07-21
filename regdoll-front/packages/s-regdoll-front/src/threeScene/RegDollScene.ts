
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:10
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 07:53:49
 */
import * as THREE from "three";
import SceneConfig from "../config/SceneConfig";

import { nextTick, ref, Ref } from "vue";
import { getDefaultAmbientLight, getDefaultSpotLight, getGridHelper } from "./RegDollHelper";
import { RegDollSceneObject3D } from "./RegDollSceneObject3D";
import store, { SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
// @ts-ignore
import { TransformControls } from "/@/assets/js/TransformControls.js";
// @ts-ignore
import { OrbitControls } from "/@/assets/js/OrbitControls.js";
import { GridHelper, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
// @ts-ignore
import { EffectComposer } from '/@/assets/js/EffectComposer.js'
// @ts-ignore
import { RenderPass } from '/@/assets/js/RenderPass.js'
// @ts-ignore
import { ShaderPass } from '/@/assets/js/ShaderPass'
import { AdditiveBlendShader } from '/@/assets/js/AdditiveBlendShader'
import { SET_NOW_SELECT_OBJ } from '../store/Scene/mutation-types';
export class regDollScene {
  scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public objectArr: Array<RegDollSceneObject3D>;
  axesHelper!: THREE.AxesHelper;
  renderer!: THREE.WebGLRenderer;
  renderWidth!: number;
  renderHeight!: number;
  gridHelp!: GridHelper
  public orbitControls!: OrbitControls;
  transformControl!: TransformControls;
  defaultSpotLight!: THREE.SpotLight;
  defaultAmbientLight!: THREE.Light;
  mouserVector2: THREE.Vector2
  // onDownPosition = new THREE.Vector2();
  // onUpPosition = new THREE.Vector2();
  lockScene: Boolean = false;
  raycaster = new THREE.Raycaster();
  renderScene: Boolean = false;
  selectObj: RegDollSceneObject3D | undefined;
  lockChoice: Boolean = false;//锁定选择对象
  // finalComposer: any;
  // composer2: any;
  public nowSelectObj: RegDollSceneObject3D | undefined;
  /**
   *Creates an instance of Scene.
   * @param {Boolean} showAxes//是否展示坐标轴
   * @param {Boolean} refreshSelf //是否更新完再更新
   * @param {Boolean} showGirdHelper//是否显示帮助网格
   * @param {THREE.Color} backgroundColor//背景颜色
   * @param {Array<THREE.Light>} lights//灯光
   * @param {THREE.EventDispatcher} controls//控制器
   * @memberof Scene
   */
  constructor(
    public renderDom: HTMLElement,
    private showAxes: Boolean,
    private showGirdHelper: Boolean,
    public backgroundColor: THREE.Color = new THREE.Color(0xffffff),
    public gridColor: THREE.Color = new THREE.Color(0xffffff),
    public userSelect: Boolean = true
  ) {
    this.objectArr = [];
    this.mouserVector2 = new THREE.Vector2()
    {
      this.renderWidth = this.renderDom.clientWidth;
      this.renderHeight = this.renderDom.clientHeight;
    }
    this.initScene(backgroundColor);
    this.initCamera();
    this.initLights();
    this.initRenderer();
    {
      this.initOrbitControls();
      this.userSelect && this.initTransformControls();
    }
    {
      this.showGirdHelper && this.initGridHelper();
      this.showAxes && this.initAxesHelper(null);
    }
    this.addListener();
    requestAnimationFrame(this.render);
  }

  initGridHelper() {
    this.gridHelp = getGridHelper(SceneConfig.sceneLen * 2, SceneConfig.sceneLen * 2, this.gridColor);

    this.scene.add(this.gridHelp)
  }
  initOrbitControls() {
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.addEventListener("change", this.orbitControlsChangeFunc);
  }
  orbitControlsChangeFunc = () => {
    if (!this.lockScene) {
      this.userSelect && this.transformControlDetach();
      this.render()
    }
  }
  setLockChoice(payload: Boolean) {
    this.lockChoice = payload;
  }
  setLockScene(payload: Boolean) {

    if (this.lockScene == false && payload == true) {
      let tmpMask = document.createElement("div");
      tmpMask.className = "canvas_mask"
      this.renderDom.appendChild(tmpMask)
    } else if (this.lockScene == true && payload == false) {
      this.renderDom.removeChild(this.renderDom.children[1])
    }
    this.lockScene = payload;
    this.render(1)
  }
  initTransformControls() {
    this.transformControl = new TransformControls(this.camera, this.renderer.domElement);
    this.transformControl.addEventListener("dragging-changed", (event: any) => {
      this.orbitControls.enabled = !event.value;
    });
    this.transformControl.addEventListener("change", this.render);
    this.scene.add(this.transformControl);
    // this.renderDom.addEventListener("pointerdown", this.onPointerDown);
    // this.renderDom.addEventListener("pointerup", this.onPointerUp);
    this.renderDom.addEventListener("pointermove", this.onPointerMove);
    this.renderDom.addEventListener("mouseleave", () => {
      this.axesHelper && this.axesHelper.visible == false && this.setAxesHelperVisible(true);
    });
  }
  getRendererDomElement() {
    return this.renderer.domElement;
  }
  // onPointerDown = (event: { offsetX: number; offsetY: number }) => {
  //   this.onDownPosition.x = event.offsetX;
  //   this.onDownPosition.y = event.offsetY;
  // };
  // onPointerUp = (event: { offsetX: number; offsetY: number }) => {
  //   this.onUpPosition.x = event.offsetX;
  //   this.onUpPosition.y = event.offsetY;
  //   this.axesHelper.visible == false && this.setAxesHelperVisible(true);

  // };
  onPointerMove = (event: { offsetX: number; offsetY: number, clientX: number, clientY: number }) => {
    if (this.lockScene) {
      return;
    }
    this.mouserVector2.set((event.offsetX / this.renderWidth) * 2 - 1, - (event.offsetY / this.renderHeight) * 2 + 1);

    this.raycaster.setFromCamera(this.mouserVector2, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objectArr, true);
    if (intersects.length > 0) {
      this.setAxesHelperVisible(!this.transformControl.dragging);

      this.selectObj = this.getMouseSelectObj(intersects[0].object);

      if (this.selectObj !== this.transformControl.object) {

        this.transformControlAttach(this.selectObj);
      }
    }
  };
  transformControlDetach = () => {
    if (!this.lockChoice) {
      if (this.nowSelectObj) {
        store.commit(SCENE_MODULE_COMMIT_PREFIX + SET_NOW_SELECT_OBJ, undefined)
        this.nowSelectObj = undefined
      }
      this.transformControl.detach && this.transformControl.detach()
    }
  }
  transformControlAttach(attachObj: RegDollSceneObject3D | undefined) {
    if (!this.lockChoice && attachObj != undefined && attachObj.uuid != this.nowSelectObj?.uuid) {

      store.commit(SCENE_MODULE_COMMIT_PREFIX + SET_NOW_SELECT_OBJ, attachObj)
      this.nowSelectObj = this.selectObj
    }
    if (!this.lockChoice) {
      this.transformControl.attach(attachObj);
    } else {
      this.transformControl.attach(this.nowSelectObj);
    }
  }
  getMouseSelectObj(object: THREE.Object3D) {
    for (let tmpObj of this.objectArr) {
      if (object === tmpObj) {
        return tmpObj;
      }
      if (tmpObj.children.indexOf(object) != -1) {
        return tmpObj;
      }
    }
    return;
  }
  setRenderScene(renderScene: Boolean) {
    this.renderScene = renderScene;
  }
  initLights() {
    this.defaultSpotLight = getDefaultSpotLight(SceneConfig.sceneLen);
    this.scene.add(this.defaultSpotLight);
    this.defaultAmbientLight = getDefaultAmbientLight();
    this.scene.add(this.defaultAmbientLight);
    // var light = new THREE.PointLight(0xffffff);
    // light.position.set(0, 250, 0);
    // this.scene.add(light);
  }
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      SceneConfig.perspectiveCameraFov,
      this.renderWidth / this.renderHeight,
      1,
      10000,
    );
    this.camera.position.set(30, 30, 0);
    this.scene.add(this.camera);
  }
  setAxesHelperVisible(visible: boolean) {
    this.axesHelper && (this.axesHelper.visible = visible);
  }
  addListener() {
    window.addEventListener("resize", this.resizeRender);
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.renderWidth, this.renderHeight);
    this.renderDom.appendChild(this.renderer.domElement);

  }
  setBackgroundTextUreCube(textureCube: THREE.Texture) {
    this.scene.background = textureCube;
    this.render();
  }
  initScene(bgColor: THREE.Color) {
    this.scene = new THREE.Scene();
    this.scene.background = bgColor;

  }
  changeBackground(newBgColor: THREE.Color) {
    this.scene.background = newBgColor;
    this.render()
  }
  initAxesHelper(sceneLen: number | null) {
    this.axesHelper = new THREE.AxesHelper(sceneLen || SceneConfig.sceneLen);
    this.scene.add(this.axesHelper);
  }
  changeSceneLen(len: number) {
    if (this.showAxes) {
      this.scene.remove(this.axesHelper);
      this.axesHelper = new THREE.AxesHelper(len);
      this.scene.add(this.axesHelper);
    }
    {
      this.camera.far = len * 3;
      this.camera.updateProjectionMatrix();
    }
    {
      this.scene.remove(this.defaultSpotLight);
      this.scene.add(this.defaultSpotLight);
    }
  }
  render = (renderTime: number = 0) => {
    if (!this.lockScene && this.renderScene && renderTime > 0) {
      this.renderScene && requestAnimationFrame(this.render);
      this.objectArr.forEach((item) => {
        if (item.renderEvent) {
          item.renderEvent(renderTime * SceneConfig.timeBase);
        }
      });
    }
    this.renderer.render(this.scene, this.camera);
    // this.orbitControls.update()
    // this.finalComposer.render();
    // this.composer2.render();
    // this.transformControl.update();
  };
  /**
   * 调整绘制的dom大小
   */
  resizeRender = () => {
    nextTick(() => {
      this.renderWidth = this.renderDom.clientWidth;
      this.renderHeight = this.renderDom.clientHeight;
      this.camera.aspect = this.renderWidth / this.renderHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.renderWidth, this.renderHeight);
      requestAnimationFrame(this.render);
    });
  };
  /**
   * 场景添加物体
   * @param obj  要添加的物体
   */
  addObject(obj: RegDollSceneObject3D, event: { offsetX: number; offsetY: number, clientX: number, clientY: number } | null = null) {
    if (event) {
      this.mouserVector2.set((event.offsetX / this.renderWidth) * 2 - 1, - (event.offsetY / this.renderHeight) * 2 + 1);
      this.raycaster.setFromCamera(this.mouserVector2, this.camera);
      const intersect = this.raycaster.intersectObject(this.gridHelp);
      intersect.length > 0 && obj.position.copy(intersect[0]?.point).add(intersect[0]?.face?.normal || new THREE.Vector3())
    }
    this.objectArr.push(obj);
    this.scene.add(obj);
    if (!this.lockChoice && this.userSelect) {
      this.transformControlAttach(obj)
    }
    if (!this.userSelect) {
      store.commit(SCENE_MODULE_COMMIT_PREFIX + SET_NOW_SELECT_OBJ, obj)
    }
    this.render()
  }

  removeObject(obj: RegDollSceneObject3D) {
    this.userSelect && this.transformControlDetach();
    this.objectArr = this.objectArr.filter((item) => item != obj);
    this.scene.remove(obj);
    this.render()
  }
}

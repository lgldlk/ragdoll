/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:10
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-08 07:43:59
 */
import * as THREE from "three";
import SceneConfig from "../config/SceneConfig";

import { nextTick } from "vue";
import { getDefaultAmbientLight, getDefaultSpotLight, getGridHelper } from "./RegDollHelper";
import { RegDollSceneObject3D } from "./RegDollSceneObject3D";

import { TransformControls } from "/@/assets/js/TransformControls.js";
import { OrbitControls } from "/@/assets/js/OrbitControls.js";

export class regDollScene {
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  objectArr: Array<RegDollSceneObject3D>;
  axesHelper!: THREE.AxesHelper;
  renderer!: THREE.WebGLRenderer;
  renderWidth!: number;
  renderHeight!: number;
  gridHelp!: THREE.GridHelper;
  orbitControls!: OrbitControls;
  transformControl!: TransformControls;
  defaultSpotLight!: THREE.SpotLight;
  defaultAmbientLight!: THREE.AmbientLight;
  // onDownPosition = new THREE.Vector2();
  // onUpPosition = new THREE.Vector2();
  pointer = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  renderScene: Boolean = false;
  selectObj: RegDollSceneObject3D | undefined;
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
    private renderDom: HTMLElement,
    private showAxes: Boolean,
    private showGirdHelper: Boolean,
    public backgroundColor: THREE.Color = new THREE.Color(0xffffff),
  ) {
    this.objectArr = [];

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
      this.initTransformControls();
    }
    {
      this.showGirdHelper && this.initGridHelper();
      this.showAxes && this.initAxesHelper(null);
    }
    this.addListener();
    requestAnimationFrame(this.render);
  }

  initGridHelper() {
    this.gridHelp = getGridHelper(SceneConfig.sceneLen * 2, SceneConfig.sceneLen * 2);
    this.scene.add(this.gridHelp);
  }
  initOrbitControls() {
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.addEventListener("change",
      () => {
          this.transformControl.detach ()
        this.render(0)
      });
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
      this.axesHelper.visible == false && this.setAxesHelperVisible(true);
    });
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
  onPointerMove = (event: { offsetX: number; offsetY: number }) => {
    this.pointer.x = (event.offsetX / this.renderWidth) * 2 - 1;
    this.pointer.y = -(event.offsetY / this.renderHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objectArr, true);
    if (intersects.length > 0) {
      this.setAxesHelperVisible(!this.transformControl.dragging);
      this. selectObj = this.getSelectObj(intersects[0].object);
      if (this.selectObj !== this.transformControl.object) {
        this.transformControl.attach(this.selectObj);
 
      }
    }
  };
  getSelectObj(object: THREE.Object3D) {
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
    this.axesHelper.visible = visible;
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
  initScene(bgColor: THREE.Color) {
    this.scene = new THREE.Scene();
    this.scene.background = bgColor;
  }
  changeBackground(newBgColor: THREE.Color) {
    this.scene.background = newBgColor;
  }
  initAxesHelper(sceneLen:number|null) {
    this.axesHelper = new THREE.AxesHelper(sceneLen||SceneConfig.sceneLen);
    this.scene.add(this.axesHelper);
  }
  changeSceneLen(len: number) {
    {
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
  render = (renderTime: number) => {
    if (this.renderScene&&renderTime>0) {
      this.renderScene && requestAnimationFrame(this.render);
      this.objectArr.forEach((item) => {
        if (item.renderEvent) {
          item.renderEvent(renderTime * SceneConfig.timeBase);
        }
      });
    }
    this.renderer.render(this.scene, this.camera);
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
  addObject(obj: RegDollSceneObject3D) {
    this.objectArr.push(obj);
    this.scene.add(obj);
  }

  removeObject(obj: RegDollSceneObject3D) {
    this.objectArr = this.objectArr.filter((item) => item != obj);
    this.scene.remove(obj);
  }
}

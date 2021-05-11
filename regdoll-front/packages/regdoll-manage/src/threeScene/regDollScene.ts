/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:10
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-11 21:43:35
 */
import * as THREE from 'three';
import SceneConfig from '../config/SceneConfig';
import { OrbitControls } from '/@/assets/js/OrbitControls.js';
import { nextTick } from 'vue';
import { getDefaultAmbientLight, getDefaultSpotLight, getGridHelper } from './regDollHelper';
import { RegDollSceneObject3D } from './RegDollSceneObject3D';

export class regDollScene {
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  objectArr: Array<RegDollSceneObject3D>;
  axesHelper!: THREE.AxesHelper;
  renderer!: THREE.WebGLRenderer;
  renderWidth!: number;
  renderHeight!: number;
  gridHelp!: THREE.GridHelper;
  controls!: OrbitControls;
  defaultSpotLight!: THREE.SpotLight;
  defaultAmbientLight!: THREE.AmbientLight;
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
    private refreshSelf: Boolean,
    private showGirdHelper: Boolean,
    private backgroundColor?: THREE.Color,
  ) {
    this.objectArr = [];

    {
      this.renderWidth = this.renderDom.clientWidth;
      this.renderHeight = this.renderDom.clientHeight;
    }
    this.initScene();
    this.initCamera();
    this.initLights();
    this.initRenderer();
    this.initControls();
    {
      this.showGirdHelper && this.initGridHelper();
      this.showAxes && this.initAxesHelper();
    }
    this.addListener();
    requestAnimationFrame(this.render);
  }

  initGridHelper() {
    this.gridHelp = getGridHelper(SceneConfig.sceneLen * 2, SceneConfig.sceneLen * 2);
    this.scene.add(this.gridHelp);
  }
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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
    this.camera.position.set(10, 10, 10);
    this.scene.add(this.camera);
  }
  addListener() {
    window.addEventListener('resize', this.resizeRender);
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.renderWidth, this.renderHeight);
    this.renderDom.appendChild(this.renderer.domElement);
  }
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('rgb(255, 255, 255)');
  }
  initAxesHelper() {
    this.axesHelper = new THREE.AxesHelper(SceneConfig.sceneLen);
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
    this.objectArr.forEach((item) => {
      if (item.renderEvent) {
        item.renderEvent(renderTime * SceneConfig.timeBase);
      }
    });
    this.renderer.render(this.scene, this.camera);
    this.refreshSelf && requestAnimationFrame(this.render);
    this.controls.update();
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

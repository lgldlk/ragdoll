import * as THREE from 'three';
import SceneConfig from '../config/SceneConfig';
export interface SceneObject3D extends THREE.Object3D {
  renderEvent: Function; //每次场景调用的函数
}

export default class Scene {
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  objects: Array<SceneObject3D>;
  axesHelper!: THREE.AxesHelper;
  renderer!: THREE.WebGLRenderer;
  renderWidth!: number;
  renderHeight!: number;
  /**
   *Creates an instance of Scene.
   * @param {Boolean} showAxes//是否展示坐标轴
   * @param {Boolean} refreshSelf //是否更新完再更新
   * @param {THREE.Color} backgroundColor//背景颜色
   * @param {Array<THREE.Light>} lights//灯光
   * @param {THREE.EventDispatcher} controls//控制器
   * @memberof Scene
   */
  constructor(
    private renderDom: HTMLElement,
    private showAxes: Boolean,
    private refreshSelf: Boolean,
    private lights?: Array<THREE.Light>,
    private controls?: THREE.EventDispatcher,
    private backgroundColor?: THREE.Color,
  ) {
    this.objects = [];
    {
      this.renderWidth = this.renderDom.clientWidth;
      this.renderHeight = this.renderDom.clientWidth;
    }
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.addListener();
    if (showAxes) {
      this.initAxesHelper();
    }
  }
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      SceneConfig.perspectiveCameraFov,
      this.renderWidth / this.renderHeight,
      1,
      SceneConfig.sceneLen * 3,
    );
    this.scene.add(this.camera);
  }
  addListener() {
    window.addEventListener('resize', this.onWindowResize);
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.renderWidth, this.renderHeight);
    this.renderDom.appendChild(this.renderer.domElement);
  }
  initScene() {
    this.scene = new THREE.Scene();
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
  }
  render(renderTime: number) {
    this.objects.forEach((item) => {
      if (item.renderEvent) {
        item.renderEvent(renderTime * SceneConfig.timeBase);
      }
    });
    this.refreshSelf && requestAnimationFrame(this.render);
  }
  onWindowResize() {
    this.camera.aspect = this.renderWidth / this.renderHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.renderWidth, this.renderHeight);
    requestAnimationFrame(this.render);
  }
}

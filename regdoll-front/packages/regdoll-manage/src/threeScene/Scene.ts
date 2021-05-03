import * as THREE from 'three';
import SceneConfig from '../config/SceneConfig';
export interface SceneObject3D extends THREE.Object3D {
  renderEvent: Function; //每次场景调用的函数
}

export default class Scene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  objects: Array<SceneObject3D>;
  renderer!: THREE.WebGLRenderer;
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
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera();
    this.objects = [];
    window.addEventListener('resize', this.onWindowResize);
    this.initRenderer();
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
  initScene() {
    this.scene = new THREE.Scene();
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
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    requestAnimationFrame(this.render);
  }
}

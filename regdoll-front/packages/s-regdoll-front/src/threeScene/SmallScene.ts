/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-19 20:59:13
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 13:54:02
 */
// @ts-ignore
import { OrbitControls } from "/@/assets/js/OrbitControls.js";
import * as THREE from "three";
import SceneConfig from "../config/SceneConfig";
import { getDefaultAmbientLight, getDefaultSpotLight } from './RegDollHelper';
export class SmallScene {
  public scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderWidth: number;
  renderHeight: number;
  defaultSpotLight!: THREE.SpotLight;
  defaultAmbientLight!: THREE.AmbientLight;
  renderer!: THREE.WebGLRenderer;
  orbitControls: any;
  renderFun: Function[] = []
  constructor(
    public renderDom: HTMLElement,
    backgroundColor: THREE.Color = new THREE.Color(0xffffff)
  ) {

    this.renderWidth = this.renderDom.clientWidth;
    this.renderHeight = this.renderDom.clientHeight;
    this.initScene(backgroundColor);
    this.initCamera();
    this.initLights();
    this.initRenderer();
    this.initOrbitControls();
    requestAnimationFrame(this.render);
  }
  render = () => {
    this.renderFun.map((item: Function) => {
      item && item();
    })
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render)
  }
  initScene(bgColor: THREE.Color) {
    this.scene = new THREE.Scene();
    this.scene.background = bgColor;

  }
  initOrbitControls() {
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.addEventListener("change", this.orbitControlsChangeFunc);
  }
  orbitControlsChangeFunc = () => {
    this.render()
  }
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      SceneConfig.perspectiveCameraFov,
      this.renderWidth / this.renderHeight,
      1,
      10000,
    );
    this.camera.position.set(1500, 1500, 0);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);
  }

  initLights() {
    this.scene.add(new THREE.AmbientLight(0xf0f0f0));
    const light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 1500, 200);
    light.angle = Math.PI * 0.2;
    light.castShadow = true;
    light.shadow.camera.near = 200;
    light.shadow.camera.far = 2000;
    light.shadow.bias = - 0.000222;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this.scene.add(light);

    const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    planeGeometry.rotateX(- Math.PI / 2);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = - 200;
    plane.receiveShadow = true;
    this.scene.add(plane);

    const helper: any = new THREE.GridHelper(2000, 100);
    helper.position.y = - 199;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    this.scene.add(helper);
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.renderWidth, this.renderHeight);
    this.renderDom.appendChild(this.renderer.domElement);
  }
  addObject(obj: THREE.Object3D) {
    this.scene.add(obj)

  }
  removeObject(obj: THREE.Object3D) {
    this.scene.remove(obj)
  }
  addRenderFun(fun: Function) {
    this.renderFun.push(fun)
  }
  removerRenderFunc(fun: Function) {
    this.renderFun = this.renderFun.filter(item => item != fun);
  }
}
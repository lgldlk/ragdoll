import { RegDollSceneObject3D } from './RegDollSceneObject3D';
/*
 * @Editors: lgldlk
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:10
 * @LastEditTime: 2021-05-13 21:36:56
 */
import * as THREE from 'three';
import { Object3D } from 'three';
import AtomModelConfig from '../config/AtomModelConfig';
import { getTrackArr } from './RegDollHelper';
export default class Atom extends RegDollSceneObject3D {
  nucleus!: THREE.Mesh; //原子核
  electronics: Array<THREE.Object3D>;
  drawingCanvas!: HTMLCanvasElement;
  drawingContext!: CanvasRenderingContext2D;
  nucleusWidth!: number;
  constructor(
    public quality: number = 0,
    public ele_number: number = 0,
    public en_name: string,
    public ch_name: string,
  ) {
    super();
    this.electronics = [];
    this.nucleusWidth =
      AtomModelConfig.defaultNucleusConfig.baseAtomRadius +
      AtomModelConfig.defaultNucleusConfig.baseRadius * this.quality;
    this.add(this.initNucleus());
    this.initEleOrbit();
  }

  initNucleus(): THREE.Object3D {
    const geometry = new THREE.SphereGeometry(
      this.nucleusWidth,
      AtomModelConfig.defaultSphere.widthSegments,
      AtomModelConfig.defaultSphere.heightSegments,
    );
    const material = new THREE.MeshPhongMaterial({
      color: AtomModelConfig.defaultNucleusConfig.color,
      shininess: AtomModelConfig.defaultNucleusConfig.shininess,
    });
    material.map = this.getTextCanvas(
      this.en_name,
      AtomModelConfig.defaultNucleusConfig.color,
      this.nucleusWidth * 480,
    );
    const nucleus = new THREE.Mesh(geometry, material);
    nucleus.rotateZ(Math.PI / 2);
    return nucleus;
  }
  initEleOrbit() {
    let eleArr = getTrackArr(this.ele_number);
    eleArr.map((item, index) => {
      let tmpEleOrbit = this.getEleOrbit(
        this.nucleusWidth + (1 + index) * AtomModelConfig.defaultEleOrbit,
        item,
      );
      this.electronics.push(tmpEleOrbit);
    });
    this.add(...this.electronics);
  }
  getEleOrbit(radius: number, eleNumber: number): THREE.Object3D {
    const geoGeometry = new THREE.TorusGeometry(
      radius,
      AtomModelConfig.defaultTorus.tube,
      AtomModelConfig.defaultTorus.radialSegments,
      AtomModelConfig.defaultTorus.tubularSegments,
    );
    const geoMaterial = new THREE.MeshPhongMaterial({
      color: AtomModelConfig.defaultTorus.color,
      shininess: AtomModelConfig.defaultSphere.shininess,
      side: THREE.DoubleSide,
    });
    const geoMesh = new THREE.Mesh(geoGeometry, geoMaterial);
    geoMesh.rotateX(Math.PI / 2);
    const eleGeometry = new THREE.SphereGeometry(
      AtomModelConfig.defaultEleConfig.radius,
      AtomModelConfig.defaultEleConfig.widthSegments,
      AtomModelConfig.defaultEleConfig.heightSegments,
    );
    const eleMaterial = new THREE.MeshPhongMaterial({
      color: AtomModelConfig.defaultEleConfig.color,
      shininess: AtomModelConfig.defaultEleConfig.shininess,
    });
    eleMaterial.map = this.getTextCanvas(
      eleNumber.toString(),
      AtomModelConfig.defaultEleConfig.color,
      AtomModelConfig.defaultEleConfig.radius * 1000,
    );
    const eleMesh = new THREE.Mesh(eleGeometry, eleMaterial);
    eleMesh.rotateZ(Math.PI / 2);
    eleMesh.position.set(radius, 0, 0);
    const eleOrbit = new THREE.Object3D();
    eleOrbit.add(geoMesh, eleMesh);
    eleOrbit.rotateY(Math.PI / 6);
    return eleOrbit;
  }

  getTextCanvas(str: string, color: THREE.Color, darwWH: number): THREE.Texture {
    this.drawingCanvas = document.createElement('canvas');
    this.drawingCanvas.width = this.drawingCanvas.height = darwWH;
    const cont2d = this.drawingCanvas.getContext('2d');
    if (!(cont2d instanceof CanvasRenderingContext2D)) {
      throw new Error('Failed to get 2D context');
    }
    this.drawingContext = cont2d;
    this.drawingContext.fillStyle = '#' + color.getHexString();
    this.drawingContext.fillRect(0, 0, darwWH, darwWH);
    this.drawingContext.fillStyle = '#000';
    this.drawingContext.textAlign = 'center';
    this.drawingContext.textBaseline = 'middle';
    this.drawingContext.font = darwWH / 3 + 'px serif';
    this.drawingContext.fillText(str, darwWH / 2, darwWH / 2);
    return new THREE.CanvasTexture(this.drawingCanvas);
  }
  renderEvent = () => {
    this.electronics.map((item) => {
      item.rotateY(Math.PI * 0.002);
    });
  };
}

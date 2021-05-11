import { RegDollSceneObject3D } from './RegDollSceneObject3D';
/*
 * @Editors: lgldlk
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:10
 * @LastEditTime: 2021-05-12 07:38:44
 */
import * as THREE from 'three';
import { Object3D } from 'three';
import AtomModelConfig from '../config/AtomModelConfig';

export default class Atom extends RegDollSceneObject3D {
  nucleus!: THREE.Mesh; //原子核
  drawingCanvas!: HTMLCanvasElement;
  drawingContext!: CanvasRenderingContext2D;
  constructor(
    public quality: number = 0,
    public ele_number: number = 0,
    public en_name: string,
    public ch_name: string,
  ) {
    super();
    this.add(this.initNucleus());
  }
  initNucleus(): THREE.Object3D {
    const geometry = new THREE.SphereGeometry(
      AtomModelConfig.defaultNucleusConfig.baseRadius * this.quality,
      AtomModelConfig.defaultSphere.widthSegments,
      AtomModelConfig.defaultSphere.heightSegments,
    );
    const material = new THREE.MeshPhongMaterial({
      color: AtomModelConfig.defaultNucleusConfig.color,
      shininess: AtomModelConfig.defaultNucleusConfig.shininess,
    });
    material.map = this.getEnNameCanvas(
      this.en_name,
      AtomModelConfig.defaultNucleusConfig.color,
      AtomModelConfig.defaultNucleusConfig.baseRadius * this.quality * 480,
    );

    return new THREE.Mesh(geometry, material);
  }
  getEnNameCanvas(en_name: string, color: THREE.Color, darwWH: number): THREE.Texture {
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
    this.drawingContext.fillText(en_name, darwWH / 2, darwWH / 2);

    return new THREE.CanvasTexture(this.drawingCanvas);
  }
  renderEvent = () => {};
}

import { RegDollSceneObject3D } from './RegDollSceneObject3D';
/*
 * @Editors: lgldlk
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:10
 * @LastEditTime: 2021-05-11 22:23:57
 */
import * as THREE from 'three';
import { Object3D } from 'three';
import AtomModelConfig from '../config/AtomModelConfig';

export default class Atom extends RegDollSceneObject3D {
  nucleus!: THREE.Mesh; //原子核

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
    const drawingCanvas = document.createElement('canvas');
    drawingCanvas.width = drawingCanvas.height = darwWH;
    const drawingContext = drawingCanvas.getContext('2d');

    if (drawingContext) {
      drawingContext.fillStyle = '#' + color.getHexString();
      drawingContext.fillRect(0, 0, darwWH, darwWH);
      drawingContext.fillStyle = '#000';
      drawingContext.textAlign = 'center';
      drawingContext.textBaseline = 'middle';
      drawingContext.font = darwWH / 2 + 'px serif';
      drawingContext.fillText(en_name, darwWH / 2, darwWH / 2);
    }
    return new THREE.CanvasTexture(drawingCanvas);
  }
  renderEvent = () => {};
}

/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-02 22:27:16
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-02 22:33:20
 */
import * as THREE from "three";
import { Object3D } from "three";
import { RegDollSceneObject3D } from '../RegDollSceneObject3D';
import BaseModelConfig from '/@/config/BaseModelConfig';

export default class CircleModel extends RegDollSceneObject3D {
  boxMesh: THREE.Mesh
  constructor(private radius: number = 2, private segments: number = 32,
    private color = BaseModelConfig.baseColor, private shininess = BaseModelConfig.BaseShininess) {
    super();
    this.add(this.boxMesh = this.getBox())
  }
  getBox(): THREE.Mesh {
    const geometry = new THREE.CircleGeometry(this.radius, this.segments),
      material = new BaseModelConfig.baseMateria({
        color: this.color,
        shininess: this.shininess,
        side: THREE.DoubleSide
      }),
      tmpCircle = new THREE.Mesh(geometry, material);
    tmpCircle.rotateY(Math.PI / 2);
    return new THREE.Mesh(geometry, material)
  }

  renderEvent = null;
}
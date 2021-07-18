import { provide } from 'vue';
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-06-10 20:08:41
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-02 22:27:24
 */
import * as THREE from "three";
import { Object3D } from "three";
import { RegDollSceneObject3D } from '../RegDollSceneObject3D';
import BaseModelConfig from '/@/config/BaseModelConfig';

export default class BoxModel extends RegDollSceneObject3D {
  boxMesh: THREE.Mesh
  constructor(private width: number = 2, private height: number = 2,
    private depth: number = 2, private color = BaseModelConfig.baseColor, private shininess = BaseModelConfig.BaseShininess) {
    super();
    this.add(this.boxMesh = this.getBox())
  }
  getBox(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth),
      material = new BaseModelConfig.baseMateria({
        color: this.color,
        shininess: this.shininess
      })
    return new THREE.Mesh(geometry, material)
  }

  renderEvent = null;
}
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-19 14:40:46
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 10:57:59
 */

import * as THREE from 'three';
import { AtomModelConfig } from '/@/config/AtomModelConfig';
import { RegDollSceneObject3D } from '/@/threeScene/RegDollSceneObject3D';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-11 20:01:57
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-12 08:26:32
 */


//@ts-ignore
import SpriteText from '/@/assets/js/SpriteText.js'
//@ts-ignore
import SpriteText from '/@/assets/js/SpriteText.js'
export default class MoleculeModule extends RegDollSceneObject3D {
  renderEvent!: Function | null;
  maxYPosition = 0
  constructor(public moleculeModuleData: any, private showText: boolean = false) {
    super()
    this.initModule();
    showText && this.showMoleNameText()
  }
  showMoleNameText() {
    const spriteTextStyle = {
      bold: true, center: true, fontColor: "rgb(0,0,0)", fontSize: 160,
    },
      protonSpriteText = new SpriteText(this.moleculeModuleData.expression,
        new THREE.Vector3(0, this.maxYPosition + 50, 0),
        spriteTextStyle)
    this.add(protonSpriteText)
  }
  initModule() {
    let maxX = 0, maxY = 0, maxZ = 0;
    console.log(this.moleculeModuleData);

    for (let atomData of this.moleculeModuleData.atomDatas) {
      if (Math.abs(atomData.x) > Math.abs(maxX)) {
        maxX = atomData.x
      }
      if (Math.abs(atomData.y) > Math.abs(maxY)) {
        maxY = atomData.y
        this.maxYPosition = atomData.y
      }
      if (Math.abs(atomData.z) > Math.abs(maxZ)) {
        maxZ = atomData.z
      }
    }
    let maxRadius = 0;
    for (let atomData of this.moleculeModuleData.atomDatas) {
      const material = new THREE.MeshLambertMaterial({
        color: atomData.color
      });
      if (maxRadius < atomData.radius) {
        maxRadius = atomData.radius
      }
      const object = new THREE.Mesh(
        new THREE.SphereGeometry(atomData.radius, 48, 48),
        material
      );
      object.position.x = atomData.x - maxX;
      object.position.y = atomData.y - maxY;
      object.position.z = atomData.z - maxZ;
      object.castShadow = true;
      object.receiveShadow = true;
      this.add(object);
    }
  }
  cloneMolecule() {

    return new MoleculeModule(this.moleculeModuleData, this.showText);

  }

}
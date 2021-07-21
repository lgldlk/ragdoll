import * as THREE from 'three';
import { AtomModelConfig } from '/@/config/AtomModelConfig';
import { RegDollSceneObject3D } from '/@/threeScene/RegDollSceneObject3D';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-11 20:01:57
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 10:26:20
 */

//@ts-ignore
import SpriteText from '/@/assets/js/SpriteText.js'
export default class AtomInside extends RegDollSceneObject3D {
  renderEvent: Function | null = null
  neutron_number: number
  constructor(public readonly ele_number: number, public readonly quality: number) {
    super();
    this.neutron_number = Math.floor(quality) - this.ele_number;
    { this.initAtomInside() }
  }
  initAtomInside() {

    const nucleusGeometry = new THREE.SphereGeometry(
      AtomModelConfig.inSideAtomInsideConfig.radius,
      AtomModelConfig.defaultSphere.widthSegments,
      AtomModelConfig.defaultSphere.heightSegments,
      AtomModelConfig.inSideAtomInsideConfig.phiStart,
      AtomModelConfig.inSideAtomInsideConfig.phiLength,
    );
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: AtomModelConfig.inSideAtomInsideConfig.atomExcircleColor,
      shininess: 200,
      side: THREE.DoubleSide,
      wireframeLinewidth: 5

      // dithering: true,
      // specular: 0xffffff,
    });

    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    nucleus.rotateX(Math.PI);


    this.add(nucleus);

    const protonGeometry = new THREE.SphereGeometry(
      AtomModelConfig.inSideAtomInsideConfig.globuleRadius,
      AtomModelConfig.defaultSphere.widthSegments,
      AtomModelConfig.defaultSphere.heightSegments,
    );
    const protonMaterial = new THREE.MeshPhongMaterial({
      color: AtomModelConfig.inSideAtomInsideConfig.atomProtonColor,
      shininess: 200,
      side: THREE.DoubleSide,

      // dithering: true,
      // specular: 0xffffff,
    });
    const proton = new THREE.Mesh(protonGeometry, protonMaterial);
    proton.position.x = AtomModelConfig.inSideAtomInsideConfig.radius / 2;
    proton.position.y = AtomModelConfig.inSideAtomInsideConfig.globuleRadius / 2;
    const neutron = proton.clone()
    neutron.position.x = -AtomModelConfig.inSideAtomInsideConfig.radius / 2;
    neutron.material = protonMaterial.clone()
    neutron.material.color = AtomModelConfig.inSideAtomInsideConfig.neutronColor
    this.add(proton, neutron);
    this.rotateY(Math.PI / 4)
    const spriteTextStyle = { bold: true, center: true, fontColor: "rgb(0,0,0)" }, protonSpriteText = new SpriteText("X " + this.ele_number,
      new THREE.Vector3(AtomModelConfig.inSideAtomInsideConfig.radius / 2, -1.5 * AtomModelConfig.inSideAtomInsideConfig.globuleRadius / 2, 0),
      spriteTextStyle),
      neutronSpriteText = new SpriteText("X " + this.neutron_number,
        new THREE.Vector3(-AtomModelConfig.inSideAtomInsideConfig.radius / 2, -1.5 * AtomModelConfig.inSideAtomInsideConfig.globuleRadius / 2, 0),
        spriteTextStyle);
    this.add(protonSpriteText, neutronSpriteText);

  }

}
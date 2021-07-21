/*
 * @Description:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:09
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 11:00:54
 */

import * as THREE from "three";

interface DefaultSphereConfigType {
  //球类的默认设置

  widthSegments: number; //默认宽段数
  heightSegments: number; //默认高段数
  shininess: number; //默认反光指数
}

interface DefaultTorusConfigType {
  //圆环的默认设置
  tube: number;
  radialSegments: number;
  tubularSegments: number; // 圆环的默认环段数
  color: THREE.Color;
}

interface DefaultEleConfigType extends DefaultSphereConfigType {
  // 默认电子设置
  color: THREE.Color;
  radius: number;
}
interface DefaultNucleusConfig extends DefaultSphereConfigType {
  // 默认原子核设置 
  color: THREE.Color;
  baseAtomRadius: number;
  baseRadius: number; //默认的原子核大小基数
}
export namespace AtomModelConfig {
  export const defaultEleOrbit: number = 3,
    defaultSphere: DefaultSphereConfigType = {
      widthSegments: 58,
      heightSegments: 58,
      shininess: 200,
    },
    defaultTorus: DefaultTorusConfigType = {
      tube: 0.05,
      radialSegments: 18,
      tubularSegments: 134,
      color: new THREE.Color("rgb(255, 235, 235)"),
    },
    defaultEleConfig: DefaultEleConfigType = {
      ...defaultSphere,
      color: new THREE.Color(0xffff00),
      radius: 0.65,
    },
    defaultNucleusConfig: DefaultNucleusConfig = {
      ...defaultSphere,
      color: new THREE.Color("rgb(95, 209, 209)"),
      baseAtomRadius: 1,
      baseRadius: 0.08,
    },
    inSideAtomInsideConfig = {
      ...defaultSphere,
      atomExcircleColor: new THREE.Color("rgb(95, 209, 209)"),
      atomProtonColor: new THREE.Color("rgb(250, 0, 0)"),
      neutronColor: new THREE.Color("rgb(0,0,200)"),
      globuleRadius: 6,
      phiStart: 0,
      phiLength: 3.2,
      radius: 20,

    }
}

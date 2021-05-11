/*
 * @Description:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:09
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-11 21:54:16
 */

import * as THREE from 'three';

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
}

interface DefaultEleConfigType extends DefaultSphereConfigType {
  // 默认电子设置
  color: THREE.Color;
  radius: number;
}
interface DefaultNucleusConfig extends DefaultSphereConfigType {
  // 默认原子核设置
  color: THREE.Color;
  baseRadius: number; //默认的原子核大小基数
}
export default class AtomModelConfig {
  static shininess: number = 100; //反光材质亮度
  static defaultSphere: DefaultSphereConfigType = {
    widthSegments: 32,
    heightSegments: 32,
    shininess: 100,
  };
  static defaultTorus: DefaultTorusConfigType = {
    tube: 0.05,
    radialSegments: 18,
    tubularSegments: 134,
  };
  static defaultEleConfig: DefaultEleConfigType = {
    ...AtomModelConfig.defaultSphere,
    color: new THREE.Color(0xffff00),
    radius: 0.5,
  };
  static defaultNucleusConfig: DefaultNucleusConfig = {
    ...AtomModelConfig.defaultSphere,
    color: new THREE.Color(0xee0000),
    baseRadius: 1,
  };
}

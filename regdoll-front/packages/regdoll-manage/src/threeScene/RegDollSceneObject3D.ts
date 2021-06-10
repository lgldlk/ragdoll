import * as THREE from 'three';

/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-11 20:52:14
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-10 20:09:54
 */
export abstract class RegDollSceneObject3D extends THREE.Object3D {
  abstract renderEvent: Function|null; //每次场景调用的函数
}

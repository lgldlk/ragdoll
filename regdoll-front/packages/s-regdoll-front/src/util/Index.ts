/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:10
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-17 14:55:07
 */

import { CubeTextureLoader } from 'three';
import { SceneBackgroundUrl } from '../config/RequestConfig';
import store, { SCENE_MODULE_COMMIT_PREFIX } from '../store';
import { RENDER_SCENE, SET_BACKGROUND_TEXT_URE_CUBE } from '../store/Scene/mutation-types';

/**
 * 循环调用函数
 * @param functions 要调用的函数
 */
export function callFunctions(functions: Array<Function>, ...args: Array<any>) {
  for (let i = 0; i < functions.length; i++) {
    if (typeof functions == "function") {
      (functions[i] as any)(args[i]);
    }
  }
}

/**
 * 对象键全部转小写
 * @param params
 */
export function toLowerCase(obj: object) {
  if (typeof obj == "undefined") {
    return {};
  }
  let toObj = {};
  for (const key in obj) {
    (<any>toObj)[key.toLowerCase()] = (<any>obj)[key];
  }
  return toObj;
}


export function changeSceneBackground(sceneFileName: string) {
  var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
  var imageSuffix = ".jpg";
  var imageURLs = [];
  for (var i = 0; i < 6; i++)
    imageURLs.push(SceneBackgroundUrl + sceneFileName + "/" + directions[i] + imageSuffix);
  var textureCube = new CubeTextureLoader().load(imageURLs, () => {
    store.commit(SCENE_MODULE_COMMIT_PREFIX + RENDER_SCENE);
  });
  store.commit(SCENE_MODULE_COMMIT_PREFIX + SET_BACKGROUND_TEXT_URE_CUBE, textureCube);
}



/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-04 15:38:48
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-06 09:08:04
 */

import { Store } from 'vuex';
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import { INIT_REGDOLL_SCENE, RENDER_SCENE, SET_BACKGROUND_TEXT_URE_CUBE } from '/@/store/Scene/mutation-types';
import { Color } from "three";
import { CubeTextureLoader } from 'three'
export default function initScene(store: Store<RootState>, renderDom: HTMLElement) {
  store.commit(SCENE_MODULE_COMMIT_PREFIX + INIT_REGDOLL_SCENE, {
    renderDom: renderDom,
    showAxes: true,
    showGirdHelper: false,
    backgroundColor: new Color(0, 0, 0),
    gridColor: new Color("rgb(0,  82,  82)")
  });
  var imagePrefix = "textures/nebula/nebula-";
  var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
  var imageSuffix = ".png";
  var imageURLs = [];
  for (var i = 0; i < 6; i++)
    imageURLs.push(imagePrefix + directions[i] + imageSuffix);
  var textureCube = new CubeTextureLoader().load(imageURLs, () => {
    store.commit(SCENE_MODULE_COMMIT_PREFIX + RENDER_SCENE);
  });
  store.commit(SCENE_MODULE_COMMIT_PREFIX + SET_BACKGROUND_TEXT_URE_CUBE, textureCube);

}
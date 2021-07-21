/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-04 15:38:48
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-06 09:08:04
 */

import { Store } from 'vuex';
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import { INIT_REGDOLL_SCENE, RENDER_SCENE, SET_BACKGROUND_TEXT_URE_CUBE, SET_RENDER_SCENE } from '/@/store/Scene/mutation-types';
import { Color } from "three";
import { CubeTextureLoader } from 'three'
import { changeSceneBackground } from '/@/util';
export default function initScene(store: Store<RootState>, renderDom: HTMLElement) {
  store.commit(SCENE_MODULE_COMMIT_PREFIX + INIT_REGDOLL_SCENE, {
    renderDom: renderDom,
    showAxes: true,
    showGirdHelper: false,
    backgroundColor: new Color(0, 0, 0),
    gridColor: new Color("rgb(0,  82,  82)")
  });
  changeSceneBackground("nebula");
  store.commit(SCENE_MODULE_COMMIT_PREFIX + SET_RENDER_SCENE, true);

}
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-19 14:34:48
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 20:38:38
 */

import { Store } from 'vuex';
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import { INIT_REGDOLL_SCENE, RENDER_SCENE, SET_BACKGROUND_TEXT_URE_CUBE, SET_RENDER_SCENE } from '/@/store/Scene/mutation-types';
import { Vector3, Color } from "three";
import { CubeTextureLoader } from 'three'
import { changeSceneBackground } from '/@/util';


export function initMoleculeScene(store: Store<RootState>, renderDom: HTMLElement) {
  store.commit(SCENE_MODULE_COMMIT_PREFIX + INIT_REGDOLL_SCENE, {
    renderDom: renderDom,
    showAxes: false,
    showGirdHelper: false,
    backgroundColor: new Color(0, 0, 0),
    gridColor: new Color("rgb(0,  82,  82)"),
    userSelect: false
  });
  store.state.scene.mainScene?.camera.position.set(700, 700, 700)
  store.state.scene.mainScene?.camera.lookAt(0, 0, 0)
  changeSceneBackground("nebula");
  store.commit(SCENE_MODULE_COMMIT_PREFIX + SET_RENDER_SCENE, true);
}

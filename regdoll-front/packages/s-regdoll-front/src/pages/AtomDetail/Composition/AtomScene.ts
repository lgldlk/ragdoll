/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-04 15:38:48
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-04 16:46:52
 */

import { Store } from 'vuex';
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import { INIT_REGDOLL_SCENE } from '/@/store/Scene/mutation-types';
import { Color } from "three";

export default function initScene(store: Store<RootState>, renderDom: HTMLElement) {
  store.commit(SCENE_MODULE_COMMIT_PREFIX + INIT_REGDOLL_SCENE, {
    renderDom: renderDom,
    showAxes: true,
    showGirdHelper: true,
    backgroundColor: new Color(0, 0, 0)
  });
}
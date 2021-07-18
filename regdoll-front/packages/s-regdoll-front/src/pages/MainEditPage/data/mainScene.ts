import { ADD_OBJECT, INIT_REGDOLL_SCENE } from "./../../../store/Scene/mutation-types";
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-10 20:58:26
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-04 15:45:37
 */
import { regDollScene } from "../../../threeScene/RegDollScene";

import * as THREE from "three";
import { Store, useStore } from "vuex";
import { SCENE_MODULE_COMMIT_PREFIX } from '/@/store';

export function initScene(store: Store<any>, renderDom: HTMLElement) {
  store.commit(SCENE_MODULE_COMMIT_PREFIX + INIT_REGDOLL_SCENE, {
    renderDom: renderDom,
    showAxes: true,
    showGirdHelper: true,
  });
}

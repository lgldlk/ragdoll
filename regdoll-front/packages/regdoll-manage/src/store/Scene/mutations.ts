/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-06-03 19:43:58
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-03 20:04:52
 */

import { SceneState } from "./state";

import { MutationTree } from "vuex";
import { regDollScene } from "/@/threeScene/RegDollScene";
import { INIT_REGDOLL_SCENE, ADD_OBJECT, REMOVE_OBJECT } from "./mutation-types";
import { RegDollSceneObject3D } from "/@/threeScene/RegDollSceneObject3D";
type initSceneVO = {
  renderDom: HTMLElement;
  showAxes: Boolean;
  showGirdHelper: Boolean;
  backgroundColor?: THREE.Color;
};
const mutations: MutationTree<SceneState> = {
  [INIT_REGDOLL_SCENE](state, payload: initSceneVO) {
    state.mainScene = new regDollScene(payload.renderDom, payload.showAxes, payload.showGirdHelper);
  },
  [ADD_OBJECT](state, payload: RegDollSceneObject3D) {
    state.mainScene?.addObject(payload);
  },
  [REMOVE_OBJECT](state, payload: RegDollSceneObject3D) {
    state.mainScene?.removeObject(payload);
  },
};

export default mutations;
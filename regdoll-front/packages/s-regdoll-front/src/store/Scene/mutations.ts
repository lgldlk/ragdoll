import { SET_LOCK_SCENE, SET_NOW_SELECT_OBJ, SET_RENDER_SCENE } from './mutation-types';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-06-03 19:43:58
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-09 09:33:32
 */

import { SceneState } from "./state";

import { MutationTree } from "vuex";
import { regDollScene } from "/@/threeScene/RegDollScene";
import { INIT_REGDOLL_SCENE, ADD_OBJECT, REMOVE_OBJECT, RENDER_SCENE, SET_BACKGROUND_TEXT_URE_CUBE, SET_LOCK_CHOICE } from "./mutation-types";
import { RegDollSceneObject3D } from "/@/threeScene/RegDollSceneObject3D";
type initSceneVO = {
  renderDom: HTMLElement;
  showAxes: Boolean;
  showGirdHelper: Boolean;
  backgroundColor?: THREE.Color;
  gridColor?: THREE.Color,
  userSelect: Boolean
};
const mutations: MutationTree<SceneState> = {
  [INIT_REGDOLL_SCENE](state, payload: initSceneVO) {
    state.mainScene = new regDollScene(payload.renderDom, payload.showAxes, payload.showGirdHelper, payload.backgroundColor, payload.gridColor, payload.userSelect);
  },
  [ADD_OBJECT](state, payload: [RegDollSceneObject3D, Event | null]) {
    state.mainScene?.addObject(payload[0], payload[1] || null);
  },
  [REMOVE_OBJECT](state, payload: RegDollSceneObject3D) {
    state.mainScene?.removeObject(payload);
  },
  [RENDER_SCENE](state) {
    state.mainScene?.render();
  },
  [SET_BACKGROUND_TEXT_URE_CUBE](state, payload: THREE.Texture) {
    state.mainScene?.setBackgroundTextUreCube(payload)
  },
  [SET_LOCK_CHOICE](state, payload: Boolean) {
    state.mainScene?.setLockChoice(payload)
  },
  [SET_NOW_SELECT_OBJ](state, payload: RegDollSceneObject3D | undefined) {
    state.nowSelectObj = payload
  },
  [SET_LOCK_SCENE](state, payload: Boolean) {
    state.mainScene?.setLockScene(payload);
  },
  [SET_RENDER_SCENE](state, payload: Boolean) {
    state.mainScene?.setRenderScene(payload)
  }
};

export default mutations;

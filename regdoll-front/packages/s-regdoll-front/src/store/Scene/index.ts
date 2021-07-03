import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import state, { SceneState } from "./state";
import { Module } from "vuex";
import { RootState } from "../index";

const scene: Module<SceneState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default scene;

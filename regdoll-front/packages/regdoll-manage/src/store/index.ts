/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-06-03 19:38:46
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-03 20:23:27
 */
import { createStore, ModuleTree } from "vuex";
import { SceneState } from "./Scene/state";
import scene from "./Scene";
export type RootState = {
  scene: SceneState;
};
const modules: ModuleTree<RootState> = { scene };

export default createStore({ modules });

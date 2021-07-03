/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-06-03 19:38:46
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-10 21:26:01
 */
import { createStore, ModuleTree } from "vuex";
import { SceneState } from "./Scene/state";
import scene from "./Scene";
export const SCENE_MODULE_COMMIT_PREFIX="scene/"
export type RootState = {
  scene: SceneState;
};
const modules: ModuleTree<RootState> = { scene };

export default createStore({ modules });

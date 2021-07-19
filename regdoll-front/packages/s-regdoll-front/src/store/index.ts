/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-06-03 19:38:46
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 08:18:33
 */
import { createStore, ModuleTree } from "vuex";
import { SceneState } from "./Scene/state";
import { UserState } from './User/state'
import scene from "./Scene";
import user from './User'
export const SCENE_MODULE_COMMIT_PREFIX = "scene/"
export const USER_MODULE_COMMIT_PREFIX = "user/"
export type RootState = {
  scene: SceneState;
  user: UserState
};
const modules: ModuleTree<RootState> = { scene, user };

export default createStore({ modules });

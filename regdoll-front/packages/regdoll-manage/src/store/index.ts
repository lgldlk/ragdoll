/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-06-03 19:38:46
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-03 19:50:06
 */
import { createStore } from "vuex";
import { SceneState } from "./Scene/state";

export type RootState = {
  scene: SceneState;
};
export default createStore({});

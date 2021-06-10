/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-06-03 19:43:58
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-07 22:00:40
 */
import { regDollScene } from "/@/threeScene/RegDollScene";

export interface SceneState {
  mainScene: regDollScene | null;
}

const sceneState: SceneState = {
  mainScene: null,
};

export default sceneState;

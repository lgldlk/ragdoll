import { RegDollSceneObject3D } from '/@/threeScene/RegDollSceneObject3D';
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-06-03 19:43:58
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 09:50:50
 */
import { regDollScene } from "/@/threeScene/RegDollScene";

export interface SceneState {
  mainScene: regDollScene | null;
  nowSelectObj: RegDollSceneObject3D | undefined
}

const sceneState: SceneState = {
  mainScene: null,
  nowSelectObj: undefined
};

export default sceneState;

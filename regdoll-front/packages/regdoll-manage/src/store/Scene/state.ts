import { regDollScene } from "/@/threeScene/RegDollScene";

export interface SceneState {
  mainScene: regDollScene | null;
}

const sceneState: SceneState = {
  mainScene: null,
};

export default sceneState;

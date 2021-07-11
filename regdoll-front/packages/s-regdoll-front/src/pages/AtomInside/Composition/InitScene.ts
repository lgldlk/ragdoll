
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-11 17:03:40
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-11 22:42:56
 */
import { Store } from 'vuex';
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import { INIT_REGDOLL_SCENE, RENDER_SCENE, SET_BACKGROUND_TEXT_URE_CUBE, SET_RENDER_SCENE } from '/@/store/Scene/mutation-types';
import { Vector3, Color } from "three";
import { CubeTextureLoader } from 'three'
export default function initScene(store: Store<RootState>, renderDom: HTMLElement) {
  store.commit(SCENE_MODULE_COMMIT_PREFIX + INIT_REGDOLL_SCENE, {
    renderDom: renderDom,
    showAxes: false,
    showGirdHelper: false,
    backgroundColor: new Color(0, 0, 0),
    gridColor: new Color("rgb(0,  82,  82)"),
    userSelect: false
  });
  var imagePrefix = "textures/nebula/nebula-";
  var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
  var imageSuffix = ".png";
  var imageURLs = [];
  for (var i = 0; i < 6; i++)
    imageURLs.push(imagePrefix + directions[i] + imageSuffix);
  const textureCube = new CubeTextureLoader().load(imageURLs, () => {
    store.commit(SCENE_MODULE_COMMIT_PREFIX + RENDER_SCENE);
  });
  store.commit(SCENE_MODULE_COMMIT_PREFIX + SET_BACKGROUND_TEXT_URE_CUBE, textureCube);
  store.state.scene.mainScene?.camera.position.set(32.758683096996116, 8.729285947379905, 39.88103885762427);
  (store.state.scene.mainScene?.camera as any).enableZoom = false;
  // store.state.scene.mainScene?.camera.maxAzimuthAngle =
  (window as any).showCamera = () => {
    console.log(store.state.scene.mainScene?.camera);

  }
  store.state.scene.mainScene?.camera.lookAt(0, 0, 0);
  store.state.scene.mainScene?.camera.updateProjectionMatrix()
  store.commit(SCENE_MODULE_COMMIT_PREFIX + SET_RENDER_SCENE, true)
}
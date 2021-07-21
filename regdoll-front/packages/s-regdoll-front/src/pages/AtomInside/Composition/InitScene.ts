
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-11 17:03:40
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 14:36:44
 */
import { Store } from 'vuex';
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import { INIT_REGDOLL_SCENE, RENDER_SCENE, SET_BACKGROUND_TEXT_URE_CUBE, SET_RENDER_SCENE } from '/@/store/Scene/mutation-types';
import { Vector3, Color } from "three";
import { CubeTextureLoader } from 'three'
import { changeSceneBackground } from '/@/util';


function setAtomInsideOrbitControls(orbitControls: any) {
  orbitControls.enableZoom = false;
  // orbitControls.autoRotate = true
  orbitControls.minAzimuthAngle = Math.PI / 6;
  orbitControls.maxAzimuthAngle = Math.PI / 6 * 2;
  orbitControls.minPolarAngle = Math.PI / 4;
  orbitControls.maxPolarAngle = Math.PI / 2;
}
export default function initScene(store: Store<RootState>, renderDom: HTMLElement) {
  store.commit(SCENE_MODULE_COMMIT_PREFIX + INIT_REGDOLL_SCENE, {
    renderDom: renderDom,
    showAxes: false,
    showGirdHelper: false,
    backgroundColor: new Color(0, 0, 0),
    gridColor: new Color("rgb(0,  82,  82)"),
    userSelect: false
  });
  changeSceneBackground("nebula");
  store.commit(SCENE_MODULE_COMMIT_PREFIX + SET_RENDER_SCENE, true)
  store.state.scene.mainScene?.camera.position.set(32.758683096996116, 8.729285947379905, 39.88103885762427);
  setAtomInsideOrbitControls(store.state.scene.mainScene?.orbitControls);
  // store.state.scene.mainScene?.camera.maxAzimuthAngle =

  store.state.scene.mainScene?.camera.lookAt(0, 0, 0);
  store.state.scene.mainScene?.camera.updateProjectionMatrix()
  store.commit(SCENE_MODULE_COMMIT_PREFIX + SET_RENDER_SCENE, true)
}
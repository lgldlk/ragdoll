import AtomModel from '/@/threeScene/atomModule/AtomModule';
import { Router } from 'vue-router';
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import { Store } from 'vuex';
import { computed, watch } from 'vue'
import { RegDollSceneObject3D } from '/@/threeScene/RegDollSceneObject3D';
import { RENDER_SCENE, SET_LOCK_SCENE } from '/@/store/Scene/mutation-types';
// @ts-ignore
import { TWEEN } from "/@/assets/js/tween.module.min.js";
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-07 19:12:29
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 14:00:15
 */


export default function rightChooseModule(store: Store<RootState>, router: Router) {

  let selectObj = computed(() => {
    return store.state.scene.nowSelectObj;
  }
  ),
    intoNucleus = () => {
      if (store.state.scene.mainScene?.camera) {
        // console.log((store.state.scene.mainScene?.camera as any).fov);

        // (store.state.scene.mainScene?.camera as any).fov = store.state.scene.mainScene?.camera.fov / 2;
        // store.state.scene.mainScene.camera.updateProjectionMatrix();
        const tweenFov = {
          fov: 45
        }
        let continueTween = true;

        new TWEEN.Tween(tweenFov)
          .to({ fov: 10 }, 2000)
          .easing(TWEEN.Easing.Quadratic.In)
          .onUpdate(() => {
            // store?.commit(
            //   SCENE_MODULE_COMMIT_PREFIX + SET_LOCK_SCENE,
            //   true
            // );
            (store.state.scene.mainScene?.camera as any).fov = tweenFov.fov;
            store.state.scene.mainScene?.camera.updateProjectionMatrix();
            store.commit(SCENE_MODULE_COMMIT_PREFIX + RENDER_SCENE);
            if (continueTween) {
              setTimeout(() => { TWEEN.update() }, 50)
            } else {
              router.push({
                path: "atomInside",
                query: {
                  element_number: (store.state.scene.nowSelectObj as AtomModel).atomData.ele_number
                }
              });
              (store.state.scene.mainScene?.camera as any).fov = 45;
            }
            store.commit(SCENE_MODULE_COMMIT_PREFIX + RENDER_SCENE);
            //update
          }).onComplete(() => {
            router.push({
              path: "atomInside",
              query: {
                element_number: (store.state.scene.nowSelectObj as AtomModel).atomData.ele_number
              }
            });
          })
          .start()
        TWEEN.update();
        setTimeout(() => {
          continueTween = false;
        }, 2060)

      }
    }

  return {
    selectObj: selectObj,
    intoNucleus
  }
}
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import { Router } from 'vue-router';
import { Store } from 'vuex';
import { computed, inject, ref } from 'vue';
import * as  THREE from 'three';
import { INIT_REGDOLL_SCENE } from '/@/store/Scene/mutation-types';
import { regDollScene } from '/@/threeScene/RegDollScene';
import { SmallScene } from '/@/threeScene/SmallScene';
import MoleculeModule from '/@/threeScene/atomModule/MoleculeModule';
import { CLOSE_LOADING_WINDOW, OPEN_LOADING_WINDOW } from '/@/PROVIDE_KEY';
import { MoleculeRequest } from '/@/api/MoleculeRequest';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-19 17:18:16
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 22:05:07
 */
export function chooseMoleculeModule(store: Store<RootState>, router: Router) {
  let smallAtom
  const openLoadingWindow = inject<Function>(OPEN_LOADING_WINDOW),
    closeLoadingWindow = inject<Function>(CLOSE_LOADING_WINDOW)
  const selectObj = computed(() => {
    return store.state.scene.nowSelectObj;
  }),
    moleculeWindowVis = ref(false),
    knowledgePoint = ref(""),
    openMoleculeWindow = async () => {
      openLoadingWindow && openLoadingWindow()
      moleculeWindowVis.value = true;
      if (selectObj.value) {
        knowledgePoint.value = (await MoleculeRequest.getMoleculeKnowById((selectObj.value as MoleculeModule).moleculeModuleData.id)).data.knowledgePoint;

      }
      smallAtom = document.getElementById("smallAtom");

      if (smallAtom) {
        smallAtom.innerHTML = "";
        let smallDollScene = new SmallScene(
          smallAtom,

        );

        smallDollScene.addObject(new MoleculeModule((store.state.scene.nowSelectObj as any).moleculeModuleData))
        closeLoadingWindow && closeLoadingWindow()
      } else {

        setTimeout(() => {
          smallAtom = document.getElementById("smallAtom");
          if (smallAtom) {
            smallAtom.innerHTML = "";
            let smallDollScene = new SmallScene(
              smallAtom,

            );

            smallDollScene.addObject(new MoleculeModule((store.state.scene.nowSelectObj as any).moleculeModuleData))
            closeLoadingWindow && closeLoadingWindow()
          }
        }
          , 1000)
      }

    },
    closeMoleculeWindow = () => {
      moleculeWindowVis.value = false;
    },
    atomNameClick = (item: any) => {
      console.log(item);
      // router.
      let routeData = router.resolve({
        path: "/atomDetail",
        query: {
          atom_id: item.atomId
        }
      })

      window.open(routeData.href, '_blank');
    }

  return {
    selectObj,
    moleculeWindowVis,
    openMoleculeWindow,
    atomNameClick,
    closeMoleculeWindow,
    knowledgePoint
  }

}
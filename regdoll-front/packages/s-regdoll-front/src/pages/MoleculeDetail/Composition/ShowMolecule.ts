
import { Store } from 'vuex';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-19 15:03:27
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 09:53:48
 */

import { inject } from 'vue';
import { MoleculeRequest } from '/@/api/MoleculeRequest'
import { CLOSE_LOADING_WINDOW, OPEN_LOADING_WINDOW } from '/@/PROVIDE_KEY';
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { ADD_OBJECT, SET_LOCK_CHOICE } from './../../../store/Scene/mutation-types';
import MoleculeModule from '/@/threeScene/atomModule/MoleculeModule';

export async function moleculeModule(store: Store<RootState>, route: RouteLocationNormalizedLoaded) {
  const openLoadingWindow = inject<Function>(OPEN_LOADING_WINDOW),
    closeLoadingWindow = inject<Function>(CLOSE_LOADING_WINDOW);
  openLoadingWindow && openLoadingWindow();
  let allMolecule = (await MoleculeRequest.allMolecule()).data;
  if (route.query.showMoleId) {
    for (let molecule of allMolecule) {
      if (molecule.id == route.query.showMoleId) {
        store.commit(SCENE_MODULE_COMMIT_PREFIX + ADD_OBJECT, [new MoleculeModule(molecule)])
      }
    }
  } else {
    store.commit(SCENE_MODULE_COMMIT_PREFIX + ADD_OBJECT, [new MoleculeModule(allMolecule[0])])
  }
  console.log(allMolecule);

  closeLoadingWindow && closeLoadingWindow();


}
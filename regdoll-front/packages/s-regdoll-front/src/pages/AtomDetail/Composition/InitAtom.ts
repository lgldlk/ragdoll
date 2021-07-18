import { ElMessage } from 'element-plus';
import { ADD_OBJECT, SET_LOCK_CHOICE } from './../../../store/Scene/mutation-types';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-05 08:07:46
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-11 20:04:51
 */

import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { Store } from 'vuex';
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import AtomModel from '/@/threeScene/atomModule/AtomModule';
import { AtomRequest } from "/@/api/AtomRequest"
import { onMounted } from "vue"
export default async function initAtom(store: Store<RootState>, route: RouteLocationNormalizedLoaded) {
  let initAtomData
  if (route.query.element_number) {
    initAtomData = (await AtomRequest.getAtomByEleNum(Number(route.query.element_number))).data
    if (initAtomData == undefined) {
      ElMessage({ type: "error", message: "您好暂时不支持这种元素哦~" })

      initAtomData = (await AtomRequest.getAtomByEleNum(1)).data
      window.history.pushState(null, initAtomData.ch_name + "元素", "/atomDetail?element_number=1");
    }
  } else {
    initAtomData = (await AtomRequest.getAtomByEleNum(1)).data
    window.history.pushState(null, initAtomData.ch_name + "元素", "/atomDetail?element_number=1");
  }
  store.commit(SCENE_MODULE_COMMIT_PREFIX + ADD_OBJECT, [new AtomModel(initAtomData)])
  store?.commit(
    SCENE_MODULE_COMMIT_PREFIX + SET_LOCK_CHOICE,
    true
  );
}
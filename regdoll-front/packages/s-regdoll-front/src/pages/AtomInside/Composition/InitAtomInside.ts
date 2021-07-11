import { ADD_OBJECT, SET_LOCK_CHOICE } from './../../../store/Scene/mutation-types';
import { SCENE_MODULE_COMMIT_PREFIX } from './../../../store/index';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-11 20:03:29
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-11 20:39:49
 */

import { RouteLocationNormalizedLoaded } from 'vue-router';
import { Store } from 'vuex';
import { RootState } from '/@/store';
import { AtomRequest } from '/@/api/AtomRequest';
import { ElMessage } from 'element-plus';
import AtomInside from '/@/threeScene/atomModule/AtomInside';



export default async function initAtomInside(store: Store<RootState>, route: RouteLocationNormalizedLoaded) {

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
  store.commit(SCENE_MODULE_COMMIT_PREFIX + ADD_OBJECT, [new AtomInside(initAtomData.ele_number, initAtomData.quality)])
  store?.commit(
    SCENE_MODULE_COMMIT_PREFIX + SET_LOCK_CHOICE,
    true
  );
}
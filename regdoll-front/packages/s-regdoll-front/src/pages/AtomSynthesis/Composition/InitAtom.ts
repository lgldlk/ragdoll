import { ElMessage } from 'element-plus';
import { ADD_OBJECT } from './../../../store/Scene/mutation-types';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-05 08:07:46
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-10 09:58:06
 */

import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { Store } from 'vuex';
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import AtomModel from '/@/threeScene/atomModule/AtomModule';
import { AtomRequest } from "/@/api/AtomRequest"
import { onMounted } from "vue"
export default async function initAtom(store: Store<RootState>, router: RouteLocationNormalizedLoaded) {

  if (router.query.element_number) {
    const initAtomData = (await AtomRequest.getAtomByEleNum(Number(router.query.element_number))).data
    if (initAtomData == undefined) {
      ElMessage({ type: "error", message: "您好暂时不支持这种元素哦~" })
      return
    }
    console.log(initAtomData);

    store.commit(SCENE_MODULE_COMMIT_PREFIX + ADD_OBJECT, [new AtomModel(initAtomData)])
  }

}
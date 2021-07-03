import { SCENE_MODULE_COMMIT_PREFIX } from './../../../../store/index';
import BoxModel from '/@/threeScene/BaseModel/BoxModel';
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-06-10 21:07:48
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-02 22:29:30
 */

import { Store } from 'vuex';
import store, { RootState } from '/@/store';
import { ADD_OBJECT } from '/@/store/Scene/mutation-types';
import CircleModel from '/@/threeScene/BaseModel/CircleModel';


export const DARG_KEY = {
  boxModel: "BoxModel",
  circleModel: "CircleModel",

}
const baseModRefer: any = {
  [DARG_KEY.boxModel]: BoxModel,
  [DARG_KEY.circleModel]: CircleModel
}
  , mainSceneDrop = (e: Event) => {
    if (e.dataTransfer.getData("dargPart") != undefined) {
      store.commit(SCENE_MODULE_COMMIT_PREFIX + ADD_OBJECT, [new baseModRefer[e.dataTransfer.getData("dargPart")](), e])
      e.preventDefault();
    }
  }, mainSceneDragover = (e: Event) => {
    e.preventDefault();
  }
export default function centerMod(storeIn: Store<RootState>) {
  return {
    mainSceneDrop
    , mainSceneDragover
  }
}


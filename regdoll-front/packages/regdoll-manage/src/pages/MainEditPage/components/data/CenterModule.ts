import { SCENE_MODULE_COMMIT_PREFIX } from './../../../../store/index';
import  BoxModel  from '/@/threeScene/BaseModel/BoxModel';
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-06-10 21:07:48
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-10 22:14:20
 */

import { Store } from 'vuex';
import store, { RootState } from '/@/store';
import { ADD_OBJECT } from '/@/store/Scene/mutation-types';

const baseModRefer:any = {
  "BoxModel":BoxModel
}
, mainSceneDrop = (e: Event) => {
  
  store.commit(SCENE_MODULE_COMMIT_PREFIX+ADD_OBJECT, [new baseModRefer[e.dataTransfer.getData("dargPart")](),e])
  e.preventDefault();
}, mainSceneDragover = (e: Event) => {
  e.preventDefault();
}
export default function centerMod(storeIn: Store<RootState>) {
  return {
    mainSceneDrop
    , mainSceneDragover
  }
}


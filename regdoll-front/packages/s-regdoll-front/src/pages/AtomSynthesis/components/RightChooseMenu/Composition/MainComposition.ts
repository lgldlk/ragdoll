import { RootState } from '/@/store';
import { Store } from 'vuex';
import { computed, watch } from 'vue'
import { RegDollSceneObject3D } from '/@/threeScene/RegDollSceneObject3D';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-07 19:12:29
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 13:11:18
 */


export default function rightChooseModule(store: Store<RootState>) {

  let selectObj = computed(() => {
    return store.state.scene.nowSelectObj;
  }
  );
  return {
    selectObj: selectObj
  }
}
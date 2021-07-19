import { HeadImgUrl, DefaultHederImgUrl } from './../../config/RequestConfig';
import { RootState } from '/@/store';
import { Store } from 'vuex';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-19 09:08:26
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 10:06:22
 */
import { ref, computed } from 'vue'
const handleSelect = (index: number, indexPath: string[]) => {
  activeIndex.value = indexPath[0]
},
  activeIndex = ref("1")


export function topBarModule(store: Store<RootState>) {
  const userTrueName = computed(() => {
    return store.state.user.trueName || "未登录";
  }),
    imgUrl = computed(() => {
      if (store.state.user.imgUrl.trim() != "") {
        return HeadImgUrl + store.state.user.imgUrl
      }
      return DefaultHederImgUrl
    }),
    userPopVisible = ref(false)
  return {
    userTrueName,
    userPopVisible,
    imgUrl,
    handleSelect,
    activeIndex
  }
}
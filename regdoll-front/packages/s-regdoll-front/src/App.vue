<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-03 09:24:26
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 09:07:01
-->
<template>
  <div>
    <router-view />
    <LoadingWindow v-show="showLoading"></LoadingWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide ,onMounted} from "vue";
import {LocalStorage} from '/@/util/LocalStorage' ;
import LoadingWindow from "./components/LoadingWindow/index.vue";
import { OPEN_LOADING_WINDOW, CLOSE_LOADING_WINDOW } from "./PROVIDE_KEY";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    LoadingWindow,
  },
  setup() {
    const showLoading = ref(false),
         store = useStore(),
      openShowLoading = () => {
        showLoading.value = true;
      },
      closeShowLoading = () => {
        showLoading.value = false;
      };
    provide(OPEN_LOADING_WINDOW, openShowLoading);
    provide(CLOSE_LOADING_WINDOW, closeShowLoading);
    onMounted(() => {
      let user=LocalStorage.getLocalStoreByBase64("token");
      if(user){
         store.commit("user/set_user",user); 
      }
    })
    return {
      showLoading
    };
  },
});
</script>
<style lang="sass">
@import './index.scss'
</style>

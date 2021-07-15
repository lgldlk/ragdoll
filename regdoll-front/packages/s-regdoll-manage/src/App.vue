<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-12 09:06:53
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-15 09:24:15
-->
<template>
  <div>
    <router-view />
    <LoadingWindow v-show="showLoading"></LoadingWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from "vue";
import LoadingWindow from "./components/LoadingWindow/index.vue";
import { OPEN_LOADING_WINDOW, CLOSE_LOADING_WINDOW } from "./PROVIDE_KEY";
export default defineComponent({
  components: {
    LoadingWindow,
  },
  setup() {
    const showLoading = ref(false),
      openShowLoading = () => {
        showLoading.value = true;
      },
      closeShowLoading = () => {
        showLoading.value = false;
      };
    provide(OPEN_LOADING_WINDOW, openShowLoading);
    provide(CLOSE_LOADING_WINDOW, closeShowLoading);
    return {
      showLoading,
    };
  },
});
</script>
<style lang="sass">
@import './index.scss'
</style>

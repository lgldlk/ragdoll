<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-03 21:07:32
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-10 21:21:05
-->
<template>
  <div id="mainScene" @drop="mainSceneDrop" @dragover="mainSceneDragover"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import centerSceneMod from './data/CenterModule.ts'
export default defineComponent({
  setup(){
    const store=useStore()
      const centerMod = centerSceneMod(store);
    return {
      ...centerMod,
    };
  }
});
</script>
<style lang="scss" scoped>
@import "./css/CenterScene.scss";
</style>

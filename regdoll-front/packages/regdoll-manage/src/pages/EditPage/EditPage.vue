<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-03 19:54:41
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-31 21:58:25
-->
<template>
  <div class="edit-page">
    <leaf-column class="leaf-column" />
    <center-scene class="center-scene" />
    <right-column class="right-column" />
    <popWindow
      v-if="showAtomChooseWindow"
      :windowTitle="'原子选择'"
      @bgClick="closeAtomChooseWindow"
      @forkClick="closeAtomChooseWindow"
    ></popWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext } from "vue";
import leafColumn from "./components/LeafColumn.vue";
import rightColumn from "./components/RightColumn.vue";
import centerScene from "./components/CenterScene.vue";
import { proParts } from "./data/parts";
import { initScene } from "./data/mainScene";
import AtomChooseWindow from "./data/AtomChooseWindow";
import popWindow from "/@/components/popUpWindows/index.vue";
export default defineComponent({
  components: { leafColumn, popWindow, rightColumn, centerScene },
  setup(props, content: SetupContext) {
    proParts();
    onMounted(() => {
      let tmpScene = document.getElementById("mainScene");
      if (tmpScene) {
        initScene(tmpScene);
      }
    });
    const AtomChooseWindowModule = AtomChooseWindow();
    return {
      ...AtomChooseWindowModule,
    };
  },
});
</script>
<style scoped lang="scss">
@import "./EditPage.scss";
</style>

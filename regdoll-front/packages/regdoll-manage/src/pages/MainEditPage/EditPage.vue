<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-03 19:54:41
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-07 21:58:41
-->
<template>
  <div class="edit-page">
    <leaf-column class="leaf-column" />
    <center-scene class="center-scene" />
    <!-- <right-column class="right-column" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext } from "vue";
import leafColumn from "./components/LeafColumn.vue";
import rightColumn from "./components/RightColumn.vue";
import centerScene from "./components/CenterScene.vue";
import initDataGuiMod from "./data/DataGui";
import { initScene } from "./data/mainScene";
import { useStore } from "vuex";
import popWindow from "/@/components/popUpWindows/index.vue";
export default defineComponent({
  components: {
    leafColumn,
    popWindow,
    // rightColumn,
    centerScene,
  },
  setup(props, content: SetupContext) {
    let store = useStore();
    onMounted(() => {
      let tmpScene = document.getElementById("mainScene");
      if (tmpScene) {
        initScene(store, tmpScene);
        initDataGuiMod(store);
      }
    });
  },
});
</script>
<style scoped lang="scss">
@import "./EditPage.scss";
</style>

<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-03 19:54:41
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-03 21:10:57
-->
<template>
  <div class="edit-page">
    <leaf-column class="leaf-column" />
    <center-scene class="center-scene" />
    <right-column class="right-column" />
    <popWindow
      v-if="showAtomChooseWindow"
      windowTitle="原子选择"
      @forkClick="closeAtomChooseWindow"
    >
      <div>
        <el-select v-model="chooseAtomEnName" placeholder="请选择要添加的原子">
          <el-option
            v-for="item in atomArray"
            :key="item.ch_name"
            :label="item.ch_name"
            :value="item.en_name"
          >
          </el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="popWindow_footer">
          <el-button size="mini" round="true" @click="closeAtomChooseWindow">取 消</el-button>
          <el-button size="mini" type="primary" round="round" @click="affirmChooseAtom"
            >确 定</el-button
          >
        </span>
      </template>
    </popWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext } from "vue";
import leafColumn from "./components/LeafColumn.vue";
import rightColumn from "./components/RightColumn.vue";
import centerScene from "./components/CenterScene.vue";
import leftColMod from "./data/leftColModule";
import { initScene } from "./data/mainScene";
import { useStore } from "vuex";
import popWindow from "/@/components/popUpWindows/index.vue";
export default defineComponent({
  components: { leafColumn, popWindow, rightColumn, centerScene },
  setup(props, content: SetupContext) {
    let store = useStore();
    onMounted(() => {
      let tmpScene = document.getElementById("mainScene");
      if (tmpScene) {
        initScene(store, tmpScene);
      }
    });
    const leftMod = leftColMod(store);
    return {
      ...leftMod,
    };
  },
});
</script>
<style scoped lang="scss">
@import "./EditPage.scss";
</style>

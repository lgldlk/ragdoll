<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-03 21:03:59
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-07 20:51:31
-->
<template>
  <div class="leafMenu">
    <parts></parts>
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
          <el-button size="mini" :round="true" @click="closeAtomChooseWindow">取 消</el-button>
          <el-button size="mini" type="primary" round="round" @click="affirmChooseAtom"
            >确 定</el-button
          >
        </span>
      </template>
    </popWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import parts from "./parts.vue";
import leftColMod from "./data/LeftColModule";
import popWindow from "/@/components/popUpWindows/index.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    parts,popWindow
  },
  setup() {
    let store = useStore();
    const leftMod = leftColMod(store);
    return {
      ...leftMod,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./css/LeafColumn.scss";
</style>

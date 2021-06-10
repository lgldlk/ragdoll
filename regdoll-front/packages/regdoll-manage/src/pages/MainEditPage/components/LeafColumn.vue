<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-03 21:03:59
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-10 19:49:55
-->
<template>
  <div class="leafMenu">
    <div class="menuSliderBar">
      <el-tooltip
        v-for="(item, i) in menuBar"
        effect="light"
        :content="item.tipContent"
        placement="right"
      >
        <div class="bar-item" v-html="item.image"  @click.stop="menuBarClick(i)">
        </div>
      </el-tooltip>
    </div>
    <div class="menuCon">
      <baseModelParts v-show="showMenu==0"></baseModelParts>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import baseModelParts from "./BaseModelParts.vue";
import leftColMod from "./data/LeftColModule";
import popWindow from "/@/components/popUpWindows/index.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    baseModelParts,
    popWindow,
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
<style>
.icon {
  fill: #f9fafb;
  width: 80%;
}
</style>

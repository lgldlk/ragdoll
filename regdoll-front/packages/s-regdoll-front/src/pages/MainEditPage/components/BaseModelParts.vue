<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-04 21:10:34
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-10 21:02:46
-->
<template>
  <div class="parts" >
    <div class="part" v-for="(item, i) in parts" draggable="true"  :key="i" @click="item.click" @dragstart="item.dragstart($event, index)">
      <div v-html="item.image"></div>
      <div class="part-title">{{ item.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from "vue";
import { getParts } from "./data/LeftColModule";

export default defineComponent({
  setup() {
    const parts = getParts();
    return {
      parts,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./css/Parts.scss";
</style>
<style>
     .icon {
            width: 60%;
        }</style>
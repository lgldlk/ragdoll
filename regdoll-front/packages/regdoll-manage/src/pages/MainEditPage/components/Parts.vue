<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-04 21:10:34
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-02 20:13:17
-->
<template>
  <div class="parts" @click="tmpClick">
    <div class="part" v-for="(item, i) in parts" :key="i" @click="item.click">
      <div v-html="item.image"></div>
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from "vue";
import { getParts } from "../data/leftColModule";

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

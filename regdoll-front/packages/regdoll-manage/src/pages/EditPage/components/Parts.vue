<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-04 21:10:34
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-11 21:00:24
-->
<template>
  <div class="parts">
    <div class="part" v-for="(item, i) in parts" :key="i">
      <div v-html="item.image"></div>
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getParts } from '../data/parts';

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
@import './css/Parts.scss';
</style>

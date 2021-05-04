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
import { getParts } from '../data/index';

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

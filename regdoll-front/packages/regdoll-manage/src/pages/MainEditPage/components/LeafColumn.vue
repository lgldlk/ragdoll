<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-03 21:03:59
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-29 21:54:02
-->
<template>
  <div class="leafMenu">
    <parts></parts>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import parts from './parts.vue';
export default defineComponent({
  components: {
    parts,
  },
});
</script>
<style lang="scss" scoped>
@import './css/LeafColumn.scss';
</style>

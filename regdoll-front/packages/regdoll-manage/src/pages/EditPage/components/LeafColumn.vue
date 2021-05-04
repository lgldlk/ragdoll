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

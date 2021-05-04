<template>
  <div class="edit-page">
    <leaf-column class="leaf-column" />
    <center-scene class="center-scene" />
    <right-column class="right-column" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import leafColumn from './components/LeafColumn.vue';
import rightColumn from './components/RightColumn.vue';
import centerScene from './components/CenterScene.vue';
import { proParts } from './data';
export default defineComponent({
  components: { leafColumn, rightColumn, centerScene },
  setup() {
    proParts();
  },
});
</script>
<style scoped lang="scss">
@import './EditPage.scss';
</style>

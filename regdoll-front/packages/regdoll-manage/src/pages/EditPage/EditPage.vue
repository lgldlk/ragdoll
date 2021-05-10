<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-03 19:54:41
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-10 20:59:22
-->
<template>
  <div class="edit-page">
    <leaf-column class="leaf-column" />
    <center-scene class="center-scene" />
    <right-column class="right-column" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import leafColumn from './components/LeafColumn.vue';
import rightColumn from './components/RightColumn.vue';
import centerScene from './components/CenterScene.vue';
import { proParts } from './data/parts';
import { initScene } from './data/mainScene';

export default defineComponent({
  components: { leafColumn, rightColumn, centerScene },
  setup() {
    proParts();
    onMounted(() => {
      let tmpScene = document.getElementById('mainScene');
      if (tmpScene) {
        initScene(tmpScene);
      }
    });
  },
});
</script>
<style scoped lang="scss">
@import './EditPage.scss';
</style>

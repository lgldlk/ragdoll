<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-04 15:22:18
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-04 19:35:19
-->


<template>
<div class="scene_container">
  <div id="mainScene" ></div>
</div>
</template>
<script lang='ts'>
import { defineComponent,onMounted } from 'vue'
import { useStore } from "vuex";
import initScene from './Composition/AtomScene.ts' 
export default defineComponent({
   name: '',
   setup() {
     	const  store = useStore();
      onMounted(() => {
		  	let tmpScene = document.getElementById("mainScene");
        if (tmpScene) {
          initScene(store, tmpScene);
        }
		});
 }
})
</script>
<style  lang="scss" scoped>
@import './AtomDetail.scss';
</style>
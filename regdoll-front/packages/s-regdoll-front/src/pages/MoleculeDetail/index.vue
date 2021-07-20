<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-19 14:33:31
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 20:31:38
-->
<template>
<div class="scene_container">
    <div id="moleculeMainScene"></div>

      <rightMenu></rightMenu>
</div>
</template>
<script lang='ts'>
import { defineComponent,onMounted } from 'vue'
import { useStore } from "vuex";
import {moleculeModule} from './Composition/ShowMolecule'
import { useRoute, useRouter } from "vue-router";
import {initMoleculeScene} from './Composition/InitScene'
import rightMenu from './RightMenu/index.vue'
export default defineComponent({
   name: '',
   components:{
     rightMenu
   },
   setup() {
         const store = useStore(),
      route = useRoute(),
      router = useRouter();
     onMounted(() => {
         let tmpScene = document.getElementById("moleculeMainScene");

       initMoleculeScene(store,tmpScene)
                moleculeModule(store, route);
     })
 }
})
</script>
<style scoped lang="scss">
@import './MoleculeDetail.scss'
</style>
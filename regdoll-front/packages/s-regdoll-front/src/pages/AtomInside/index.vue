<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-10 22:29:27
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-11 20:44:24
-->
<template>
  <div class="scene_container">
    <div id="AtomInsideMainScene"></div>
    <bottomMenu></bottomMenu>
  </div>
</template>
<script lang='ts'>
import { defineComponent,onMounted } from "vue";
import bottomMenu from './components/BottomMenu/index.vue'
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import initScene from './Composition/InitScene'
import initAtom from './Composition/InitAtomInside'
export default defineComponent({
	name: "",
  components:{
    bottomMenu
  },
	setup() {
    const store = useStore(),
    	route = useRoute()
    		onMounted(() => {
    	let tmpScene = document.getElementById("AtomInsideMainScene");
			if (tmpScene) {
				initScene(store, tmpScene);
        initAtom(store,route)
			}
      	
		});
  },
});
</script>
<style scoped lang="scss">
@import "./AtomInside.scss";
</style>
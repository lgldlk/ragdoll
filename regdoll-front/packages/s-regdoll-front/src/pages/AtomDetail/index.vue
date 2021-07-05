<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-04 15:22:18
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-05 14:02:45
-->


<template>
  <div class="scene_container">
    <div id="mainScene"></div>
    <rightMenu></rightMenu>
  </div>
</template>
<script lang='ts'>
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import initScene from "./Composition/AtomScene";
import initAtom from "./Composition/InitAtom";
import { useRoute } from "vue-router";
import rightMenu from "./components/RightMenu.vue";
export default defineComponent({
	name: "",
	components: {
		rightMenu,
	},
	setup() {
		const store = useStore(),
			router = useRoute();
		onMounted(() => {
			let tmpScene = document.getElementById("mainScene");
			if (tmpScene) {
				initScene(store, tmpScene);
				initAtom(store, router);
			}
		});
	},
});
</script>
<style  lang="scss" scoped>
@import "./AtomDetail.scss";
</style>
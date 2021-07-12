<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-04 15:22:18
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-09 19:52:07
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
import { useRoute, useRouter } from "vue-router";
import rightMenu from "./components/RightMenu/RightMenu.vue";
export default defineComponent({
	name: "",
	components: {
		rightMenu,
	},
	setup() {
		const store = useStore(),
			route = useRoute(),
			router = useRouter();
		onMounted(() => {
			let tmpScene = document.getElementById("mainScene");
			if (tmpScene) {
				initScene(store, tmpScene);
				initAtom(store, route, router);
			}
		});
	},
});
</script>
<style  lang="scss" scoped>
@import "./AtomDetail.scss";
</style>
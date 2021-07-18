<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-07 10:45:08
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-08 11:24:27
-->
<template>
  <div class="choose_menu">
    <el-card class="choose_menu_container">
      <template #header>
        <div class="container_header">
          <span>
            <span class="atom_ch_name">{{ selectObj?.ch_name }}</span> 元素</span>
          <span class="atom_en_name">{{ selectObj?.en_name }}</span>
        </div>
      </template>
      <div class="container_body">
        <div class="atom_ele_number">电子数：{{selectObj?.ele_number}}</div>
        <div class="atom_quality">原子质量：{{selectObj?.quality}}</div>
        <div class="atom_describe">原子相关：{{selectObj?.describe}}</div>
      </div>

    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import rightChooseModule from "./Composition/MainComposition";
export default defineComponent({
	name: "",
	setup() {
		const store = useStore(),
			rightChooseMod = rightChooseModule(store);
		return {
			...rightChooseMod,
		};
	},
});
</script>
<style scoped lang="scss">
@import "./RightChooseMenu.scss";
</style>

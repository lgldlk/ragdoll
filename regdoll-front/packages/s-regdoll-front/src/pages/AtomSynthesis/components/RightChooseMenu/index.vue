<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-07 10:45:08
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 13:47:40
-->
<template>
  <div class="choose_menu">
 <el-card class="choose_menu_container">
      <template #header>
        <div class="container_header"   v-show="(selectObj?.atomData)">
          <span >
            <span class="atom_ch_name">{{ selectObj?.atomData?.ch_name }}</span> 元素</span>
          <span class="atom_en_name">{{ selectObj?.atomData?.en_name }}</span>
        </div>
        <div v-show="!(selectObj?.atomData)"> 分子组合</div>
      </template>
      <div class="container_body"  v-show=" selectObj?.atomData">
        <div class="describe_body">
          <div class="atom_ele_number">电子数：{{ selectObj?.atomData?.ele_number }}</div>
          <div class="atom_quality">原子质量：{{ selectObj?.atomData?.quality }}</div>
          <div class=""
               v-show="selectObj?.atomData?.notice">原子相关：{{selectObj?.atomData?.notice}}</div>
          <div v-show="selectObj?.atomData?.finder">发现者：{{selectObj?.atomData?.finder}}</div>
          <div v-show="selectObj?.atomData?.meltingPoint">熔点：{{selectObj?.atomData?.meltingPoint}}</div>
          <div v-show="selectObj?.atomData?.density">密度：{{selectObj?.atomData?.density}}</div>
          <div v-show="selectObj?.atomData?.valence">化合价：{{selectObj?.atomData?.valence}}</div>
          <div v-show="selectObj?.atomData?.location">位置：{{selectObj?.atomData?.location}}</div>
          <div v-show="selectObj?.atomData?.matterState">物态（常温）：{{selectObj?.atomData?.matterState}}</div>
          <div v-show="selectObj?.atomData?.IonicCharge">离子电荷量：{{selectObj?.atomData?.IonicCharge}}</div>
        </div>
      </div>
      <div class="empty_state_div">
          <el-empty class="empty_state"  description="未选中"  v-show="!(selectObj?.atomData)"></el-empty>
      </div>
    </el-card>
    
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import rightChooseModule from "./Composition/MainComposition";
import popWindow from "/@/components/PopUpWindow/index.vue";

export default defineComponent({
	name: "",
  	components: { popWindow },
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

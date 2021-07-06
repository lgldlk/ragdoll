<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-05 13:49:55
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-06 10:37:09
-->
<template>
  <div class="right_menu">
    <div class="choose_menu">
      
    </div>
    <div class="tool_menu">
      <div class="tools_container">
        <el-collapse :accordion="true">
          <el-collapse-item title="工具箱">
            <div class="tool_options">
              <div class="tool_option"
                   v-for="(item,i) in toolsLIst"
                   :key="i">
                <div class="icon_con" v-html="item.image"></div>
                <div class="tool_title">{{item.title}}</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>

      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import rightToolModule from "./Composition/RightTools";
import { useStore } from "vuex";
import { log } from "util";
export default defineComponent({
	name: "",
	setup() {
		const store = useStore(),
			rightTool = rightToolModule(store);
		return {
			...rightTool,
		};
	},
});
</script>
<style scoped lang="scss">
@import "./RightMenu.scss";
</style>

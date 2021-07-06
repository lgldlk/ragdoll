<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-05 13:49:55
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-06 16:18:47
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
                   :key="i"
                   @click="item.clickFunc(item)">
                <div class="icon_con"
                     v-html="item.image.value||item.image"></div>
                <div class="tool_title">{{item.title.value||item.title}}</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>

      </div>
    </div>
    <popWindow v-if="showAtomChooseWindow"
               windowTitle="原子选择"
               @forkClick="closeAtomChooseWindow">
      <div>
        <el-select v-model="chooseAtomEnName"
                   placeholder="请选择要添加的原子">
          <el-option v-for="item in atomArray"
                     :key="item.ch_name"
                     :label="item.ch_name"
                     :value="item.en_name">
          </el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="popWindow_footer">
          <el-button size="mini"
                     :round="true"
                     @click="closeAtomChooseWindow">取 消</el-button>
          <el-button size="mini"
                     type="primary"
                     round="round"
                     @click="affirmChooseAtom">确 定</el-button>
        </span>
      </template>
    </popWindow>

  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import rightToolModule from "./Composition/RightTools";
import { useStore } from "vuex";
import popWindow from "/@/components/popUpWindows/index.vue";
import { log } from "util";
export default defineComponent({
	name: "",
	components: { popWindow },
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

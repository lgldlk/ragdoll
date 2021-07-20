<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-19 16:12:47
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 18:06:41
-->
<template>
<div class="right_menu ">

   
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
    <div class="choose_menu">
      <chooseMenu></chooseMenu>
    </div>
    <popWindow v-if="sceneBackgroundVis"
               windowTitle="更换背景"
               @forkClick="closeSceneBackground">
      <div>
        <el-select v-model="chooseSceneBackground"
                   placeholder="请选择要更换的背景">
          <el-option v-for="item in allSceneBackground"
                     :key="item.fileName"
                     :label="item.name"
                     :value="item.fileName">
          </el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="popWindow_footer">
          <el-button size="mini"
                     :round="true"
                     @click="closeSceneBackground">取 消</el-button>
          <el-button size="mini"
                     type="primary"
                     round="round"
                     @click="affirmChooseSceneBackground">确 定</el-button>
        </span>
      </template>
    </popWindow>
    <popWindow v-if="showAtomChooseWindow"
               windowTitle="分子选择"
               @forkClick="closeAtomChooseWindow">
      <div>
        <el-select v-model="chooseAtomEnName"
                   placeholder="请选择要添加的分子">
          <el-option v-for="item in moleculeArray"
                     :key="item.expression"
                     :label="item.name"
                     :value="item.expression">
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
<script lang='ts'>
import { defineComponent } from 'vue'
import rightToolModule from './Composition/RightTool'
import popWindow from "/@/components/PopUpWindow/index.vue";
import chooseMenu from '../RightChooseMenu/index.vue'
import { useStore } from "vuex";
export default defineComponent({
   name: '',
   	components: { popWindow ,chooseMenu},
   setup() {
     		const store = useStore(),
			rightTool = rightToolModule(store);
		return {
			...rightTool,
		};
 }
})
</script>
<style scoped lang="scss">
@import './RightMenu.scss';
</style>
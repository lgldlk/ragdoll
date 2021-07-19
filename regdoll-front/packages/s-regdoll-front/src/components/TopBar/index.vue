<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-19 09:08:02
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 09:57:22
-->
<template>
  <div class="topBar">
    <div class="bar-left"></div>
    <div class="bar-right">
      <el-menu class="topBar-menu"  :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">作业</el-menu-item>
        <el-menu-item index="3">个人中心</el-menu-item>
      </el-menu>

   <el-popover
  placement="top"
  :width="160"
  v-model:visible="userPopVisible"
>
  <p>您好{{userTrueName}}！您需要一些网站使用指导吗</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" >取消</el-button>
    <el-button type="primary" size="mini" >确定</el-button>
  </div>
  <template #reference>
    <div  class="userInfo">
             <el-avatar size="medium" :src="imgUrl"></el-avatar>
        <div class="userName">{{userTrueName}}</div>
    </div>
  </template>
</el-popover>
      
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { topBarModule } from "./topBar";
import {useStore} from 'vuex'
export default defineComponent({
  name: "",
  setup() {
    const store=useStore()
    return {
      ...topBarModule(store),
    };
  },
});
</script>
<style scoped lang="scss">
@import "./topBar.scss";
</style>

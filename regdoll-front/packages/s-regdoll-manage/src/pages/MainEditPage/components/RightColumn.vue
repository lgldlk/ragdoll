<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-03 21:05:22
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-07 20:15:27
-->
<template>
  <div class="rightMenu">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first"
        >用户管理
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
        <div>用户管理</div>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    let activeName = "first",
      handleClick = (tab: any, event: any) => {
        console.log(tab, event);
      };
    return {
      activeName,
      handleClick,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./css/RightColumn.scss";
</style>

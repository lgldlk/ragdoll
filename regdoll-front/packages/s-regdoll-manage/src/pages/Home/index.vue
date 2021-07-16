<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-14 20:14:05
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-14 21:24:26
-->
<template>
<div class="wrapper"> 
  <regSideBar></regSideBar>
  <div class="content_box">
    <div class="content">
      <router-view></router-view>
      <el-backtop target=".content"></el-backtop>
      </div>
  </div>
</div>
</template>
<script lang='ts'>
import regSideBar from '/@/components/SideBar/index.vue';
import { defineComponent } from 'vue'
export default defineComponent({
  components:{
    regSideBar
  },
   setup() {
 }
})
</script>
<style scoped lang="scss">
.wrapper {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .content_box{
          position: absolute;
    left: 250px;
    right: 0;
    top: 0;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
    
.content {
    width: auto;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    box-sizing: border-box;
}
    }
}


</style>
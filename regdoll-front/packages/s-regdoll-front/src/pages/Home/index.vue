<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-19 08:47:35
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 10:25:46
-->
<template>
<div>
  <topBar></topBar>
  <robot class="robot"></robot>
  <div class="main-home">
    
  </div>
</div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import topBar from '/@/components/TopBar/index.vue'
import robot from '/@/components/Robot/index.vue'
export default defineComponent({
   name: '',
   components:{
     topBar,
     robot
   },
   setup() {
 }
})
</script>
<style scoped lang="scss">
@import './home.scss'
</style>
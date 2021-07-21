<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-20 22:12:18
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 16:42:20
-->
<template>
<div class="chemicalPage">
  <backHeader title=""></backHeader>
  <div id="chemicalShowScene"></div>
  <div class="chemicalShowBody">
   
      <div  v-if="!hasReacted && !inReaction" class=" reactionBody">
        <el-button class=" reactionButton"  @click="reactionClick"> 
          进行反应
        </el-button>
      
    </div>
    <div class=" reactionCon"  v-show="inReaction ">反应条件：{{nowChemicalShow.reactionType==""?"无":nowChemicalShow.reactionType}}</div>
    <div v-show="hasReacted && !inReaction">
<div class="reactionOver">
  <div class="reactionOverBody">
    反映完成
  <div class="reactionPhenomena">

    <div class="body-title">
      反应现象
    </div>
  </div>

  <div class="reactionContent">

      <div class="body-title">
      反应内容
    </div>
  </div>
  </div>
   </div>
    </div>
  </div>
</div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import {showChemical} from './showChemical'
import backHeader from '/@/components/BackHeader/index.vue'
export default defineComponent({
   name: '',   components:{
     backHeader
   },
   setup() {
     return {
       ...showChemical()
     }
 }
})
</script>
<style scoped lang="scss">
@import './Chemical.scss'
</style>
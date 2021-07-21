<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-21 07:54:55
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 09:25:04
-->
<template>
<div class="coverr">
  
         <div class="coverr-video">
      <img src="/LoginBackground/thumbnail.jpg" alt="" />
      <video
        autoplay
        loop
        muted
        src="/LoginBackground/Science experiment.mp4"
        type="video/mp4"
      >
        <!-- <source> -->
        <!-- <source src="[WEBM URL]" type="video/webm"> -->
        <!-- Non-HTML5 browsers will just show the image, no need for a fallback text -->
      </video>
    </div> 
       <backHeader title="化学方程式总表"></backHeader>
     <div class="showChemicalBg">
       <div class="showChemicalBody">
       <div class="chemicals">
         <div v-for="(item,i) in showChemical"  class="aChemicals" @click="goToChemicalDetail(item)" :key="i">
           <div class="">{{item.left}}</div>
           <div class="chemicalCenter">
             <div class="chemicalReactionCondition">{{item.reactionCondition}}</div>
             <div>=</div>
             </div>
           <div class="">{{item.right}}</div>
 
             <svg t="1626830327249" class="intoButton" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M256.090051 0l-0.025583 191.941544 307.119773 319.918263L256.063445 831.742255l0.025583 191.929264 511.845481-511.859807L256.090051 0z" p-id="3675" fill="#00ffff"></path></svg>

         </div>
          </div>
     </div>
     </div>
</div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import topBar from "/@/components/TopBar/index.vue";
import backHeader from '/@/components/BackHeader/index.vue'
import {allChemicalShows} from './AllChemicalShow'
export default defineComponent({
   name: '',
   components:{
     backHeader
   },
   setup() {
     return {
       ...allChemicalShows()
     }
 }
})
</script>
<style scoped lang="scss">
@import './AllChemicalShow.scss'


</style>
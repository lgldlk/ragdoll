<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-21 08:00:05
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 09:06:38
-->
<template>
  <div class="backHeader">
    <div class="backButton" @click="goBack">
      <svg
        t="1626825757651"
        class="backIcon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2818"
      >
        <path
          d="M766.862 1021.724c-10.24 0-20.594-3.64-28.444-10.922L228.693 538.396c-15.701-14.563-15.701-38.229 0-52.792L738.418 13.198c15.701-14.563 41.187-14.563 56.889 0 15.701 14.564 15.701 38.23 0 52.793L314.027 512l481.28 446.009c15.701 14.563 15.701 38.23 0 52.793-7.851 7.282-18.205 10.922-28.445 10.922z"
          p-id="2819"
          fill="#BFE9E9"
        ></path>
      </svg>
    </div>
    <p class="centerTitle" :title="title">{{title}}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {useRouter} from 'vue-router'
export default defineComponent({
  name: "",
  props: {
    title: String,
  },
  setup(props) {
    const router=useRouter()
    ,goBack=()=>{
    router.go(-1)
    }
return {
  goBack,
  title:props.title
}
  },
});
</script>
<style scoped>
.backHeader {
  @apply flex;
     justify-content:center;
  align-items:center;
  @apply shadow-lg;
    @apply relative;
  z-index:3;
  background-color: rgb(0, 35, 35);
  border-bottom: 1px solid #ebeef5;
 height: 61px;--tw-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
 .backButton{
   display:flex;
   justify-content:center;
  align-items:center;
  margin-left:20px;
      cursor: pointer;
      @apply absolute;
      left:20px;
      top:50%;
    transform: translateY(-50%);
 }
 .centerTitle{
   @apply text-3xl;
       color: cyan;
 }
 .backIcon{
   width:35px;
 }
</style>

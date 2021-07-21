<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-06 11:20:07
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 20:28:24
-->
<template>
  <div class="loading_bg">
    <div class="loading_window">
      <div class="spinner">
        <div class="cube1"></div>
        <div class="cube2"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "",
  setup() {},
});
</script>
<style scoped lang="scss">
.loading_bg {
  @apply absolute;
  @apply inset-0;
  @apply bg-opacity-30;
  @include useOpacityAni;
  background: rgba(#000, 0.75);
  z-index: 99999;
  .loading_window {
    @apply absolute;
    @apply transform;
    @apply scale-150;
    top: 30%;
    left: 50%;
    transform: transform(-50%, -50%);
    .spinner {
      width: 32px;
      height: 32px;
      position: relative;
    }
    .cube1,
    .cube2 {
      background-color: #bff1f1;
      box-shadow: 0px 0px 10px rgb(0, 255, 255, 75%);
      border: 1px solid rgba(127, 255, 255, 0.75);
      width: 30px;
      height: 30px;
      position: absolute;
      top: 0;
      left: 0;
      -webkit-animation: cubemove 1.8s infinite ease-in-out;
      animation: cubemove 1.8s infinite ease-in-out;
    }
    .cube2 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }

    @-webkit-keyframes cubemove {
      25% {
        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
      }
      50% {
        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
      }
      75% {
        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
      }
      100% {
        -webkit-transform: rotate(-360deg);
      }
    }

    @keyframes cubemove {
      25% {
        transform: translateX(42px) rotate(-90deg) scale(0.5);
        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
      }
      50% {
        transform: translateX(42px) translateY(42px) rotate(-179deg);
        -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
      }
      50.1% {
        transform: translateX(42px) translateY(42px) rotate(-180deg);
        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
      }
      75% {
        transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
      }
      100% {
        transform: rotate(-360deg);
        -webkit-transform: rotate(-360deg);
      }
    }
  }
}
.choose_menu {
  .choose_menu_container {
    .container_header {
      .atom_ch_name {
        font-size: large;
        .button {
        }
      }
      .container_body {
        .text {
        }
        .item {
        }
      }
    }
  }
  &:deep(.el-card.box-card) {
    @apply rounded-md;
    border-left: none;
    border-right: none;
  }
}
</style>

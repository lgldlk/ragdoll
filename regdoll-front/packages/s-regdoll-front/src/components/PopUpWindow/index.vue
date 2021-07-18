<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-29 21:05:26
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-17 14:39:57
-->
<template>
  <teleport to="body">
    <div class="pop-bg" @click="bgClick">
      <div class="center-slot" @click.stop="">
        <div class="slot-header">
          <div class="header-title">{{ windowTitle }}</div>
          <svg
            t="1622298296948"
            class="forkIcon"
            viewBox="0 0 1024 1024"
            @click.stop="forkClick"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M77.550933 29.2864l917.162667 917.162667-48.264533 48.264533L29.2864 77.550933z"
              fill="#C0C4CC"
            ></path>
            <path
              d="M946.449067 29.2864L29.2864 946.449067l48.264533 48.264533 917.162667-917.162667z"
              fill="#C0C4CC"
            ></path>
          </svg>
        </div>
        <slot> </slot>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "",
  props: {
    windowTitle: String,
  },
  emits: ["bgClick", "forkClick"],
  setup(props, ctx) {
    const bgClick = () => {
      ctx.emit("bgClick");
    };
    const forkClick = () => {
      ctx.emit("forkClick");
    };
    const windowTitle = props.windowTitle;
    return { bgClick, windowTitle, forkClick };
  },
});
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>

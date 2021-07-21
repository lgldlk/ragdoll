<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-19 08:47:35
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 07:57:59
-->
<template>
  <div>
    <topBar></topBar>
    <robot class="robot"></robot>

    <div class="main-home">
      <iframe
        src="./molecule.html"
        frameborder="0"
        scrolling="no"
        width="100%"
        height="100%"
        class="home-Bg"
      ></iframe>
      <div class="home-body">
        <div class="regdoll-modules">
          <div class="regdoll-module" data-aos="fade-right">
            <div class="main-module">
              <div class="module-header" @click="moduleClick(0)">
                <img
                  class="header-img"
                  src="/images/homeModule/css3d_periodictable.jpg"
                />
              </div>
              <div class="module-footer" @click.stop>
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item title="元素周期表查看" name="1">
                    <div>
                      与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                    </div>
                    <div>
                      在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                    </div>
                    <div class="into_button">
                      <el-button @click="moduleClick(0)">进入</el-button>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>

          <div class="regdoll-module" data-aos="fade-up">
            <div class="main-module">
              <div class="module-header" @click="moduleClick(1)">
                <img class="header-img" src="/images/homeModule/atomDetail.png" />
              </div>
              <div class="module-footer">
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item title="原子查看" name="1" @click.stop>
                    <div>
                      与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                    </div>
                    <div>
                      在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                    </div>
                    <div class="into_button">
                      <el-button @click="moduleClick(1)">进入</el-button>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>

          <div class="regdoll-module" data-aos="fade-right">
            <div class="main-module">
              <div class="module-header">
                <img
                  class="header-img"
                  src="/images/homeModule/css3d_periodictable.jpg"
                />
              </div>
              <div class="module-footer">
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item title="元素周期表查看" name="1">
                    <div>
                      与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                    </div>
                    <div>
                      在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>

          <div class="regdoll-module" data-aos="fade-right">
            <div class="main-module">
              <div class="module-header">
                <img
                  class="header-img"
                  src="/images/homeModule/css3d_periodictable.jpg"
                />
              </div>
              <div class="module-footer">
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item title="元素周期表查看" name="1">
                    <div>
                      与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                    </div>
                    <div>
                      在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>

          <div class="regdoll-module" data-aos="fade-right">
            <div class="main-module">
              <div class="module-header">
                <img
                  class="header-img"
                  src="/images/homeModule/css3d_periodictable.jpg"
                />
              </div>
              <div class="module-footer">
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item title="元素周期表查看" name="1">
                    <div>
                      与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                    </div>
                    <div>
                      在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>

          <div class="regdoll-module" data-aos="fade-right">
            <div class="main-module">
              <div class="module-header">
                <img
                  class="header-img"
                  src="/images/homeModule/css3d_periodictable.jpg"
                />
              </div>
              <div class="module-footer">
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item title="元素周期表查看" name="1">
                    <div>
                      与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                    </div>
                    <div>
                      在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import topBar from "/@/components/TopBar/index.vue";
import { homeModule } from "./HomeModule";
import robot from "/@/components/Robot/index.vue";
import { Router, useRouter } from "vue-router";
export default defineComponent({
  name: "",
  components: {
    topBar,
    robot,
  },
  setup() {
    const router = useRouter();
    return {
      ...homeModule(router),
    };
  },
});
</script>
<style scoped lang="scss">
@import "./home.scss";
</style>

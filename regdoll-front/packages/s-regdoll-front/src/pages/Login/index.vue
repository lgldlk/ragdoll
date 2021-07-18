<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-18 16:36:53
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-18 21:52:14
-->
<template>
  <div class="coverr">
    <!-- The box you want the video as a background for: just add the "coverr" class -->
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
    <div class="ms-login"   data-aos="fade-up">
      <div class="ms-title">登录——小布偶</div>
      <el-form ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="username" placeholder="用户名">
            <template #prefix>
              <i class="el-input__icon el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="password"
            @keyup.enter.native="submitForm()"
          >
            <template #prefix>
              <i class="el-input__icon el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips"></p>
      </el-form>
    </div>
    <!-- The box content -->
    <!--      .....      -->
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AOS from 'aos';
export default defineComponent({
  name: "",
  setup() {
    onMounted(() => {
      //        const  coverrUpdate = function() {
      //   var coverrs = document.getElementsByClassName("coverr-video");
      //   for (var i = 0; i < coverrs.length; i++) { var coverr = coverrs[i], coverrWrapper = coverr.parentElement;
      //     if (coverrWrapper.offsetWidth / coverrWrapper.offsetHeight < 16/9)
      //       coverr.style.width = (coverrWrapper.offsetHeight * (16/9)) + "px";
      //     else coverr.style.width = null;
      //     coverr.getElementsByTagName("video")[0].style.display = "block";
      //   }
      // }
      // window.addEventListener("resize", coverrUpdate);
      // window.addEventListener("load", coverrUpdate);
      // coverrUpdate()
      AOS.init();
    });
    const username = ref(""),
      password = ref(""),
      submitForm=()=>{

      }
    return {
      username,
      password,
      submitForm
    };
  },
});
</script>
<style scoped lang="scss">
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 10px;
  background: rgba(0, 35, 35,0.5);

  border:solid 2px rgb(192, 196, 204);
  overflow: hidden;
  &:deep(input:-internal-autofill-selected ){
    background-color:rgb(0, 35, 35) !important;
  }
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
/* .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
} */
.coverr {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.coverr > *:not(.coverr-video) {
  z-index: 1;
}
.coverr > .coverr-video,
.coverr > .coverr-video img,
.coverr > .coverr-video video,
.coverr > .coverr-video:after {
  top: 0;
  left: 0;
  position: absolute;
  width: 100vw;
  min-height: 100vh;
}
.coverr > .coverr-video img,
.coverr > .coverr-video video,
.coverr > .coverr-video:after {
  height: 100%;
}
/* .coverr>.coverr-video video {
  display: none;
} */
.coverr > .coverr-video:after {
  content: "";
  display: block;
  background: rgba(0, 0, 0, 0.1);
}
.coverr > .coverr-video:before {
  content: "";
  display: block;
  padding-bottom: 56.25%;
}
</style>

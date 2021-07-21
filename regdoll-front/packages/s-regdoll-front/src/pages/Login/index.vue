<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-18 16:36:53
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 08:46:57
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
        <el-form-item >
          <el-input v-model="account" placeholder="用户名">
            <template #prefix>
              <i class="el-input__icon el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item >
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
        <div class="login-tips">
            <el-link type="primary">找回密码>></el-link>
        </div>
      </el-form>
    </div>
    <!-- The box content -->
    <!--      .....      -->
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
// @ts-igrnore
import AOS from 'aos';
import {UserRequest} from '/@/api/UserRequest';
import {LocalStorage} from '/@/util/LocalStorage' ;
import { useStore } from "vuex";
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "",
  setup() {
    const account = ref(""),
      password = ref(""),
       store = useStore(),
        router = useRouter(),
      submitForm=async ()=>{
        let loginRes=await UserRequest.login(account.value,password.value)
        console.log(loginRes)
        if(loginRes.code=="200"&&loginRes.data.length>0){
          ElMessage({type:"success",message:"登录成功"})
          delete loginRes.data[0].password;
          store.commit("user/set_user",loginRes.data[0]);
          LocalStorage.setLocalStoreByBase64("token",loginRes.data[0])
            router.push({
          path:"home"
        })
        }else{
          ElMessage({type:"error",message:"登录失败"})
        }
      }
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
      console.log(store.getters["user/hasUser"]);
      
      if(store.getters["user/hasUser"]){
        router.push({
          path:"home"
        })
      }
    });
    return {
      account,
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
.login-tips{
  margin-top:4px;
  display:flex;
    justify-content: flex-end;
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

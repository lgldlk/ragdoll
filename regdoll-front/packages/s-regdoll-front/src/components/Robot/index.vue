<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-19 10:04:12
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 10:36:42
-->
<template>
  <div >
    <div class="showRobot" @click="switchRobot()">
      <div class="for-hide">
        <svg t="1626661888927" class="roboticon" viewBox="0 0 1024 1024" version="1.1"
         xmlns="http://www.w3.org/2000/svg" p-id="1970" >
         <path 
         d="M919.43822222 569.344v-29.01333333c2.27555555-132.55111111-36.63644445-244.05333333-113.32266667-323.12888889-36.63644445-37.77422222-80.78222222-66.21866667-131.98222222-86.016-8.192-71.45244445-84.87822222-127.88622222-178.40355555-127.88622223-93.52533333 0-170.89422222 56.32-178.40355556 127.88622223-51.2 19.79733333-95.34577778 48.24177778-131.98222222 86.016-76.68622222 79.07555555-115.712 190.00888889-113.32266667 322.56v35.49866667c-19.79733333 20.36622222-35.49866667 50.51733333-23.77955555 93.52533333 8.76088889 31.97155555 31.97155555 55.18222222 60.416 65.64977777 14.56355555 9.32977778 31.40266667 14.56355555 49.94844444 14.56355556 36.63644445 160.42666667 168.50488889 269.65333333 341.21955556 269.65333334 172.60088889 0 304.58311111-109.22666667 341.21955555-270.22222223 1.13777778 0 2.27555555 0.56888889 3.52711112 0.56888889 22.64177778 0 43.57688889-8.192 60.416-21.504 21.504-12.17422222 38.34311111-33.10933333 45.28355555-59.27822222 12.17422222-46.64888889-8.192-78.62044445-30.83377778-98.87288889z m-101.14844444 87.72266667c0 21.504-1.70666667 41.87022222-4.66488889 61.55377778-56.32 90.68088889-149.39022222 149.95911111-264.98844444 162.70222222-8.76088889-11.60533333-26.16888889-19.22844445-46.53511112-19.22844445-29.01333333 0-52.33777778 15.70133333-52.33777778 35.49866667 0 19.22844445 23.21066667 35.49866667 52.33777778 35.49866666 26.16888889 0 47.104-12.74311111 51.76888889-29.696 37.20533333-4.096 72.704-13.312 106.38222223-26.73777777 47.67288889-19.22844445 89.54311111-47.67288889 124.928-83.74044445 5.80266667-5.80266667 11.03644445-11.60533333 16.27022222-17.97688888-41.87022222 128.56888889-154.05511111 211.05777778-299.91822222 211.05777777h-1.13777778c-187.73333333 0-318.464-135.39555555-318.464-328.93155555l-0.56888889-18.54577778c0-8.192 1.13777778-30.26488889 2.27555555-51.2 77.93777778-28.44444445 148.25244445-137.216 176.69688889-187.16444444 26.16888889 35.49866667 86.016 103.99288889 177.83466667 139.49155555 34.24711111 13.312 69.17688889 20.36622222 103.424 27.87555555 68.03911111 14.56355555 132.55111111 28.44444445 176.128 85.44711112l1.70666666 1.70666666-1.13777777 2.38933334z m0 0" fill="#ffffff" p-id="1971"></path></svg>
      </div>
    </div>

    <transition name="el-zoom-in-top">
      <div class="robot-speak" id="Robotbox" v-show="speakShow">
        <div class=" robot-head" id="RobotboxTitle">
          <span>智能客服</span>
          <el-button
            type="text"
            icon="el-icon-close"
            circle
            @click="switchRobot()"
          ></el-button>
        </div>

        <div class="speak-x" id="speakX">
          <div v-for="(item, i) in allList" :key="'speak' + i" class="wordList">
            <div :class="[item.isUser ? 'user-x' : 'robot-x']">
              <div :class="[item.isUser ? 'user-word' : 'robot-word']">
                {{ item.data }}
              </div>
            </div>
          </div>
        </div>
        <div class="input-robot">
          <el-input
            class="input-text"
            type="textarea"
            :rows="3"
            :autosize="{ minRows: 3, maxRows: 3 }"
            resize="none"
            placeholder="请输入内容"
            v-model="userWord"
          >
          </el-input>
          <div class="input-go">
            <el-button type="primary" @click="goSpeak">发送</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { toRobot } from '/@/api/UserRequest'

export default {
  data() {
    return {
      allList: [
        {
          data: '你好我是若颖天气后台管理系统的智能客服,\n欢迎你咨询我任何问题',
          isUser: false
        }
      ],
      userList: [],
      robotList: [],
      userWord: '',

      speakShow: false
    }
  },
  methods: {
    async speakToRobot(word) {
      return await toRobot(word)
    },
    initList() {},
    switchRobot() {
      this.speakShow = !this.speakShow
    },
    async goSpeak() {
      if (this.userWord == '') {
        this.$message({
          type: 'error',
          message: `输入不能为空`
        })
        return
      }
      let result = await this.speakToRobot(this.userWord)

      this.$nextTick(() => {
        this.allList.push({
          data: this.userWord,
          isUser: true
        })
        this.userWord = ''
        if (result.desc == 'success') {
          this.allList.push({
            data: result.data[0].intent.answer.text,
            isUser: false
          })
        } else {
          this.$message({
            type: 'error',
            message: `笨蛋机器人出错了`
          })
        }
      })
      this.$nextTick(() => {
        setTimeout(() => {
          let main = document.getElementById('speakX') //滚动的DOM，一般是父级
          let wordList = document.getElementsByClassName('wordList')
          let lastWord = wordList[wordList.length - 1]
          // let content = document.getElementById(id2); //子级
          //main.scrollTop =  main.clientHeight;
          main.scrollTo(0, main.scrollHeight)
        })
      })
    }
  },

  async mounted() {
    //console.log( await toRobot("百科杨树"));
  }
}
</script>

<style scoped>

.showRobot {
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  	--tw-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.for-hide {
  overflow: hidden;
}

.roboticon {
  width: 2.5rem;
  height: 2.5rem;
  fill: #fff;
}
.robot-speak {
  position: fixed;
  width: 30vw;
  height: 53vh;

  top: 60%;
  border-radius: 10px;
  right: 20%;
  transform: translate(50%, -50%);
  z-index: 100;
  background-color: rgb(0, 35, 35);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.robot-head {
  display: flex;
  align-items: baseline;
  padding-left: 2em;
  padding-top:0.2em;
  padding-right: 1em;
  box-sizing: border-box;
  border-bottom: #ccc 1px solid;
  color:#fff;

  font-size: 15px;
  height: 5vh;
  justify-content: space-between;
}
.speak-x {
  height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 15px;
  position: relative;
  padding: 0 10px;
}
.robot-x {
}
.robot-word {
      background-color: cyan;
    border-color: cyan;
    box-shadow: -1px 0 0 0 cyan;
  padding: 10px;
 color: #002323;
  text-align: left;
  border-radius: 10px;
  margin: 10px;
  display: inline-block;
  position: relative;
  max-width: 80%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.robot-word::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid;
  border-color: transparent;
  border-right-color: cyan;
  top: 50%;
  right: 100%;
  margin-top: -9px;
}
.user-x {
  text-align: right;
}
.user-word {
  background: #fff;
  padding: 10px;
  color: #000;
  text-align: left;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 10px;
  display: inline-block;
  position: relative;
  max-width: 80%;
}
.user-word::before {
  content: '';

  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid;
  border-color: transparent;
  border-left-color: #fff;
  top: 50%;
  left: 100%;
  margin-top: -9px;
}
.input-robot {
  border-top: 2px solid #dcdfe6;
  height: 15vh;
  padding-bottom: 10px;
  overflow: hidden;
}
.input-text {
  max-height: 11vh;
}
.input-go {
  max-height: 4vh;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  margin-right: 5px;
  z-index: 99;
  margin-top:9px;
}
.el-button {
  padding: calc((4vh - 16.8px) / 2);
}
</style>
<style>
.input-robot .el-textarea__inner {
  border: 0px !important;
  /* border-top: 1px solid #DCDFE6; */
}
</style>

/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-04 20:21:16
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-18 21:47:20
 */
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-04 20:21:16
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-03 19:51:27
 */
import { createApp } from "vue";

import App from "./App.vue";
import './assets/css/aos.css'
import router from "./router";
import "./assets/css/theme/index.css";
import ElementPlus from "element-plus";
import store from "./store/index";
import { AtomRequest } from './api/AtomRequest'
const app = createApp(App as any);
app.use(router).use(ElementPlus).use(store).mount("#app");


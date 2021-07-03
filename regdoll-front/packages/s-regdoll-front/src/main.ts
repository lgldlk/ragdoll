/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-04 20:21:16
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-06 22:41:50
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

import router from "./router";
import "./assets/css/theme/index.css";
import ElementPlus from "element-plus";
import store from "./store/index";
const app = createApp(App as any);
app.use(router).use(ElementPlus).use(store).mount("#app");

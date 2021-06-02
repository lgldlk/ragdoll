/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-04 20:21:16
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-02 21:10:15
 */
import { createApp } from "vue";

import App from "./App.vue";

import router from "./router";
import ElementPlus from "element-plus";

const app = createApp(App as any);
app.use(router).use(ElementPlus).mount("#app");

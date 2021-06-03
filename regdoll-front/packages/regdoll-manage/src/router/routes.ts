/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-03 19:00:44
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-03 21:49:04
 */
import { RouteRecordRaw } from "vue-router";
import { ComponentOptionsBase } from "vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/editPage" },
  {
    path: "/editPage",
    name: "editPage",
    component: () => import("/@/pages/MainEditPage/EditPage.vue"),
  },
];
export default routes;

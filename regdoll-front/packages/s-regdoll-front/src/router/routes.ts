/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-03 19:00:44
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-04 16:39:02
 */
import { RouteRecordRaw } from "vue-router";
import { ComponentOptionsBase } from "vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/showAtoms" },
  {
    path: "/editPage",
    name: "editPage",
    component: () => import("/@/pages/MainEditPage/EditPage.vue"),
  },
  {
    path: "/showAtoms",
    name: "showAtoms",
    component: () => import("/@/pages/AtomShowPage/index.vue"),
  },
  {
    path: "/atomDetail",
    name: "atomDetail",
    component: () => import("/@/pages/AtomDetail/index.vue"),
  },
];
export default routes;

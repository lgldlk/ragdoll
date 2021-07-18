/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-03 19:00:44
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-18 17:07:59
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
    path: "/atomInside",
    name: "atomInside",
    component: () => import("/@/pages/AtomInside/index.vue")
  },
  {
    path: "/atomDetail",
    name: "atomDetail",
    component: () => import("/@/pages/AtomDetail/index.vue"),
  },
  {
    path: "/atomSynthesis",
    name: "atomSynthesis",
    component: () => import("/@/pages/AtomSynthesis/index.vue")
  },
  {
    path: "/moleculeShow",
    name: "moleculeShow",
    component: () => import("/@/pages/MoleculeShow/index.vue")
  }, {
    path: "/login",
    name: "login",
    component: () => import("/@/pages/Login/index.vue")
  }
];
export default routes;

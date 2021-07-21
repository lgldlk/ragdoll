/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-03 19:00:44
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 22:25:47
 */
import { RouteRecordRaw } from "vue-router";
import { ComponentOptionsBase } from "vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/home" },
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
    path: "/chemicalReactionShow"
    , name: "chemicalReactionShow",
    component: () => import("/@/pages/ChemicalReactionShow/index.vue")

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
    path: "/moleculeDetail",
    name: "moleculeDetail",
    component: () => import("/@/pages/MoleculeDetail/index.vue")
  }, {
    path: "/login",
    name: "login",
    component: () => import("/@/pages/Login/index.vue")
  }, {
    path: "/allChemicalShow",
    name: "allChemicalShow",
    component: () => import("/@/pages/AllChemicalShow/index.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("/@/pages/Home/index.vue")
  }
];
export default routes;

import { BaseUrl } from './../config/RequestConfig';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-03 19:00:44
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 15:53:30
 */
import { RouteRecordRaw } from "vue-router";
import { ComponentOptionsBase } from "vue";

const routes: RouteRecordRaw[] = [

  { path: "/", redirect: "/baseHome" },
  {
    path: "/",
    component: () => import("/@/pages/Home/index.vue"),
    children: [{
      path: "baseHome",
      component: () => import("/@/pages/BaseHome/index.vue")
    }, {
      path: "allAtomSet",
      component: () => import("/@/pages/AllAtomSet/index.vue")
    }, {
      path: "chemicalReactionManage",
      component: () => import("/@/pages/ChemicalReactionManage/index.vue")
    },
    {
      path: "allMoleculeSet",
      component: () => import("/@/pages/AllMoleculeSet/index.vue")
    }]

  }, {
    path: "/login",
    component: () => import("/@/pages/Login/index.vue")
  },
  // {
  //   path: "/editPage",
  //   name: "editPage",
  //   component: () => import("/@/pages/MainEditPage/EditPage.vue"),
  // },
  {
    path: "/moleculeEditPage",
    name: "moleculeEditPage",
    component: () => import("/@/pages/MoleculeEditPage/index.vue")
  }
];
export default routes;

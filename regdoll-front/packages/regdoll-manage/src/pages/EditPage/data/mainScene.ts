import { ADD_OBJECT, INIT_REGDOLL_SCENE } from "./../../../store/Scene/mutation-types";
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-10 20:58:26
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-03 21:21:09
 */
import { regDollScene } from "../../../threeScene/RegDollScene";
import Atom from "/@/threeScene/Atom";
import * as THREE from "three";
import { Store, useStore } from "vuex";

export function initScene(store: Store<any>, renderDom: HTMLElement) {
  store.commit("scene/" + INIT_REGDOLL_SCENE, {
    renderDom: renderDom,
    showAxes: true,
    showGirdHelper: true,
  });
}

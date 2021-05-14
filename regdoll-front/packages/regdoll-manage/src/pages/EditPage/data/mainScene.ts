/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-10 20:58:26
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-12 21:51:40
 */
import { regDollScene } from '../../../threeScene/RegDollScene';
import Atom from '/@/threeScene/Atom';
import * as THREE from 'three';
const mainScene = 'Scene';
export function initScene(renderDom: HTMLElement) {
  let mainScene = new regDollScene(renderDom, true, true);
  mainScene.addObject(new Atom(1, 1, 'H', '氢'));
}

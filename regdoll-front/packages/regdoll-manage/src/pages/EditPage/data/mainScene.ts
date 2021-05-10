/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-10 20:58:26
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-10 20:58:28
 */
import { regDollScene } from '../../../threeScene/regDollScene';

const mainScene = 'Scene';
export function initScene(renderDom: HTMLElement) {
  new regDollScene(renderDom, true, true, true);
}

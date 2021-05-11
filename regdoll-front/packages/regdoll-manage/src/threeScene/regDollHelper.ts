import * as THREE from 'three';
import SceneConfig from '../config/SceneConfig';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-10 21:00:12
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-11 21:43:17
 */
/**
 * 获取帮助表格
 * @param size 设置大小
 * @param divisions 设置有几个格子
 * @returns  THREE.GridHelper实例
 */
export function getGridHelper(size: number, divisions: number): THREE.GridHelper {
  let gridHelp = new THREE.GridHelper(size, divisions);
  gridHelp.position.y = 0;
  gridHelp.material instanceof THREE.Material && (gridHelp.material.opacity = 0.25);
  gridHelp.material instanceof THREE.Material && (gridHelp.material.transparent = true);
  return gridHelp;
}

/**
 * 根据电子数获取电子分布数组
 * @param eleNum 电子数
 * @returns 电子数分布数组
 */
export function getTrackArr(eleNum: number): Array<number> {
  if (eleNum <= 2) {
    return [eleNum];
  } else if (eleNum <= 10) {
    return [2, (eleNum - 2) % 8];
  } else if (eleNum <= 18) {
    return [2, 8, (eleNum - 10) % 8];
  } else if (eleNum <= 36) {
    return [2, 8, 18, (eleNum - 28) % 8];
  } else if (eleNum <= 52) {
    return [2, 8, 18, 18, (eleNum - 44) % 8];
  } else if (eleNum <= 86) {
    return [2, 8, 18, 32, 18, (eleNum - 78) % 8];
  }
  return [];
}

export function getDefaultAmbientLight(): THREE.AmbientLight {
  const light = new THREE.AmbientLight(SceneConfig.lightColor, 0.8);
  return light;
}

export function getDefaultSpotLight(sceneLen: number): THREE.SpotLight {
  const light = new THREE.SpotLight(SceneConfig.lightColor, 1);
  light.position.set(0, sceneLen, sceneLen);
  light.lookAt(0, 0, 0);
  return light;
}

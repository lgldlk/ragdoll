import * as THREE from "three";
import SceneConfig from "../config/SceneConfig";
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-10 21:00:12
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 21:15:03
 */
/**
 * 获取帮助表格
 * @param size 设置大小
 * @param divisions 设置有几个格子
 * @returns  THREE.GridHelper实例
 */
export function getGridHelper(size: number, divisions: number, gridColor?: THREE.Color): THREE.GridHelper {
  let gridHelp = new THREE.GridHelper(size, divisions, undefined, gridColor);
  if (gridHelp.material instanceof THREE.Material) {
    gridHelp.material.opacity = 0.7;
    gridHelp.material.transparent = true;
  }
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
    return [2, (eleNum - 2)];
  } else if (eleNum <= 18) {
    return [2, 8, (eleNum - 10)];
  } else if (eleNum <= 28) {
    return [2, 8, (eleNum - 10)];
  } else if (eleNum <= 36) {
    return [2, 8, 18, (eleNum - 28)];
  } else if (eleNum <= 52) {
    return [2, 8, 18, 18, (eleNum - 44)];
  } else if (eleNum <= 86) {
    return [2, 8, 18, 32, 18, (eleNum - 78)];
  }
  return [];
}

export function getDefaultAmbientLight(): THREE.AmbientLight {
  const light = new THREE.AmbientLight(SceneConfig.lightColor, 1);
  return light;
}

export function getDefaultSpotLight(sceneLen: number): THREE.SpotLight {
  const light = new THREE.SpotLight(0xffffff, 1.5);
  light.position.set(0, 200, 1500);
  light.angle = Math.PI * 0.2;
  light.castShadow = true;
  light.shadow.camera.near = 200;
  light.shadow.camera.far = 2000;
  light.shadow.bias = -0.000222;
  light.shadow.mapSize.width = 1024;

  light.shadow.mapSize.height = 1024;
  return light
}

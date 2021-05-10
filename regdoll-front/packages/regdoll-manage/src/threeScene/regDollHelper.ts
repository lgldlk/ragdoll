import * as THREE from 'three';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-10 21:00:12
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-10 21:04:37
 */
export function getGridHelper(size: number, divisions: number) {
  let gridHelp = new THREE.GridHelper(size, divisions);
  gridHelp.position.y = 0;
  gridHelp.material instanceof THREE.Material && (gridHelp.material.opacity = 0.25);
  gridHelp.material instanceof THREE.Material && (gridHelp.material.transparent = true);
  return gridHelp;
}

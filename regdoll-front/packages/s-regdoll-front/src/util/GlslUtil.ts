import * as THREE from 'three';
import { shineGLSL } from '../assets/glsl/shine';

/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-05 10:25:29
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-05 12:59:03
 */
export function addShine(shineObject: THREE.Mesh) {

  const customMaterialAtmosphere = new THREE.ShaderMaterial(
    {
      uniforms:
      {
        "c": { type: "f", value: 0.37 } as any,
        "p": { type: "f", value: 6 } as any
      },
      vertexShader: shineGLSL.vertexShader,
      fragmentShader: shineGLSL.fragmentShader
    }),
    shineMesh = new THREE.Mesh(shineObject.geometry.clone(), customMaterialAtmosphere);
  shineMesh.scale.x = shineMesh.scale.y = shineMesh.scale.z = 1.2;
  shineMesh.material.side = THREE.BackSide;
  shineObject.add(shineMesh)
}
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-21 12:57:58
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 13:50:48
 */
import * as THREE from 'three'
import { CloudGLSL } from '../assets/glsl/cloud';
export const CloudModule = function () {
  let shapeGroup = new THREE.Object3D()
  let mesh = new THREE.Object3D();
  let mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      time: {
        type: "f",
        value: 0.1
      },
      pointscale: {
        type: "f",
        value: 0.2
      },
      decay: {
        type: "f",
        value: 0.8
      },
      size: {
        type: "f",
        value: 0.3
      },
      displace: {
        type: "f",
        value: 0.3
      },
      complex: {
        type: "f",
        value: 0.0
      },
      waves: {
        type: "f",
        value: 3.7
      },
      eqcolor: {
        type: "f",
        value: 3
      },
      rcolor: {
        type: "f",
        value: 1.1
      },
      gcolor: {
        type: "f",
        value: 0
      },
      bcolor: {
        type: "f",
        value: 1.7
      },
      fragment: {
        type: "i",
        value: true
      },
      redhell: {
        type: "i",
        value: true
      }
    },
    vertexShader: CloudGLSL.vertexShader,
    fragmentShader: CloudGLSL.fragmentShader
  } as any);
  //---
  // var wir_mat = new THREE.MeshBasicMaterial({
  //   color: Theme.darker
  // });
  var geo = new THREE.IcosahedronBufferGeometry(2, 6);
  var wir = new THREE.IcosahedronBufferGeometry(2.3, 2);
  let shape = new THREE.Mesh(geo, mat),
    point = new THREE.Points(wir, mat);
  //---
  shapeGroup.add(point);
  shapeGroup.add(shape);
  const start = Date.now();
  const renderFun = () => {
    (mat.uniforms['time'].value = (1 / 1000) * (Date.now() - start))
  }
  shapeGroup.scale.set(50, 50, 50)
  return { shapeGroup, renderFun }
}
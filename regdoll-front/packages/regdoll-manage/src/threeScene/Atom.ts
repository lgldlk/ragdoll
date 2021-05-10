/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:10
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-10 21:42:26
 */
import * as THREE from 'three';
import { Object3D } from 'three';
interface AtomTrack {
  radius: Number;
  eleNumber: Number;
}
export default class Atom extends Object3D {
  constructor(
    public quality: Number = 0,
    public electronicNumber: Number = 0,
    public tracks: Array<AtomTrack> = [],
  ) {
    super();
  }
}

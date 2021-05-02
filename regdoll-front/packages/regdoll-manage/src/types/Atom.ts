import * as THREE from 'three';
interface AtomTrack {
  radius: Number;
  eleNumber: Number;
}
export default class Atom {
  constructor(
    public quality: Number = 0,
    public electronicNumber: Number = 0,
    public tracks: Array<AtomTrack> = [],
  ) {}
}

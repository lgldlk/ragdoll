/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-13 22:01:42
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-13 22:03:07
 */
import { Object3D, Camera, MOUSE } from 'three';

declare class TransformControls extends Object3D {
  constructor(object: Camera, domElement?: HTMLElement);

  domElement: HTMLElement;

  // API

  camera: Camera;
  object: Object3D | undefined;
  enabled: boolean;
  axis: string | null;
  mode: string;
  translationSnap: number | null;
  rotationSnap: number | null;
  space: string;
  size: number;
  dragging: boolean;
  showX: boolean;
  showY: boolean;
  showZ: boolean;
  readonly isTransformControls: true;
  mouseButtons: {
    LEFT: MOUSE;
    MIDDLE: MOUSE;
    RIGHT: MOUSE;
  };

  attach(object: Object3D): this;
  detach(): this;
  getMode(): string;
  setMode(mode: string): void;
  setTranslationSnap(translationSnap: number | null): void;
  setRotationSnap(rotationSnap: number | null): void;
  setScaleSnap(scaleSnap: number | null): void;
  setSize(size: number): void;
  setSpace(space: string): void;
  dispose(): void;
}

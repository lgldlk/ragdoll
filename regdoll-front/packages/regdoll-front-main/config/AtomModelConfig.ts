interface DefaultSphereConfigType {
  widthSegments: Number; //默认宽段数
  heightSegments: Number; //默认高段数
}
interface DefaultTorusConfigType {
  tube: Number;
  radialSegments: Number;
  tubularSegments: Number; // 圆环的默认环段数
}
interface DefaultEleConfigType extends DefaultSphereConfigType {
  radius: Number;
}
export default class AtomModelConfig {
  static baseAtomRadius: Number = 1; //原子半径的基数
  static defaultSphere: DefaultSphereConfigType = {
    widthSegments: 32,
    heightSegments: 32,
  };
  static defaultTorus: DefaultTorusConfigType = {
    tube: 0.05,
    radialSegments: 18,
    tubularSegments: 134,
  };
  static defaultEleConfig: DefaultEleConfigType = {
    ...AtomModelConfig.defaultSphere,
    radius: 0.5,
  };
}

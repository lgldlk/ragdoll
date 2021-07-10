
/*
 * @Editors: lgldlk
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:10
 * @LastEditTime: 2021-07-10 16:49:43
 */
import * as THREE from "three";
import { AtomModelConfig } from "/@/config/AtomModelConfig";
import { RegDollSceneObject3D } from '../RegDollSceneObject3D';
import { getTrackArr } from "../RegDollHelper";
import { addShine } from '/@/util/GlslUtil';
export default class AtomModel extends RegDollSceneObject3D {
  nucleus!: THREE.Mesh; //原子核
  electronics: Array<THREE.Object3D>;
  drawingCanvas!: HTMLCanvasElement;
  drawingContext!: CanvasRenderingContext2D;
  nucleusWidth!: number;
  constructor(
    public atomData: AtomVO
  ) {
    super();
    this.electronics = [];
    this.nucleusWidth =
      AtomModelConfig.defaultNucleusConfig.baseAtomRadius +
      AtomModelConfig.defaultNucleusConfig.baseRadius * this.atomData.quality;
    this.initNucleus()
    this.initEleOrbit();
  }

  initNucleus(): THREE.Object3D {
    const geometry = new THREE.SphereGeometry(
      this.nucleusWidth,
      AtomModelConfig.defaultSphere.widthSegments,
      AtomModelConfig.defaultSphere.heightSegments,
    );
    const material = new THREE.MeshPhongMaterial({
      color: AtomModelConfig.defaultNucleusConfig.color,
      shininess: AtomModelConfig.defaultNucleusConfig.shininess,
      side: THREE.DoubleSide,
      dithering: true,
      specular: 0xffffff,
    });
    material.map = this.getTextCanvas(
      this.atomData.en_name,
      AtomModelConfig.defaultNucleusConfig.color,
      this.nucleusWidth * 480,
    );

    const nucleus = new THREE.Mesh(geometry, material);
    nucleus.rotateZ(Math.PI / 2);

    this.add(nucleus);
    // addShine(nucleus)
    // this.add(new THREE.PointLight(0xffffff, 1, 100))
    return nucleus;
  }
  initEleOrbit() {
    let eleArr = getTrackArr(this.atomData.ele_number);
    eleArr.map((item, index) => {
      let tmpEleOrbit = this.getEleOrbit(
        this.nucleusWidth + (1 + index) * AtomModelConfig.defaultEleOrbit,
        item,
      );

      // tmpEleOrbit.rotateZ(index * Math.PI / eleArr.length)
      this.electronics.push(tmpEleOrbit);
    });
    this.add(...this.electronics);
  }
  getEleOrbit(radius: number, eleNumber: number): THREE.Object3D {
    const geoGeometry = new THREE.TorusGeometry(
      radius,
      AtomModelConfig.defaultTorus.tube,
      AtomModelConfig.defaultTorus.radialSegments,
      AtomModelConfig.defaultTorus.tubularSegments,
    );
    const geoMaterial = new THREE.MeshPhongMaterial({
      color: AtomModelConfig.defaultTorus.color,
      shininess: AtomModelConfig.defaultSphere.shininess,
      side: THREE.DoubleSide,
    });
    const geoMesh = new THREE.Mesh(geoGeometry, geoMaterial);
    geoMesh.rotateX(Math.PI / 2);
    const eleGeometry = new THREE.SphereGeometry(
      AtomModelConfig.defaultEleConfig.radius,
      AtomModelConfig.defaultEleConfig.widthSegments,
      AtomModelConfig.defaultEleConfig.heightSegments,
    );
    const eleMaterial = new THREE.MeshPhongMaterial({
      color: AtomModelConfig.defaultEleConfig.color,
      shininess: AtomModelConfig.defaultEleConfig.shininess,
    });

    // eleMaterial.map = this.getTextCanvas(
    //   eleNumber.toString(),
    //   AtomModelConfig.defaultEleConfig.color,
    //   AtomModelConfig.defaultEleConfig.radius * 1000,
    // );
    const eleMesh = new THREE.Mesh(eleGeometry, eleMaterial);

    // eleMesh.rotateZ(Math.PI / 2);
    eleMesh.position.set(0, 0, radius);
    // addShine(eleMesh)
    const eleOrbit = new THREE.Object3D();
    eleOrbit.add(geoMesh, eleMesh);
    for (let i = 1; i < eleNumber; i++) {
      let tmpEle = eleMesh.clone()
      tmpEle.position.set(Math.sin(i * Math.PI * 2 / eleNumber) * radius, 0, Math.cos(i * Math.PI * 2 / eleNumber) * radius);
      // tmpEle.rotateY(i * Math.PI * 2 / eleNumber)

      eleOrbit.add(tmpEle)
    }
    eleOrbit.rotateY(Math.PI / 6);
    return eleOrbit;
  }

  getTextCanvas(str: string, color: THREE.Color, drawWH: number): THREE.Texture {
    this.drawingCanvas = document.createElement("canvas");
    this.drawingCanvas.width = this.drawingCanvas.height = drawWH;
    const cont2d = this.drawingCanvas.getContext("2d");
    if (!(cont2d instanceof CanvasRenderingContext2D)) {
      throw new Error("Failed to get 2D context");
    }
    this.drawingContext = cont2d;
    this.drawingContext.fillStyle = "#" + color.getHexString();
    this.drawingContext.fillRect(0, 0, drawWH, drawWH);
    this.drawingContext.fillStyle = "rgb(0, 0, 0)";
    this.drawingContext.textAlign = "center";
    this.drawingContext.textBaseline = "middle";
    this.drawingContext.font = drawWH / 4 + "px serif";
    this.drawingContext.fillText(str, drawWH / 2, drawWH / 2);
    return new THREE.CanvasTexture(this.drawingCanvas);
  }
  renderEvent = () => {
    this.electronics.map((item, i) => {
      // item.rotateX(Math.random() * (i + 1) * Math.PI * 0.005 * (i % 2 == 0 ? 1 : -1));
      item.rotateY(Math.random() * (i + 1) * Math.PI * 0.005);
    });
  };
}

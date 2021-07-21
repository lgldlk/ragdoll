import { CloudModule } from './../../threeScene/CloudModule';
import { MoleculeRequest } from '/@/api/MoleculeRequest';

import { ChemicalReactionRequest } from '/@/api/ChemicalReactionRequest';
import { useRoute, useRouter } from 'vue-router';
import { Store, useStore } from 'vuex';
import { SCENE_MODULE_COMMIT_PREFIX, RootState } from '/@/store';
import { INIT_REGDOLL_SCENE, SET_RENDER_SCENE } from '/@/store/Scene/mutation-types';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-20 22:13:34
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 16:40:39
 */
import * as THREE from 'three'
import { changeSceneBackground } from '/@/util';
import { onMounted, ref } from 'vue'
import { SmallScene } from '/@/threeScene/SmallScene';
import MoleculeModule from '/@/threeScene/atomModule/MoleculeModule';
// @ts-ignore
import { TWEEN } from "/@/assets/js/tween.module.min.js";
import { CloudGLSL } from '/@/assets/glsl/cloud';

export function showChemical() {
  const store: Store<RootState> = useStore(),
    route = useRoute()
  let smallDollScene: SmallScene,
    nowChemicalShow = ref<any>({}),
    leftObj: { num: any; mole: any; }[] = [],
    leftSum = 0,
    rightObj: { num: any; mole: MoleculeModule; }[] = [],
    rightSum = 0,
    nowSetMoleculeNum = 0,
    sceneObj: MoleculeModule[] = [],
    getLeftPosition = () => {
      let angle = Math.PI * 2 / leftSum * (nowSetMoleculeNum++)
      return {
        x: 500 * Math.sin(angle),
        y: 20,
        z: 500 * Math.cos(angle)
      }
    },
    getRightPosition = () => {
      let angle = Math.PI * 2 / rightSum * (nowSetMoleculeNum++)
      return {
        x: 200 * Math.sin(angle),
        y: 20,
        z: 200 * Math.cos(angle)
      }
    }
  let allMolecule: any[],
    getMoleculeData = (id: number) => {
      for (let molecule of allMolecule) {
        if (molecule.id == id) {
          return molecule;
        }
      }
    },
    hasReacted = ref(false), inReaction = ref(false);//反应完成和正在反映
  const cloudObj = CloudModule()
  onMounted(async () => {
    allMolecule = (await MoleculeRequest.allMolecule()).data;
    let chemicalShowScene = document.getElementById("chemicalShowScene");
    if (chemicalShowScene) {
      smallDollScene = new SmallScene(
        chemicalShowScene
      );
    }
    if (route.query.chemical_Id) {

      nowChemicalShow.value = (await ChemicalReactionRequest.chemicalById(route.query.chemical_Id as any)).data;
      console.log(nowChemicalShow.value);
      const leftMap = new Map(),
        rightMap = new Map();
      nowChemicalShow.value.leftMolecule.map((nowChemicalShow2: string) => {
        if (leftMap.has(nowChemicalShow2)) {
          leftMap.set(nowChemicalShow2, leftMap.get(nowChemicalShow2) + 1)
        } else {
          leftMap.set(nowChemicalShow2, 1)
        }
      })
      nowChemicalShow.value.rightMolecule.map((nowChemicalShow2: string) => {
        if (rightMap.has(nowChemicalShow2)) {
          rightMap.set(nowChemicalShow2, rightMap.get(nowChemicalShow2) + 1)
        } else {
          rightMap.set(nowChemicalShow2, 1)
        }
      })
      leftMap.forEach(async function (value, key) {
        console.log(key, getMoleculeData(key));

        leftObj.push({ num: value, mole: new MoleculeModule(getMoleculeData(key), true) })
        leftSum += value
      })
      rightMap.forEach(async function (value, key) {
        console.log(key, getMoleculeData(key));
        rightObj.push({ num: value, mole: new MoleculeModule(getMoleculeData(key), true) })
        rightSum += value
      })
      if (smallDollScene) {
        leftObj.map((item) => {
          for (let i = 0; i < item.num; i++) {
            let tmpMole: MoleculeModule = item.mole.cloneMolecule(),
              tmpPosition = getLeftPosition()
            tmpMole.position.set(tmpPosition.x, tmpPosition.y, tmpPosition.z)
            tmpMole.scale.set(0.5, 0.5, 0.5)
            sceneObj.push(tmpMole)
            smallDollScene.addObject(tmpMole)
          }

        })

      }
    }
  })
  const startRightCreate = () => {
    nowSetMoleculeNum = 0;
    rightObj.map((item) => {
      for (let i = 0; i < item.num; i++) {

        let tmpMole: MoleculeModule = item.mole.cloneMolecule(),
          tmpPosition = getRightPosition()
        tmpMole.position.set(tmpPosition.x, tmpPosition.y, tmpPosition.z)
        tmpMole.scale.set(0.5, 0.5, 0.5)
        sceneObj.push(tmpMole)
        smallDollScene.addObject(tmpMole)
      }
    })
    let option = { dividerScalar: 1, scale: 5 }
    new TWEEN.Tween(option, 1500).
      to({ dividerScalar: 0.7, scale: 1 }).onUpdate(() => {
        cloudObj.shapeGroup.scale.set(option.scale, option.scale, option.scale)

        rightObj.map((item: any) => {
          item.position.divideScalar(option.dividerScalar)
        })
        setTimeout(() => { TWEEN.update() }, 16)
      }).onComplete(() => {
        hasReacted.value = true
        smallDollScene.removeObject(cloudObj.shapeGroup)
        smallDollScene.removerRenderFunc(cloudObj.renderFun)
      })
    TWEEN.update()
  }




  let dividerScalar = { value: 1.02 }, hadAddCloud = false;
  let dividerScalarTween = new TWEEN.Tween(dividerScalar)
    .to({ value: 1 }, 1500)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(() => {
      sceneObj.map((item: any) => {
        item.position.divideScalar(dividerScalar.value)
      })

      if (dividerScalar.value <= 1.010 && !hadAddCloud) {
        smallDollScene.addObject(cloudObj.shapeGroup)
        hadAddCloud = true
        console.log("smallDollScene.addObject(cloudObj.shapeGroup)");

        smallDollScene.addRenderFun(cloudObj.renderFun)
      }
      setTimeout(() => { TWEEN.update() }, 16)
    }).onComplete(() => {
      setTimeout(() => {
        nowSetMoleculeNum = 0;

        while (sceneObj.length) {
          let tmp = sceneObj.pop()
          tmp && smallDollScene.removeObject(tmp)
        }
        rightObj.map((item) => {
          for (let i = 0; i < item.num; i++) {
            let tmpMole: MoleculeModule = item.mole.cloneMolecule(),
              tmpPosition = getRightPosition()
            tmpMole.position.set(tmpPosition.x, tmpPosition.y, tmpPosition.z)
            tmpMole.scale.set(0.5, 0.5, 0.5)
            sceneObj.push(tmpMole)
            smallDollScene.addObject(tmpMole)
          }
        })


        let option = { dividerScalar: 1, scale: 50 }
        let tmpTween = new TWEEN.Tween(option).
          to({ dividerScalar: 0.98, scale: 1 }, 1500).onUpdate(() => {
            cloudObj.shapeGroup.scale.set(option.scale, option.scale, option.scale)

            sceneObj.map((item: any) => {
              item.position.divideScalar(option.dividerScalar)
            })
            setTimeout(() => {
              TWEEN.update();
              // tmpTween.update()
            }, 16)
          }).onComplete(() => {
            hasReacted.value = true
            inReaction.value = false;
            smallDollScene.removeObject(cloudObj.shapeGroup)
            smallDollScene.removerRenderFunc(cloudObj.renderFun)
          }).start();
        TWEEN.update();
        // tmpTween.update()
      }, 1500)

    })


  const reactionClick = () => {
    inReaction.value = true
    dividerScalarTween.start()
    TWEEN.update();
  }
  return {
    hasReacted,
    inReaction,
    reactionClick,
    nowChemicalShow
  }


}

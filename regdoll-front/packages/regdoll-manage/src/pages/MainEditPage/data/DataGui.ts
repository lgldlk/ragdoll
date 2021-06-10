/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-06-07 21:30:56
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-10 17:36:39
 */
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { useStore ,Store} from "vuex";
import { RootState } from '/@/store';

export default function initDataGuiMod(store:Store<RootState>) {
  const dataPanel = new dat.GUI({ width: 310, name: 'My GUI' })

  const sceneFolder = dataPanel.addFolder("场景设定"),
    mainScene = store.state.scene.mainScene,
    sceneParam = {
      "背景颜色":'#'+mainScene?.backgroundColor.getHexString()
    }
  console.log(mainScene?.backgroundColor.getHexString());
  
  sceneFolder.open()
  sceneFolder.addColor(sceneParam, '背景颜色').onChange((val) => {

    mainScene?.changeBackground(new THREE.Color(val))
  })
}
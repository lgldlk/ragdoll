/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-06-07 21:30:56
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-02 22:11:06
 */

import * as dat from '/@/assets/js/dat.gui.js';
import * as THREE from 'three';
import { useStore, Store } from "vuex";
import { RootState } from '/@/store';
import { DatGUI } from '/@/types/dat.gui';

export default function initDataGuiMod(store: Store<RootState>) {
  const dataPanel = (new dat.GUI({ width: 310, name: 'My GUI' }) as DatGUI);
  const sceneFolder = dataPanel.addFolder("场景设定"),
    mainScene = store.state.scene.mainScene,
    sceneParam = {
      bgColor: '#' + mainScene?.backgroundColor.getHexString()
    }
  sceneFolder.open()
  sceneFolder.addColor(sceneParam, "bgColor", '背景颜色').onChange((val) => {
    mainScene?.changeBackground(new THREE.Color(val))
  })
}
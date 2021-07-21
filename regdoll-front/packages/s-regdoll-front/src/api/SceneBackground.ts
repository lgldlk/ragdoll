/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-17 10:52:08
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 08:24:28
 */

import mainAxios from '/@/request/MainAxios';


export namespace SceneBackgroundRequest {
  const
    sceneBackgroundPrefix = (val: string) => {
      return 'sceneBackground/' + val;
    }
  export function allSceneBackground() {
    return mainAxios.request({
      url: sceneBackgroundPrefix("allSceneBackground")
    })
  }

}
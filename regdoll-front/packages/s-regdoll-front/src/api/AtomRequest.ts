/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-05 08:21:28
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-05 09:13:45
 */

import mainAxios from '/@/request/MainAxios';


export namespace AtomRequest {

  const atomListUrl = 'atomList',
    getAtomByEleNumUrl = 'getAtomByEleNum',
    addAtomPrefix = (params: string) => {
      return 'atom/' + params;
    }

  export function reqAtomList() {
    return mainAxios.request({
      url: addAtomPrefix(atomListUrl),
    });
  }
  export function getAtomByEleNum(ele_number: number) {
    return mainAxios.request({
      url: addAtomPrefix(getAtomByEleNumUrl),
      params: {
        ele_number
      }
    });
  }
}

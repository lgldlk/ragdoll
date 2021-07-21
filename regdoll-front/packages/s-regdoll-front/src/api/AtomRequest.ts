/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-05 08:21:28
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 08:18:19
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
  export function getAtomById(atom_id: number) {
    return mainAxios.request({
      url: addAtomPrefix("getAtomById"),
      params: {
        atom_id
      }
    })
  }
}

/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-14 21:37:00
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-15 08:30:11
 */

import mainAxios from '/@/request/MainAxios';


export namespace AtomRequest {

  const
    addAtomPrefix = (params: string) => {
      return 'atom/' + params;
    }

  export function reqAtomList() {
    return mainAxios.request({
      url: addAtomPrefix("atomList"),
    });
  }
  export function deleteAtom(id: number) {
    return mainAxios.request({
      url: addAtomPrefix("deleteAtom"),
      method: "POST",
      params: {
        id
      }
    })
  }
  export function updateAtom(upAtom: any) {
    return mainAxios.request({
      url: addAtomPrefix("updateAtom"),
      method: "POST",
      params: { upAtom }
    })
  }
  export function addAtom(addAtom: any) {
    return mainAxios.request({
      url: addAtomPrefix("addAtom"),
      method: "POST",
      params: {
        addAtom
      }
    })
  }
  export function getAtomByEleNum(ele_number: number) {
    return mainAxios.request({
      url: addAtomPrefix("getAtomByEleNum"),
      params: {
        ele_number
      }
    });
  }
}

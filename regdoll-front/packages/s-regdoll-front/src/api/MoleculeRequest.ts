/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-16 21:33:25
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 13:35:54
 */
import mainAxios from '/@/request/MainAxios';

export namespace MoleculeRequest {
  const
    moleculePrefix = (val: string) => {
      return 'molecule/' + val;
    }
  export function allMolecule() {
    return mainAxios.request({
      url: moleculePrefix("allMolecule"),
      method: "GET"
    })
  }
  export function getMoleculeKnowById(id: number) {
    return mainAxios.request({
      url: moleculePrefix("getMoleculeKnowById"),
      params: { id }
    })
  }
  export function moleculeNameAndId() {
    return mainAxios.request({
      url: moleculePrefix("moleculeNameAndId")
    })
  }
  export function allMoleculeExp() {
    return mainAxios.request({
      url: moleculePrefix("allMoleculeExp"),
    })
  }
  export function getMoleculeById(id: number) {
    return mainAxios.request({
      url: moleculePrefix("getMoleculeById"),
      params: {
        id
      }
    })
  }
}
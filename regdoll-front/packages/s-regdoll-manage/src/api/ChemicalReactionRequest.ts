/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-20 15:34:32
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 21:24:49
 */

import mainAxios from '/@/request/MainAxios';

export namespace ChemicalReactionRequest {
  const chemicalReactionPrefix = (val: string) => {
    return "chemicalReaction/" + val;
  }
  export function allChemicalReaction() {
    return mainAxios.request({
      url: chemicalReactionPrefix("allChemicalReaction")
    })
  }
  export function saveChemical(chemical: any) {
    return mainAxios.request({
      url: chemicalReactionPrefix("saveChemical"),
      data: {
        chemical
      },
      method: "POST"
    })
  }
  export function allChemicalWithoutEditor() {
    return mainAxios.request({
      url: chemicalReactionPrefix("allChemicalWithoutEditor")
    })
  }
  export function chemicalById(id: number) {
    return mainAxios.request({
      url: chemicalReactionPrefix("chemicalById"),
      data: {
        id
      },
      method: "POST"
    })
  }
  export function deleteChemical(id: number) {
    return mainAxios.request({
      url: chemicalReactionPrefix("deleteChemical"),
      data: { id },
      method: "POST"
    })
  }
}
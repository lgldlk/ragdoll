/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-13 14:29:02
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 20:36:33
 */
import mainAxios from '/@/request/MainAxios';

export namespace MoleculeRequest {
  const
    moleculePrefix = (val: string) => {
      return 'molecule/' + val;
    }
  export function addMolecule(molecule: any) {
    return mainAxios.request({
      url: moleculePrefix("addMolecule"),
      data: {
        molecule
      },
      method: "POST"
    });
  }
  export function allMolecule() {
    return mainAxios.request({
      url: moleculePrefix("allMolecule"),
      method: "GET"
    })
  }
  export function deleteMolecule(id: number) {
    return mainAxios.request({
      url: moleculePrefix("deleteMolecule"),
      method: "POST",
      data: {
        id
      }
    }
    )
  }
  export function moleculeNameAndId() {
    return mainAxios.request({
      url: moleculePrefix("moleculeNameAndId")
    })
  }
  export function updateMoleculeValence(molecule: any) {
    return mainAxios.request({
      url: moleculePrefix("updateMoleculeValence"),
      method: "POST",
      data: {
        molecule
      }
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
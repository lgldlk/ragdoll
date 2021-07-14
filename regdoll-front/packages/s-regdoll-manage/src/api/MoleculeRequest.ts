/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-13 14:29:02
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-13 14:37:33
 */
import mainAxios from '/@/request/MainAxios';

export namespace MoleculeRequest {
  const postAddMolecule = "addMolecule",
    addMoleculePrefix = (val: string) => {
      return 'molecule/' + val;
    }
  export function reqAtomList(molecule: any) {
    return mainAxios.request({
      url: addMoleculePrefix(postAddMolecule),
      params: {
        molecule
      },
      method: "POST"

    });
  }
}
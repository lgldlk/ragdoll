/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-16 21:33:25
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-16 21:33:47
 */
import mainAxios from '/@/request/MainAxios';

export namespace MoleculeRequest {
  const
    moleculePrefix = (val: string) => {
      return 'molecule/' + val;
    }

}
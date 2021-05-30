/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-29 14:25:51
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-29 16:09:52
 */
import mainAxios from '/@/request/MainAxios';

export function getAtomList() {
  return mainAxios.request({
    url: '',
  });
}
export default class AtomRequest {
  atomList = 'atomList';
  getAtomById = 'getAtomById';
  reqAtomList() {
    return mainAxios.request({
      url: this.atomList,
    });
  }
  reqAtomById() {
    return mainAxios.request({
      url: this.getAtomById,
    });
  }
}

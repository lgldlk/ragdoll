/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-29 14:25:51
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-02 22:00:17
 */
import mainAxios from "/@/request/MainAxios";

const atomListCon = "atomList",
  getAtomByIdCon = "getAtomById";
export function getAtomConUrl(router: string) {
  return "atom/" + router;
}
export function getAtomList() {
  return mainAxios.request({
    url: getAtomConUrl(atomListCon),
  });
}
export function getAtomById() {
  return mainAxios.request({
    url: getAtomConUrl(getAtomByIdCon),
  });
}

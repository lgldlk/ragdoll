/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-25 22:02:16
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-25 22:07:25
 */
// 本地化存储

export default class LocalStorage {
  static setLocalStore = (name: string, content: string | Object) => {
    if (!name) return;
    let saveContent;
    if (typeof content !== 'string') {
      saveContent = JSON.stringify(content);
    } else {
      saveContent = content;
    }
    window.localStorage.setItem(name, saveContent);
  };

  // 本地化获取
  static getLocalStore = (name: string) => {
    if (!name) return;
    let result = window.localStorage.getItem(name);
    if (result && LocalStorage.isJsonString(result)) {
      result = JSON.parse(result);
    }
    return result;
  };
  static isJsonString(str: string) {
    try {
      if (typeof JSON.parse(str) == 'object') {
        return true;
      }
    } catch (e) { }
    return false;
  }

  // 本地化删除
  static removeLocalStore = (name: string) => {
    if (!name) return;
    return window.localStorage.removeItem(name);
  };
}

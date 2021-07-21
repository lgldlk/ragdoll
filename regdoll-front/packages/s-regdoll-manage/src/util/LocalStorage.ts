
export default {}
// 本地化存储

export namespace LocalStorage {
  export const setLocalStore = (name: string, content: string | Object) => {
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
  export const getLocalStore = (name: string) => {
    if (!name) return;
    let result = window.localStorage.getItem(name);
    if (result && LocalStorage.isJsonString(result)) {
      result = JSON.parse(result);
    }
    return result;
  };
  export function isJsonString(str: string) {
    try {
      if (typeof JSON.parse(str) == 'object') {
        return true;
      }
    } catch (e) { }
    return false;
  }

  // 本地化删除
  export const removeLocalStore = (name: string) => {
    if (!name) return;
    return window.localStorage.removeItem(name);
  };

  export const setLocalStoreByBase64 = (name: string, content: string | Object) => {
    if (!name) return;
    let saveContent;
    if (typeof content !== 'string') {
      saveContent = window.escape(JSON.stringify(content));
    } else {
      saveContent = window.escape(content);
    }
    window.localStorage.setItem(name, saveContent);
  }
  export const getLocalStoreByBase64 = (name: string) => {
    if (!name) return;
    let result = unescape(window.localStorage.getItem(name) || "");
    if (result && LocalStorage.isJsonString(result)) {
      result = JSON.parse(result);
    }
    return result;
  };
}



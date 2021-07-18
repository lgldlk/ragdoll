/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-02 21:54:10
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-02 22:11:18
 */
/**
 * 循环调用函数
 * @param functions 要调用的函数
 */
export function callFunctions(functions: Array<Function>, ...args: Array<any>) {
  for (let i = 0; i < functions.length; i++) {
    if (typeof functions == "function") {
      (functions[i] as any)(args[i]);
    }
  }
}

/**
 * 对象键全部转小写
 * @param params
 */
export function toLowerCase(obj: object) {
  if (typeof obj == "undefined") {
    return {};
  }
  let toObj = {};
  for (const key in obj) {
    (<any>toObj)[key.toLowerCase()] = (<any>obj)[key];
  }
  return toObj;
}



/**
 * 循环调用函数
 * @param functions 要调用的函数
 */
export function callFunctions(functions: Array<Function>, ...args: Array<any>) {
  for (let i = 0; i < functions.length; i++) {
    if (typeof functions == 'function') {
      (functions[i] as any)(args[i]);
    }
  }
}

/**
 * 对象键全部转小写
 * @param params
 */
export function toLowerCase(obj: object) {
  let toobj = {};
  for (const key in obj) {
    (<any>toobj)[key.toLowerCase()] = (<any>obj)[key];
  }
  return toobj;
}

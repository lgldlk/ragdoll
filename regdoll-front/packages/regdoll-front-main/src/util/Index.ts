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

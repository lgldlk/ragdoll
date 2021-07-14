/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-06-10 20:54:32
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-10 22:12:23
 */
declare interface Event {
  offsetX: number;
  offsetY: number;
  clientX: number;
  clientY: number;
  dataTransfer: {
    setData(...args): void
    getData(...args): string
  }
}
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-06-10 20:35:15
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-10 21:09:52
 */
declare interface LeftMenuOption{
  name: string;
    image: string;
    click: () => void;
    dragstart: (e: Event)=>void
}
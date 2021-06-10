import { ADD_OBJECT, RENDER_SCENE } from "../../../../store/Scene/mutation-types";
import { Store, useStore } from "vuex";
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-04 21:19:22
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-10 19:48:48
 */
import { reactive, ref, provide, inject, readonly } from "vue";
import { leafColumnModuleParts } from "../../data/PROVIDE_KEY";
import { RootState } from '/@/store';


const menuBar = [{
  image: `          <svg
  t="1623319664162"
  class="icon"
  viewBox="0 0 1024 1024"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  p-id="1208"
>
  <path
    d="M376.9 497.6H150.7c-27.5 0-50-22.5-50-50V221.4c0-27.5 22.5-50 50-50h226.2c27.5 0 50 22.5 50 50v226.2c0 27.5-22.5 50-50 50zM663.6 503.2l-159.9-160c-19.4-19.4-19.4-51.3 0-70.7l159.9-159.9c19.4-19.4 51.3-19.4 70.7 0l159.9 159.9c19.4 19.4 19.4 51.3 0 70.7l-159.9 160c-19.4 19.4-51.2 19.4-70.7 0zM376.9 927.3H150.7c-27.5 0-50-22.5-50-50V651.1c0-27.5 22.5-50 50-50h226.2c27.5 0 50 22.5 50 50v226.2c0 27.5-22.5 50-50 50zM812.1 927.3H585.9c-27.5 0-50-22.5-50-50V651.1c0-27.5 22.5-50 50-50h226.2c27.5 0 50 22.5 50 50v226.2c0 27.5-22.5 50-50 50z"
    p-id="1209"
  ></path>
</svg>`,
  tipContent: "基础图形"
}, {
 image:`<svg
 t="1623321825418"
 class="icon"
 viewBox="0 0 1024 1024"
 version="1.1"
 xmlns="http://www.w3.org/2000/svg"
 p-id="1401"
>
 <path
   d="M793.252 230.748h-16.876v-61.296h16.876v61.296z m-562.504 0v-61.296h16.876v61.301h-16.876z m0 124.83h16.876V512h-16.876V355.579z m562.504 0V512h-16.876V355.579h16.876z m-95.626 195.795c-33.751 0-56.249 22.502-56.249 56.248s22.503 56.248 56.249 56.248 56.248-22.502 56.248-56.248-22.497-56.248-56.248-56.248zM523.249 399.498c-16.876 0-28.125 11.249-28.125 28.124s11.25 28.125 28.125 28.125 28.124-11.25 28.124-28.125-16.87-28.124-28.124-28.124z m-213.75 151.875c-22.503 0-39.373 16.875-39.373 33.75 0 22.503 16.876 39.374 39.373 39.374s33.75-16.876 33.75-39.373c0-16.876-16.875-33.751-33.75-33.751z m388.127 146.253c-50.627 0-95.627-39.373-95.627-95.627 0-11.248 0-22.502 5.627-33.75l-56.253-84.373c-5.627 5.627-16.876 11.248-28.124 11.248-16.876 0-33.751-5.626-45-22.502l-101.248 84.373c5.627 11.248 5.627 16.875 5.627 28.124 0 39.373-33.751 73.124-73.124 73.124s-78.75-33.751-78.75-73.124S264.498 512 309.498 512c16.875 0 33.75 5.627 45 11.249l101.248-90v-5.627c0-33.75 28.124-67.502 67.502-67.502s67.502 28.124 67.502 67.502c0 11.249 0 16.876-5.627 28.125l56.248 84.372c11.249-16.875 33.751-28.124 56.248-28.124 50.627 0 95.627 39.373 95.627 95.626 0.005 50.627-44.995 90.005-95.621 90.005zM161.229 312.602v578.8l69.52-176.9V680.75h16.875v39.373h528.245V680.75h17.383v39.373l75.146 175.385V312.602h-707.17z m616.663-195.866H251.228l-88.985 136.515h705.146l-89.497-136.515z m32.67 780.288l-50.047-129.306H268.61l-48.538 129.306h590.49z m-709.186 59.351V253.251L213.878 67.625h601.876l112.502 185.626v703.124h-826.88z"
   p-id="1402"
 ></path>
</svg>`,
  tipContent:"3D模型"
}]
const showMenu = ref<number>(0),
  menuBarClick = (clickItem:number) => {
    showMenu.value = clickItem;
  }

const partsOption = [

  {
    name: "原子",
    image: `<svg t="1620134840116" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1980"  xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M512 469.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m325.12 42.666667l4.693333-5.973333C899.413333 426.666667 913.066667 353.706667 881.493333 298.666667c-31.573333-55.04-102.4-79.36-198.826666-69.546667h-7.68C636.16 140.8 578.56 85.333333 512 85.333333S387.84 140.8 349.44 230.4L341.333333 229.12C244.906667 219.306667 174.08 243.626667 142.506667 298.666667c-31.573333 55.04-17.92 128 39.68 207.36l4.693333 5.973333-4.693333 5.973333C124.586667 597.333333 110.933333 670.293333 142.506667 725.333333 170.666667 772.266667 224.853333 797.013333 298.666667 797.013333c13.226667 0 26.88 0 42.666666-2.133333h7.68C387.84 883.2 445.44 938.666667 512 938.666667s124.16-55.466667 162.56-145.066667h7.68c14.506667 0 28.16 2.133333 42.666667 2.133333 75.52 0 130.986667-24.746667 157.866666-71.68 31.573333-55.04 17.92-128-39.68-207.36l-5.973333-4.693333zM216.32 341.333333c10.666667-18.773333 42.666667-29.013333 85.333333-29.013333h20.906667a630.613333 630.613333 0 0 0-14.933333 79.786667 640 640 0 0 0-61.866667 53.333333C213.333333 402.773333 203.946667 362.666667 216.32 341.333333z m0 341.333334c-12.373333-21.333333 0-61.44 28.586667-105.386667a640 640 0 0 0 61.866666 53.333333c3.242667 27.008 8.234667 53.802667 14.933334 80.213334-52.906667 3.413333-93.013333-6.826667-105.386667-28.16zM512 170.666667c23.893333 0 52.48 28.16 76.8 78.08a750.933333 750.933333 0 0 0-76.8 26.88 750.933333 750.933333 0 0 0-76.8-26.88C459.52 198.826667 488.106667 170.666667 512 170.666667z m0 682.666666c-23.893333 0-52.48-28.16-76.8-78.08a750.933333 750.933333 0 0 0 76.8-26.88 750.933333 750.933333 0 0 0 76.8 26.88C564.48 825.173333 535.893333 853.333333 512 853.333333z m125.013333-269.226666c-19.626667 13.653333-39.68 26.453333-61.013333 38.826666-21.333333 12.373333-42.666667 23.466667-64 33.28-21.333333-9.941333-42.666667-21.034667-64-33.28-21.333333-12.373333-42.666667-25.173333-61.013333-38.826666C384 561.066667 384 537.173333 384 512c0-25.173333 0-49.066667 2.986667-72.106667 19.626667-13.653333 39.68-26.453333 61.013333-38.826666 21.333333-12.373333 42.666667-23.466667 64-33.28 21.333333 9.941333 42.666667 21.034667 64 33.28 21.333333 12.373333 42.666667 25.173333 61.013333 38.826666 0 23.04 2.986667 46.933333 2.986667 72.106667 0 25.173333 0 49.066667-2.986667 72.106667z m170.666667 98.56c-12.373333 21.333333-52.48 32-105.386667 28.16a637.44 637.44 0 0 0 14.933334-80.213334 640 640 0 0 0 61.866666-53.333333c31.573333 43.946667 40.96 84.053333 28.586667 105.386667z m-28.586667-235.946667a640 640 0 0 0-61.866666-53.333333 630.613333 630.613333 0 0 0-14.933334-79.786667h20.906667c42.666667 0 73.813333 10.24 85.333333 29.013333 11.52 18.773333 2.133333 60.16-29.44 104.106667z" fill="#35495E" p-id="1981">
</path>
</svg>`,
    click: () => {

    },
  },
  {
    name: "模型",
    image: `<svg t="1623063008873" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3034" ><path d="M526.628571 300.119771v294.473143l254.829715-147.2512V152.897829z" fill="#CEDDFF" p-id="3035"></path><path d="M271.798857 152.897829L526.628571 300.119771v294.473143L271.798857 447.341714z" fill="#1E3465" p-id="3036"></path><path d="M526.628571 305.795657l254.829715-144.413257L526.628571 16.9984 271.798857 161.3824z" fill="#4C84FF" p-id="3037"></path><path d="M271.798857 724.816457V1019.318857L526.628571 872.0384V577.594514z" fill="#CEDDFF" p-id="3038"></path><path d="M16.969143 577.594514l254.829714 147.221943V1019.318857L16.969143 872.0384z" fill="#1E3465" p-id="3039"></path><path d="M271.798857 730.492343L526.628571 586.079086l-254.829714-144.384-254.829714 144.384z" fill="#4C84FF" p-id="3040"></path><path d="M764.459886 724.816457V1019.318857l254.829714-147.2512V577.594514z" fill="#CEDDFF" p-id="3041"></path><path d="M526.628571 577.594514l254.829715 147.221943V1019.318857L526.628571 872.0384z" fill="#1E3465" p-id="3042"></path><path d="M764.459886 730.492343l254.829714-144.413257-254.829714-144.384-254.829715 144.384z" fill="#4C84FF" p-id="3043"></path></svg>`,
    click: () => {
      console.log("atomClick2");
    },
  },
  {
    name: "原子",
    image: `<svg t="1620134840116" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1980"  xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M512 469.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m325.12 42.666667l4.693333-5.973333C899.413333 426.666667 913.066667 353.706667 881.493333 298.666667c-31.573333-55.04-102.4-79.36-198.826666-69.546667h-7.68C636.16 140.8 578.56 85.333333 512 85.333333S387.84 140.8 349.44 230.4L341.333333 229.12C244.906667 219.306667 174.08 243.626667 142.506667 298.666667c-31.573333 55.04-17.92 128 39.68 207.36l4.693333 5.973333-4.693333 5.973333C124.586667 597.333333 110.933333 670.293333 142.506667 725.333333 170.666667 772.266667 224.853333 797.013333 298.666667 797.013333c13.226667 0 26.88 0 42.666666-2.133333h7.68C387.84 883.2 445.44 938.666667 512 938.666667s124.16-55.466667 162.56-145.066667h7.68c14.506667 0 28.16 2.133333 42.666667 2.133333 75.52 0 130.986667-24.746667 157.866666-71.68 31.573333-55.04 17.92-128-39.68-207.36l-5.973333-4.693333zM216.32 341.333333c10.666667-18.773333 42.666667-29.013333 85.333333-29.013333h20.906667a630.613333 630.613333 0 0 0-14.933333 79.786667 640 640 0 0 0-61.866667 53.333333C213.333333 402.773333 203.946667 362.666667 216.32 341.333333z m0 341.333334c-12.373333-21.333333 0-61.44 28.586667-105.386667a640 640 0 0 0 61.866666 53.333333c3.242667 27.008 8.234667 53.802667 14.933334 80.213334-52.906667 3.413333-93.013333-6.826667-105.386667-28.16zM512 170.666667c23.893333 0 52.48 28.16 76.8 78.08a750.933333 750.933333 0 0 0-76.8 26.88 750.933333 750.933333 0 0 0-76.8-26.88C459.52 198.826667 488.106667 170.666667 512 170.666667z m0 682.666666c-23.893333 0-52.48-28.16-76.8-78.08a750.933333 750.933333 0 0 0 76.8-26.88 750.933333 750.933333 0 0 0 76.8 26.88C564.48 825.173333 535.893333 853.333333 512 853.333333z m125.013333-269.226666c-19.626667 13.653333-39.68 26.453333-61.013333 38.826666-21.333333 12.373333-42.666667 23.466667-64 33.28-21.333333-9.941333-42.666667-21.034667-64-33.28-21.333333-12.373333-42.666667-25.173333-61.013333-38.826666C384 561.066667 384 537.173333 384 512c0-25.173333 0-49.066667 2.986667-72.106667 19.626667-13.653333 39.68-26.453333 61.013333-38.826666 21.333333-12.373333 42.666667-23.466667 64-33.28 21.333333 9.941333 42.666667 21.034667 64 33.28 21.333333 12.373333 42.666667 25.173333 61.013333 38.826666 0 23.04 2.986667 46.933333 2.986667 72.106667 0 25.173333 0 49.066667-2.986667 72.106667z m170.666667 98.56c-12.373333 21.333333-52.48 32-105.386667 28.16a637.44 637.44 0 0 0 14.933334-80.213334 640 640 0 0 0 61.866666-53.333333c31.573333 43.946667 40.96 84.053333 28.586667 105.386667z m-28.586667-235.946667a640 640 0 0 0-61.866666-53.333333 630.613333 630.613333 0 0 0-14.933334-79.786667h20.906667c42.666667 0 73.813333 10.24 85.333333 29.013333 11.52 18.773333 2.133333 60.16-29.44 104.106667z" fill="#42526E" p-id="1981">
</path>
</svg>`,
    click: () => {
      console.log("atomClick2");
    },
  },
];
let store: Store<RootState> | null;
export const getParts = () => inject(leafColumnModuleParts);
const proParts = (): Array<any> => {
  provide(leafColumnModuleParts, partsOption);
  return partsOption;
};

export default function leafColMod(storeIn: Store<RootState>) {
  proParts();
  store = storeIn;
  return {
    menuBar,
    showMenu,
    menuBarClick
  };
}

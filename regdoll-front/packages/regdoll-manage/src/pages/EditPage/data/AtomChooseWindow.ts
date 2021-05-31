/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-31 21:47:29
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-31 21:59:10
 */

import { ref } from "vue";

export default function AtomChooseWindow() {
  const showAtomChooseWindow = ref<boolean>(true);
  const closeAtomChooseWindow = () => {
      setTimeout(() => {
        showAtomChooseWindow.value = false;
      }, 500);
    },
    openAtomChooseWindow = () => {
      showAtomChooseWindow.value = true;
    };
  return { openAtomChooseWindow, showAtomChooseWindow, closeAtomChooseWindow };
}

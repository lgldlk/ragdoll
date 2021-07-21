import { Router, useRouter } from 'vue-router';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-19 11:23:47
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 15:49:17
 */

//@ts-ignore
import Aos from 'aos'

export function homeModule(router: Router) {
  Aos.init();
  const moduleClick = (index: number) => {
    switch (index) {
      case 0:
        router.push({
          path: "/showAtoms"
        })
        break;
      case 1:
        router.push({
          path: "/atomDetail"
        })
        break;
    }
  }
  return {
    moduleClick
  }
}
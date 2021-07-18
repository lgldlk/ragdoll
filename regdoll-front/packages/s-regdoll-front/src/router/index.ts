/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-03 18:14:01
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-18 16:59:38
 */
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {

  // const userAuth = (getLocalStore('user') as any)?.auth
  // if ((to.meta.auth as any) == 0) {
  next()
  // } else {
  //   if (userAuth && userAuth > (to.meta.auth as any)) {
  //     next()
  //     return
  //   }
  //   next('/403')
  // }

})



export default router;

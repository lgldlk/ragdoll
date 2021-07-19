import { USER_MODULE_COMMIT_PREFIX } from './../store/index';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-03 18:14:01
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 08:46:08
 */
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import store from '/@/store/index'
import { LocalStorage } from '/@/util/LocalStorage';
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {

  // let hasLogin = store.getters.hasUser;
  // console.log(hasLogin);

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

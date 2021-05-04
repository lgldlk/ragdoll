import { RouteRecordRaw } from 'vue-router';
import { ComponentOptionsBase } from 'vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/editPage' },
  {
    path: '/editPage',
    name: 'editPage',
    component: () => import('/@/pages/EditPage/EditPage.vue'),
  },
];
export default routes;

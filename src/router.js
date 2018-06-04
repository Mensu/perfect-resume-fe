import Vue from 'vue';
import Router from 'vue-router';
import TemplateList from './views/TemplateList';
import UserCenter from './views/UserCenter';
import Admin from './views/Admin';
import ProfileSetting from './views/UserCenter/ProfileSetting';
import Templates from './views/UserCenter/Templates';
import { beforeEnterGuardLogin, beforeEnterGuardAdmin } from './services/guard';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: TemplateList,
  }, {
    path: '/user-center',
    component: UserCenter,
    beforeEnter: beforeEnterGuardLogin,
    redirect: '/user-center/profile-setting',
    children: [{
      path: 'profile-setting',
      component: ProfileSetting,
    }, {
      path: 'templates',
      component: Templates,
      props: route => ({ filter: route.query.filter }),
    }],
  }, {
    path: '/admin',
    component: Admin,
    beforeEnter: beforeEnterGuardAdmin,
  }, {
    path: '_',
    component: { template: '<br/>', created() { this.$router.back(); } },
  }, {
    path: '*',
    redirect: '/',
  }],
});

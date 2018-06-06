import { store } from '../store';
import { OPEN_LOGIN_FORM, CHECK_LOGIN } from '../store/actions';
import { user as userstore } from '../store/modules/user';
import { SnakeBar } from './snakebar';
import TaskQueue from './TaskQueue';


const checkLoginQueue = new TaskQueue(1, null);
let checked = false;
export async function checkLogin() {
  return checkLoginQueue.add(async () => {
    if (checked) return store.state.isLoggedIn;
    const isLoggedIn = await store.dispatch(CHECK_LOGIN);
    checked = true;
    return isLoggedIn;
  });
}

/**
 * @param {boolean} [waitForLogin] 默认为 true
 * @return {boolean} true: 应阻止路由跳转
 */
export async function guardLogin(waitForLogin = true) {
  if (!store.state.isLoggedIn) {
    SnakeBar.info('请先登录');
    await store.dispatch(OPEN_LOGIN_FORM, { waitForLogin });
  }
  return !store.state.isLoggedIn;
}

export function guardAdmin() {
  return !store.getters[`${userstore.name}/isAdmin`];
}

export async function beforeEnterGuardLogin(to, from, next) {
  const isFirstPage = from.matched.length === 0;
  if (isFirstPage) {
    await checkLogin();
  }
  if (await guardLogin(isFirstPage)) {
    return next(false);
  }
  return next();
}

export async function beforeEnterGuardAdmin(to, from, next) {
  const isFirstPage = from.matched.length === 0;
  if (await guardLogin(isFirstPage)) {
    return next(false);
  }
  if (guardAdmin()) {
    return next(false);
  }
  return next();
}

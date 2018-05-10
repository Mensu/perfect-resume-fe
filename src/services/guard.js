import { store } from '../store';
import { OPEN_LOGIN_FORM } from '../store/actions';
import { user as userstore } from '../store/modules/user';

/**
 * @param {boolean} waitForLogin
 * @return {boolean} true: 应阻止路由跳转
 */
export async function guardLogin() {
  if (!store.state.isLoggedIn) {
    await store.dispatch(OPEN_LOGIN_FORM, { waitForLogin: true });
  }
  return !store.state.isLoggedIn;
}

export function guardAdmin() {
  return !store.getters[`${userstore.name}/isAdmin`];
}

export async function beforeEnterGuardLogin(to, from, next) {
  if (await guardLogin()) {
    return next(false);
  }
  return next();
}

export async function beforeEnterGuardAdmin(to, from, next) {
  if (await guardLogin()) {
    return next(false);
  }
  if (guardAdmin()) {
    return next(false);
  }
  return next();
}

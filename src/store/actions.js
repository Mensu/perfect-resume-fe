import EventEmitter from 'events';
import { OPEN_LOGIN_REGISTER, CLOSE_LOGIN_REGISTER, SET_LOGIN_STATE, SET_LOGIN_FORM_CLOSABLE, SET_ADMIN } from './mutations';
import { user } from './modules/user';
import { FETCH_USER_PROFILE } from './modules/user/actions';
import { SET_USER_PROFILE } from './modules/user/mutations';
import { user_api } from '../services/user_api';

export const OPEN_LOGIN_FORM = 'OPEN_LOGIN_FORM';
export const CLOSE_LOGIN_FORM = 'CLOSE_LOGIN_FORM';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
const CLEAR_WAIT_LOGIN = 'CLEAR_WAIT_LOGIN';

const login = new EventEmitter();
let waitForLoginPromise = null;

export const actions = {
  async [LOGIN]({ commit, dispatch }, { username, password }) {
    await user_api.login(username, password);
    commit(SET_LOGIN_STATE, true);
    dispatch(`${user.name}/${FETCH_USER_PROFILE}`);
    login.emit(LOGIN);
  },
  async [LOGOUT]({ commit }) {
    await user_api.logout();
    commit(SET_LOGIN_STATE, false);
    commit(`${user.name}/${SET_USER_PROFILE}`, {});
  },
  async [OPEN_LOGIN_FORM]({ commit, dispatch }, { closable = true, waitForLogin = false } = {}) {
    commit(OPEN_LOGIN_REGISTER, closable);
    if (waitForLogin && waitForLoginPromise) {
      return waitForLoginPromise;
    }
    const promise = dispatch('after_open_login_form', { closable, waitForLogin });
    if (waitForLogin) {
      waitForLoginPromise = promise.then(() => { waitForLoginPromise = null });
    }
    return promise;
  },
  async after_open_login_form({ commit }, { closable, waitForLogin }) {
    const listeners = [];
    const once = event => new Promise((resolve) => {
      listeners.push([event, resolve]);
      login.once(event, resolve);
    });
    await Promise.race(waitForLogin ? [once(LOGIN)] : [once(LOGIN), once(CLOSE_LOGIN_REGISTER)]);
    // 防止只 resolve CLOSE_LOGIN_REGISTER 时的内存泄漏
    listeners.forEach(args => login.removeListener(...args));
    commit(SET_LOGIN_FORM_CLOSABLE, true);
    commit(CLOSE_LOGIN_REGISTER);
  },
  async [CLOSE_LOGIN_FORM]({ commit }) {
    commit(CLOSE_LOGIN_REGISTER);
    login.emit(CLOSE_LOGIN_REGISTER);
  },
};

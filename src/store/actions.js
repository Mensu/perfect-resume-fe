import EventEmitter from 'events';
import { OPEN_LOGIN_REGISTER, CLOSE_LOGIN_REGISTER, SET_LOGIN_STATE, SET_LOGIN_FORM_CLOSABLE, SET_ADMIN, SET_SNAKEBAR_MSG, INCREMENT_SNAKEBAR_MSG_ID } from './mutations';
import { user } from './modules/user';
import { FETCH_USER_PROFILE } from './modules/user/actions';
import { SET_USER_PROFILE } from './modules/user/mutations';
import { user_api } from '../services/user_api';
import { sleep } from '../services/utils';

export const OPEN_LOGIN_FORM = 'OPEN_LOGIN_FORM';
export const CLOSE_LOGIN_FORM = 'CLOSE_LOGIN_FORM';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const PROMPT_MSG = 'TOAST_MSG';

const login = new EventEmitter();
let waitForLoginPromise = null;

export const actions = {
  async [CHECK_LOGIN]({ commit, dispatch }) {
    const isLoggedIn = await user_api.checkIsLoggedIn();
    if (isLoggedIn) {
      commit(SET_LOGIN_STATE, isLoggedIn);
      dispatch(`${user.name}/${FETCH_USER_PROFILE}`);
    }
    return isLoggedIn;
  },
  async [LOGIN]({ commit, dispatch }, { username, password }) {
    await user_api.login(username, password);
    commit(SET_LOGIN_STATE, true);
    commit(`${user.name}/${SET_USER_PROFILE}`, { username });
    dispatch(`${user.name}/${FETCH_USER_PROFILE}`);
    login.emit(LOGIN);
  },
  async [LOGOUT]({ commit }) {
    await user_api.logout();
    commit(SET_LOGIN_STATE, false);
    commit(`${user.name}/${SET_USER_PROFILE}`, { username: '用户', nickname: '用户', isAdmin: false });
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
  async [REGISTER](ctx, { username, nickname, password }) {
    return user_api.register({ username, nickname, password });
  },
  async [PROMPT_MSG](
    { state, commit },
    { type = '', msg = '', duration = 4000, icon = '' },
  ) {
    commit(SET_SNAKEBAR_MSG, null);
    commit(INCREMENT_SNAKEBAR_MSG_ID);
    const { snakebarMsgId } = state;
    await sleep(10);
    if (state.snakebarMsgId !== snakebarMsgId) {
      return;
    }
    commit(SET_SNAKEBAR_MSG, { type, msg, icon });
    await sleep(duration);
    if (state.snakebarMsgId !== snakebarMsgId) {
      return;
    }
    commit(SET_SNAKEBAR_MSG, null);
  },
};

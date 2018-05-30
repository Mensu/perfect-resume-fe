import { api, checkResult } from './api';
import { store } from '../store';

const text = { responseType: 'text' };

class UserAPI {
  async checkIsLoggedIn() {
    const result = await api.mock.post('/user/isLoggedIn', null, text);
    return result === true;
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    const result = await api.post('/user/login.do', form, text);
    checkResult(result, '登录失败');
  }

  async logout() {
    try {
      const form = new FormData();
      form.append('username', store.getters.username);
      const result = await api.post('/user/logout.do', form, text);
      checkResult(result, '登出失败');
    } catch (e) {
      // pass
    }
  }

  /**
   * @param {User} user
   */
  async register(user) {
    const form = new FormData();
    form.append('username', user.username);
    form.append('nickname', user.nickname);
    form.append('password', user.password);
    const result = await api.post('/user/register.do', form, text);
    checkResult(result, '注册失败');
  }

  async getProfile(username = store.getters.username) {
    const form = new FormData();
    form.append('username', username);
    const user = await api.post('/user/getUserInfo.do', form);
    return {
      username,
      nickname: user.nickname,
      isAdmin: Boolean(user.manager === '1'),
    };
  }

  /**
   * @param {User} user
   */
  async updateProfile(user) {
    const form = new FormData();
    form.append('username', store.getters.username);
    form.append('nickname', user.nickname);
    form.append('password', user.password);
    const result = await api.post('/user/update.do', form, text);
    checkResult(result, '更新个人信息失败');
  }
}

export const user_api = new UserAPI();

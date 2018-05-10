import { api } from './api';

class UserAPI {
  async checkIsLoggedIn() {
    // TODO
    return Math.floor(Math.random() * 2);
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    // TODO
    // 密码错误应该抛异常出来
  }

  async logout() {
    try {
      // api.post...
    } catch (e) {
      // pass
    }
  }

  async getProfile() {
    // TODO
    return {
      username: 'test',
      nickname: '测试用户',
      isAdmin: Boolean(Math.floor(Math.random() * 2)),
    };
  }
}

export const user_api = new UserAPI();

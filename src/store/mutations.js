export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const OPEN_LOGIN_REGISTER = 'OPEN_LOGIN_REGISTER';
export const CLOSE_LOGIN_REGISTER = 'CLOSE_LOGIN_REGISTER';
export const SET_LOGIN_FORM_CLOSABLE = 'SET_LOGIN_FORM_CLOSABLE';
export const SET_ADMIN = 'SET_ADMIN';
export const SET_SNAKEBAR_MSG = 'SET_SNAKEBAR_MSG';
export const INCREMENT_SNAKEBAR_MSG_ID = 'INCREMENT_SNAKEBAR_MSG_ID';

export const mutations = {
  [SET_LOGIN_STATE](state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  [OPEN_LOGIN_REGISTER](state, closable = true) {
    state.isLoginRegisterOpen = true;
    state.isLoginRegisterClosable = closable;
  },
  [CLOSE_LOGIN_REGISTER](state) {
    if (state.isLoginRegisterClosable) {
      state.isLoginRegisterOpen = false;
    }
  },
  [SET_LOGIN_FORM_CLOSABLE](state, closable) {
    state.isLoginRegisterClosable = closable;
  },
  [SET_ADMIN](state, isAdmin) {
    state.isAdmin = isAdmin;
  },
  [SET_SNAKEBAR_MSG](state, msg) {
    state.snakebarMsg = msg;
  },
  [INCREMENT_SNAKEBAR_MSG_ID](state) {
    state.snakebarMsgId += 1;
  },
};

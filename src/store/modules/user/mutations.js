export const SET_USER_PROFILE = 'SET_USER_PROFILE';

export const mutations = {
  [SET_USER_PROFILE](state, user = {}) {
    const { username, nickname, isAdmin } = { ...state, ...user };
    state.username = username;
    state.nickname = nickname;
    state.isAdmin = true;
  },
};

export const SET_USER_PROFILE = 'SET_USER_PROFILE';

export const mutations = {
  [SET_USER_PROFILE](
    state,
    { username = '', nickname = '', isAdmin = false } = {},
  ) {
    state.username = username;
    state.nickname = nickname;
    state.isAdmin = isAdmin;
  },
};

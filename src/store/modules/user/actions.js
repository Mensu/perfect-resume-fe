import { user_api } from '../../../services/user_api';
import { SET_ADMIN, SET_USER_PROFILE } from './mutations';

export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const actions = {
  async [FETCH_USER_PROFILE]({ commit }) {
    const profile = await user_api.getProfile();
    commit(SET_USER_PROFILE, profile);
  },
  async [UPDATE_USER_PROFILE]({ commit, state, dispatch }, user) {
    await user_api.updateProfile(user);
    // dispatch(FETCH_USER_PROFILE);
    const { nickname } = state;
    commit(SET_USER_PROFILE, { nickname, ...user });
  },
};

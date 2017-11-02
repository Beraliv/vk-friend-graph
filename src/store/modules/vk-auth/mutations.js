import * as types from './types';

const mutations = {
  [types.AUTHORISE_FAILURE](state) {
    state.accessToken = null;
    state.expiresIn = null;
    state.userId = null;
  },

  [types.AUTHORISE_SUCCESS](state, { accessToken, expiresIn, userId }) {
    state.accessToken = accessToken;
    state.expiresIn = expiresIn;
    state.userId = userId;
  }
};

export default mutations;
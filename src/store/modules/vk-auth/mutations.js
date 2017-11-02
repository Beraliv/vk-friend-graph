import * as types from './types';

const mutations = {
  [types.AUTHORISE_FAILURE](state) {
    state.accessToken = null;
    state.userId = null;
  },

  [types.AUTHORISE_SUCCESS](state, { 'access_token': accessToken, 'user_id': userId }) {
    state.accessToken = accessToken;
    state.userId = userId;
  }
};

export default mutations;
import * as types from './types';

import { getProperty, combineGetters } from '../../../helpers/functions';

const actions = {
  authorise({ commit }) {
    const uri = getProperty(window, 'location', 'href');
    const params = combineGetters(
      uri,
      uri => uri.split('#'),
      parts => parts[1],
      keys => keys.split('&')
    );

    if (!params) {
      commit(types.AUTHORISE_FAILURE);
    }
    else {
      const [
        accessToken,
        expiresIn,
        userId
      ] = params;

      commit(types.AUTHORISE_SUCCESS, {
        accessToken,
        expiresIn,
        userId
      })
    }
  }
};

export default actions;
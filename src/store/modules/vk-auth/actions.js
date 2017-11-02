import * as types from './types';

import { combineGetters } from '../../../helpers/functions';
import { VK_TOKEN_KEY } from '../../../helpers/const';

const getParams = () => {
  let params = localStorage.getItem(VK_TOKEN_KEY);

  if (!params) {
    const parts = combineGetters(
      location,
      location => location.href,
      uri => uri.split('#')
    );

    params = combineGetters(
      parts,
      parts => parts[1],
      hashed => hashed.split('&'),
      pairs => pairs.map(pair => pair.split('=')),
      pairs => pairs.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
    );

    if (params) {
      localStorage.setItem(VK_TOKEN_KEY, params);
      location.href = parts[0];
    }
  }

  return params;
};

const actions = {
  authorise({ commit }) {
    const params = getParams();

    if (!params) {
      commit(types.AUTHORISE_FAILURE);
    }
    else {
      commit(types.AUTHORISE_SUCCESS, params)
    }
  }
};

export default actions;
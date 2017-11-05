import * as types from './types';

import {
  getAuthorisationData,
  setAuthorisationData,
  combineGetters
} from '../../../helpers/functions';

const getCredentials = () => {
  let credentials = getAuthorisationData();

  if (!credentials) {
    const parts = combineGetters(
      location,
      location => location.href,
      uri => uri.split('#')
    );

    credentials = combineGetters(
      parts,
      parts => parts[1],
      hashed => hashed.split('&'),
      pairs => pairs.map(pair => pair.split('=')),
      pairs => pairs.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
    );

    if (credentials) {
      setAuthorisationData(credentials);
      location.href = parts[0];
    }
  }

  return credentials;
};

const actions = {
  authorise({ commit }) {
    const credentials = getCredentials();

    if (!credentials) {
      commit(types.AUTHORISE_FAILURE);
    }
    else {
      commit(types.AUTHORISE_SUCCESS, credentials)
    }
  }
};

export default actions;
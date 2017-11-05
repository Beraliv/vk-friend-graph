import fetchJsonp from 'fetch-jsonp';

import {
  getAuthorisationData,
  chunkise,
  urlise,
  flatMap
} from '../../../helpers/functions';

import * as types from './types';

const vkMethodCall = (method, params) => {
  const uri = urlise(`https://api.vk.com/method/${method}`, {
    v: 'v=5.5.2',
    ...params
  });
  return fetchJsonp(uri).then(response => response.json());
};

const notDeactivated = users => {
  return users.filter(user => !user.deactivated);
};

function getFriends({ commit }) {
  const credentials = getAuthorisationData();
  if (!credentials) {
    return;
  }

  const { access_token, user_id } = credentials;
  commit(types.VK_GET_FRIENDS_REQUEST);

  return vkMethodCall('friends.get', {
    access_token,
    fields: [
      'first_name',
      'last_name',
      'deactivated'
    ].join(',')
  }).then(({ response: friends }) => {
    commit(types.VK_GET_FRIENDS_SUCCESS, { user_id, friends });
    return friends;
  }).catch(error => {
    commit(types.VK_GET_FRIENDS_FAILURE, { error });
  });
}

function getMutualFriends({ commit }, friends) {
  const credentials = getAuthorisationData();
  if (!credentials) {
    return;
  }

  const { access_token } = credentials;
  const notDeactivatedIds = notDeactivated(friends).map(user => user.user_id);
  commit(types.VK_GET_MUTUAL_FRIENDS_REQUEST);

  return Promise.all(chunkise(notDeactivatedIds).map(chunk => {
    return vkMethodCall('friends.getMutual', {
      access_token,
      target_uids: chunk.join(',')
    }).then(({ response }) => response);
  })).then(arrOfMutualFriends => {
    const connections = flatMap(arrOfMutualFriends);
    commit(types.VK_GET_MUTUAL_FRIENDS_SUCCESS, { connections });
    return connections;
  }).catch(error => {
    commit(types.VK_GET_MUTUAL_FRIENDS_FAILURE, { error });
  });
}

const actions = {
  collectData({ commit }) {
    console.warn('collecting starts...');
    getFriends({ commit }).then(users => {
      getMutualFriends({ commit }, users).then(() => {
        console.warn('collecting is ready!');
      });
    });
  }
};

export default actions;
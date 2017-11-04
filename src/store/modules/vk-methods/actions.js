import fetchJsonp from 'fetch-jsonp';

import {
  getAuthorisationData,
  chunkise,
  urlise,
  flatMap
} from '../../../helpers/functions';

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

// TODO: add function to actions, save data to state, use it in the component to render the graph
function getMutual({ commit }, friends) {
  const credentials = getAuthorisationData();
  if (!credentials) {
    return;
  }

  const { access_token } = credentials;
  const notDeactivatedIds = notDeactivated(friends).map(user => user.user_id);
  Promise.all(chunkise(notDeactivatedIds).map(chunk => {
    return vkMethodCall('friends.getMutual', {
      access_token,
      target_uids: chunk.join(',')
    }).then(({ response }) => response);
  })).then(arrOfMutualFriends => {
    const mutualFriends = flatMap(arrOfMutualFriends);
    console.log('json response', mutualFriends);
  }).catch(error => {
    console.log('error message', error);
  });
}

const actions = {
  getFriends({ commit }) {
    const credentials = getAuthorisationData();
    if (!credentials) {
      return;
    }

    const { access_token } = credentials;
    vkMethodCall('friends.get', {
      access_token,
      fields: [
        'first_name',
        'last_name',
        'deactivated'
      ].join(',')
    }).then(({ response: friends }) => {
      console.log('json response', friends);
      getMutual({ commit }, friends);
    }).catch(error => {
      console.log('error message', error);
    });
  }
};

export default actions;
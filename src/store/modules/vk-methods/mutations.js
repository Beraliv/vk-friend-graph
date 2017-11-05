import * as types from './types';

import {
  combineGetters
} from '../../../helpers/functions';

let deactivatedUserIds;
const notDeactivated = users => {
  deactivatedUserIds = combineGetters(
    users,
    users => users.filter(user => user.deactivated),
    notDeactivatedUsers => notDeactivatedUsers.map(user => user.user_id)
  ) || [];
  return combineGetters(
    users,
    users => users.filter(user => !user.deactivated)
  ) || [];
};

const nonRepeatingConnections = connections => {
  let result = new Map();
  for (let { common_friends, id: sid } of connections) {
    for (let tid of common_friends) {
      if (deactivatedUserIds.findIndex(id => id === tid) < 0) {
        let less = +sid < +tid;
        let value = less ? { sid, tid } : { sid: tid, tid: sid };
        if (!result.has(value.sid)) {
          result.set(value.sid, new Set());
        }
        let set = result.get(value.sid);
        set.add(value.tid);
      }
    }
  }
  return result;
};

const mutations = {
  [types.VK_GET_FRIENDS_REQUEST](state) {
    state.users = [];
    state.connections = [];
  },

  [types.VK_GET_FRIENDS_SUCCESS](state, { user_id, friends }) {
    const notDeactivatedFriends = notDeactivated(friends);
    state.users = [
      {
        id: user_id, name: 'Me'
      },
      ...notDeactivatedFriends.map(friend => ({
        id: friend.user_id,
        name: `${friend.first_name} ${friend.last_name}`
      }))
    ];
    state.connections = [
      ...notDeactivatedFriends.map(friend => ({
        sid: user_id,
        tid: friend.user_id
      }))
    ];
  },

  [types.VK_GET_FRIENDS_FAILURE](state, { error }) {
    state.users = [];
    state.connections = [];
    console.warn(types.VK_GET_FRIENDS_FAILURE, error);
  },

  [types.VK_GET_MUTUAL_FRIENDS_REQUEST](state) {},

  [types.VK_GET_MUTUAL_FRIENDS_SUCCESS](state, { connections } = {}) {
    const allNotRepeatingConnections = combineGetters(
      connections,
      connections => nonRepeatingConnections(connections),
      connections => [...connections]
    );

    state.connections = [
      ...state.connections,
      ...allNotRepeatingConnections.reduce((arr, [sid, tids]) => {
        const entries = [...tids].map(tid => ({
          sid,
          tid
        }));
        return [
          ...arr,
          ...entries
        ];
      }, [])
    ];
  },

  [types.VK_GET_MUTUAL_FRIENDS_FAILURE](state, { error }) {
    state.users = [];
    state.connections = [];
    console.warn(types.VK_GET_FRIENDS_FAILURE, error);
  }
};

export default mutations;
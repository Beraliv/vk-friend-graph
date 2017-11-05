import * as types from './types';

let deactivatedUserIds;
const notDeactivated = users => {
  deactivatedUserIds = users.filter(user => user.deactivated).map(user => user.user_id);
  return users.filter(user => !user.deactivated);
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

  [types.VK_GET_MUTUAL_FRIENDS_SUCCESS](state, { connections }) {
    let allNotRepeatingConnections = new Map();
    for (let { common_friends, id: sid } of connections) {
      for (let tid of common_friends) {
        if (deactivatedUserIds.findIndex(id => id === tid) < 0) {
          let less = +sid < +tid;
          let value = less ? { sid, tid } : { sid: tid, tid: sid };
          if (!allNotRepeatingConnections.has(value.sid)) {
            allNotRepeatingConnections.set(value.sid, new Set());
          }
          let set = allNotRepeatingConnections.get(value.sid);
          set.add(value.tid);
        }
      }
    }
    state.connections = [
      ...state.connections,
      ...[...allNotRepeatingConnections].reduce((arr, entry) => {
        const entries = [...entry[1]].map(id => ({
          sid: entry[0],
          tid: id
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
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
  users: [],
  connections: []
};

export default {
  state: initialState,
  actions,
  getters,
  mutations
};
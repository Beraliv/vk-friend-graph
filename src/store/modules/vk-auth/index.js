import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
	accessToken: null,
	userId: null
};

export default {
	state: initialState,
	actions,
	getters,
	mutations
};
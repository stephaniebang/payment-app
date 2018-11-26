import * as types from '../types';

const state = {
  // index of table to be shown in table tab view mode. When -1, table list is shown
  tableIndex: -1
};

const getters = {
  [types.INDEX]: state => state.tableIndex
};

const mutations = {
  /* Set tableIndex to value
   */
  [types.MUTATE_UPDATE_INDEX]: (state, value) => {
    state.tableIndex = value;
  }
};

const actions = {
  [types.UPDATE_INDEX]: ({ commit }, value) => {
    commit(types.MUTATE_UPDATE_INDEX, value);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

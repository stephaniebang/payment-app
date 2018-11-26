import Vue   from 'vue';
import Vuex  from 'vuex';

import index from './modules/index';
import table from './modules/table';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    index,
    table
  }
});

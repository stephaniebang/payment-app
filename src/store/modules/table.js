import * as types from '../types';

const state = {
  // Dummy data: tables with dishes are 1, 5 and 7
  tables: [
    { n: 1,
      dishes: [
        { name: 'Filé de Frango Acebolado',
          total: 22.60, left: 22.60, paying: 0, selected: false, history: [] },
        { name: 'Berinjela Recheada com Feijão Branco',
          total: 24.00, left: 24.00, paying: 0, selected: false, history: [] },
        { name: 'Creme de Espinafre',
          total: 15.50, left: 15.50, paying: 0, selected: false, history: [] },
        { name: 'Água sem Gás',
          total:  2.00, left:  2.00, paying: 0, selected: false, history: [] },
        { name: 'Salada com Pepino, Abóbora Seca, Rúcula e Alface',
          total: 20.00, left: 20.00, paying: 0, selected: false, history: [] },
        { name: 'Suco de Laranja',
          total:  5.50, left:  5.50, paying: 0, selected: false, history: [] },
        { name: 'Arroz Pilaf',
          total: 18.95, left: 18.95, paying: 0, selected: false, history: [] },
        { name: 'Pudim de Chocolate com Coco',
          total:  8.90, left:  8.90, paying: 0, selected: false, history: [] }] },
    { n: 2,
      dishes: [] },
    { n: 3,
      dishes: [] },
    { n: 4,
      dishes: [] },
    { n: 5,
      dishes: [
        { name: 'Farofa de Ovos',
          total:  9.90, left:  9.90, paying: 0, selected: false, history: [] },
        { name: 'Feijão Tropeiro',
          total: 19.65, left: 19.65, paying: 0, selected: false, history: [] },
        { name: 'Maionese de Batatas',
          total:  9.90, left:  9.90, paying: 0, selected: false, history: [] },
        { name: 'Moqueca Cearense',
          total: 31.00, left: 31.00, paying: 0, selected: false, history: [] },
        { name: 'Arroz Biro Biro',
          total: 22.50, left: 22.50, paying: 0, selected: false, history: [] },
        { name: 'Carne de Sol',
          total: 28.70, left: 28.70, paying: 0, selected: false, history: [] },
        { name: 'Suco de Melancia',
          total:  5.50, left:  5.50, paying: 0, selected: false, history: [] },
        { name: 'Soda',
          total:  4.00, left:  4.00, paying: 0, selected: false, history: [] },
        { name: 'Coca-Cola',
          total:  4.00, left:  4.00, paying: 0, selected: false, history: [] }] },
    { n: 6,
      dishes: [] },
    { n: 7,
      dishes: [
        { name: 'Picadinho de Filé com Ovo, Arroz, Feijão, Banana da Terra  Batatas Chips',
          total: 34.60, left: 34.60, paying: 0, selected: false, history: [] },
        { name: 'Pastéis (8 unidades)',
          total: 20.00, left: 20.00, paying: 0, selected: false, history: [] },
        { name: 'Peixe do Dia Empanado',
          total: 24.50, left: 24.50, paying: 0, selected: false, history: [] },
        { name: 'Heineken',
          total: 13.00, left: 13.00, paying: 0, selected: false, history: [] },
        { name: 'Soda',
          total:  4.00, left:  4.00, paying: 0, selected: false, history: [] }] },
    { n: 8,
      dishes: [] },
    { n: 9,
      dishes: [] },
    { n: 10,
      dishes: [] },
    { n: 11,
      dishes: [] },
    { n: 12,
      dishes: [] },
    { n: 13,
      dishes: [] },
    { n: 14,
      dishes: [] }
  ]
};

const getters = {
  // number of tables
  [types.NUMBER_TABLES]: state => state.tables.length,

  // infos of table of index i in table list
  [types.NUMBER_DISHES]: state => i =>
    state.tables[i].dishes.length,

  [types.TABLE_N]: state => i =>
    state.tables[i].n,

  [types.TABLE_PAYING]: state => i =>
    state.tables[i].dishes.reduce((total, dish) => total + dish.paying, 0),

  [types.TABLE_STATUS]: state => i =>
    (1 - state.tables[i].dishes.reduce((total, dish) => total + dish.left, 0) /
     state.tables[i].dishes.reduce((total, dish) => total + dish.total, 0)
    )*100,

  [types.TABLE_TOTAL]: state => i =>
    state.tables[i].dishes.reduce((total, dish) => total+dish.left, 0),

  // info of dish of index i in current table's dish list
  [types.DISH]: (state, getters, rootState) => i =>
    state.tables[rootState.index.tableIndex].dishes[i]
};

const mutations = {
  /* Pay all items of current table
   */
  [types.MUTATE_PAY_LEFT]: (state, ind) => {
    let i = 0;

    state.tables[ind].dishes.map((dish) => {
      if (dish.left > 0) {
        state.tables[ind].dishes[i].history.push(dish.left);
        state.tables[ind].dishes[i].left -= dish.left;
        state.tables[ind].dishes[i].paying = 0;
      }

      i++;
    });
  },

  /* Pay all pending items of current table, updating the total left cost and
   * each item's left cost and payment history
   */
  [types.MUTATE_PAY_SELECTED]: (state, ind) => {
    let i = 0;

    state.tables[ind].dishes.map((dish) => {
      if (dish.paying > 0) {
        state.tables[ind].dishes[i].history.push(dish.paying);
        state.tables[ind].dishes[i].left -= dish.paying;
        state.tables[ind].dishes[i].paying = 0;
      }

      i++;
    });
  },

  /* Set item as selected, triggering payment mode view only when the item
   * wasn't fully paid, or set it as unselected
   */
  [types.MUTATE_UPDATE_ITEM_SELECTION]: (state, { tableInd, ind }) => {
    state.tables[tableInd].dishes[ind].selected = !state.tables[tableInd].dishes[ind].selected;
  },

  /* Set the item payment to the given value. If value = 0, cancel dish 
   * payment.
   */
  [types.MUTATE_UPDATE_ITEM_PAYMENT]: (state, { tableInd, ind, value }) => {
    state.tables[tableInd].dishes[ind].paying = value;
  }
};

const actions = {
  [types.PAY_LEFT]: ({ commit, rootState }) => {
    let ind = rootState.index.tableIndex;

    commit(types.MUTATE_PAY_LEFT, ind);
  },

  [types.PAY_SELECTED]: ({ commit, rootState }) => {
    let ind = rootState.index.tableIndex;

    commit(types.MUTATE_PAY_SELECTED, ind);
  },

  [types.UPDATE_ITEM_SELECTION]: ({ commit, rootState }, ind) => {
    let tableInd = rootState.index.tableIndex;

    commit(types.MUTATE_UPDATE_ITEM_SELECTION, { tableInd, ind });
  },

  [types.UPDATE_ITEM_PAYMENT]: ({ commit, rootState }, { ind, value }) => {
    let tableInd = rootState.index.tableIndex;
    
    commit(types.MUTATE_UPDATE_ITEM_PAYMENT, { tableInd, ind, value });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}

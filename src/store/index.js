import Vue   from 'vue';
import Vuex  from 'vuex';

import {state} from './state';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // Table to be shown in table tab view mode
    tableIndex: -1,

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
  },

  mutations: {
    /* Set tableIndex to value. If value = -1, activate table list view mode,
     * else activate table tab view mode
     */
    updateTableIndex: (state, value) => {
      state.tableIndex = value;
    },

    /* Pay all items
     */
    payAllLeft: (state, ind) => {
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

    /* Pay all pending items, updating the total left cost and each item's left
     * cost and payment history
     */
    payAllSelected: (state, ind) => {
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
    changeItemSelection: (state, ind) => {
      state.tables[state.tableIndex].dishes[ind].selected = !state.tables[state.tableIndex].dishes[ind].selected;
    },

    /* Cancel payment for the given item
     */
    cancelPayment: (state, ind) => {
      state.tables[state.tableIndex].dishes[ind].paying = 0;
    },

    /* Set the item payment to the given value
     */
    updatePaymentValue: (state, arr) => {
      state.tables[state.tableIndex].dishes[arr[0]].paying = arr[1];
    }
  },

  actions: {
    updateTableIndex: ({ commit }, value) => {
      commit("updateTableIndex", value);
    },

    payAllLeft: ({ commit }, ind) => {
      commit("payAllLeft", ind);
    },

    payAllSelected: ({ commit }, ind) => {
      commit("payAllSelected", ind);
    },

    changeItemSelection: ({ commit }, ind) => {
      commit("changeItemSelection", ind);
    },

    cancelPayment: ({ commit }, ind) => {
      commit("cancelPayment", ind);
    },

    updatePaymentValue: ({ commit }, arr) => {
      commit("updatePaymentValue", arr);
    }
  },
  
  getters: {
    // current chosen table index. Is -1 when none
    tableIndex: state => state.tableIndex,

    // number of tables
    numTables: state => state.tables.length,

    // infos of table of index i in table list
    numDishes: state => i =>
      state.tables[i].dishes.length,

    tableNumber: state => i =>
      state.tables[i].n,

    tablePaying: state => i =>
      state.tables[i].dishes.reduce((total, dish) => total + dish.paying, 0),

    tableStatus: state => i =>
      (1 - state.tables[i].dishes.reduce((total, dish) => total + dish.left, 0) /
       state.tables[i].dishes.reduce((total, dish) => total + dish.total, 0)
      )*100,

    tableTotal: state => i =>
      state.tables[i].dishes.reduce((total, dish) => total+dish.left, 0),

    // info of dish of index i in current table's dish list
    dish: state => i =>
      state.tables[state.tableIndex].dishes[i]
  }
});

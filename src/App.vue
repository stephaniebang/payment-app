<template>
  <div class="app">
    <!-- Header -->
    <app-header :tableIndex="tableIndex" @goBack="goToTableList"/>

    <!-- Table list -->
    <table-list v-if="tableIndex < 0" @goToTab="goToTableTab"
                :tableList="tables" :tableIndex="tableIndex"/>

    <!-- ... or table tab -->
    <table-tab v-else @registerPayment="updateTable"
               :table="tables[tableIndex]"/>
  </div>
</template>


<script>
import TableList from './components/TableList.vue';
import TableTab  from "./components/TableTab.vue";
import Header    from "./components/Header.vue";

export default {
  components: {
    'app-header': Header,
    'table-list': TableList,
    'table-tab':  TableTab
  },

  data() {
    return{
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
    };
  },

  methods: {
    goToTableList(value) {
      /* Set tableIndex to -1 to activate table list view mode
       */
      this.tableIndex = -1;
    },

    goToTableTab(value) {
      /* Set tableIndex to the chosen table index to activate table tab view mode
       */
      this.tableIndex = value;
    },

    /* Update table list item when payment is made in table tab view mode
     */
    updateTable(value) {
      let [n, i] = [value.n, 0];

      // Find changed table in table list
      while (this.tables[i].n != n) 
        i++;

      this.tables[i] = value;
    }
  }
};
</script>


<style src="./styles/index.scss" lang="scss">
.app {
  display: grid;
  grid-template-areas:
    "header"
    "body"
    "body"
    "body"
    "body"
    "body";
  grid-template-rows: 10%;

  height: 100%;
  width: 100%;
}
</style>

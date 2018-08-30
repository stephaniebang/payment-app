<template>
<!-- Show table list... -->
<div v-if="showList" class="wrapper">
  <!-- Header -->
  <app-header title="MESAS" :isHome="showList"/>

  <!-- Table list -->
  <div class="table-list">
    <div class="table" v-for="(table, i) in tableList" @click="goToTableCheck(i)">
      <!-- Table number -->
      <div class="table-number">{{ table.n }}</div>

      <!-- Table tab left -->
      <div class="table-tab">
        R${{ tableTotal(table).toFixed(2) }}
      </div>

      <!-- Table payment status -->
      <div class="table-status-total" v-if="table.dishes.length > 0">
        <div class="table-status-paid" :style="{ width: getStatus(table)+'%' }"/>
      </div>
    </div>
  </div>
</div>

<!-- ... or show table tab -->
<table-tab-view v-else :table="selectedTable" :isHome="showList"
                @registerPayment="updateTable" @goBack="backToHome"/>
</template>


<script>
import TableTab from "./TableTab.vue";
import Header   from "./Header.vue";

export default {
  components: {
    "table-tab-view": TableTab,
    "app-header": Header
  },

  props: {
    // Array of tables
    tableList: {
      type: Array
    }
  },

  data() {
    return{
      // Flag: true when view mode is table list and false when table tab
      showList: true,
      // Table to be shown in table tab view mode
      selectedTable: null
    };
  },

  methods: {
    /* Return the sum of a table's left costs
     */
    tableTotal(table) {
      var total = 0;

      for (var i = 0; i < table.dishes.length; i++)
        total += table.dishes[i].left;

      return total;
    },

    /* Return how much, in percentage, was already paid
     */
    getStatus(table) {
      var t = 0;

      for (var i = 0; i < table.dishes.length; i++)
        t += table.dishes[i].total;

      console.log(parseFloat(this.tableTotal(table)/t));
      return (1-this.tableTotal(table)/t)*100;
    },

    /* Set view mode as table tab and prepare selected table to be shown
     */
    goToTableCheck(ind) {
      this.showList = false;
      this.selectedTable = this.tableList[ind];

      // Set table dish payment mode to false, so that when entering table tab view
      // mode, only the dish table is visible
      for (var i = 0; i < this.tableList[ind].dishes.length; i++)
        this.tableList[ind].dishes[i].selected = false;
    },

    /* Set table list flag to true when coming back from table tab view mode,
     * triggering table list view mode
     */ 
    backToHome(value) {
      this.showList = true;
    },

    /* Update table list item when payment is made in table tab view mode
     */
    updateTable(value) {
      var n = value.n;
      var i = 0

      // Find changed table in table list
      while (this.tableList[i].n != n) 
        i++;

      this.tableList[i] = value;
    }
  }
};
</script>


<style lang="scss" scoped>
$table-color: #33353A;
$status-back: #CCC3C5;
$status-front: #AC7B84;

.wrapper {
  display: grid;
  grid-template-areas:
    "header"
    "list"
    "list"
    "list"
    "list";
  grid-template-rows: 10%;

  height: 100%;
  width: 100%; 
}

.table-list {
  grid-area: list;
  align-self: stretch;

  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: space-around;
  padding: 0 0 2vh 1.5vw;
}

.table {
  display: grid;
  grid-template-areas:
    "number"
    "tab";

  margin: 2vh 2vw 0 0;
  padding: 1em;
  min-width: 12vw;
  max-width: 12vw;
  min-height: 10vh;
  max-height: 10vh;

  font-size: 4em;
  text-align: center;
  color: $table-color;
}

.table-number {
  grid-area: number;

  margin-bottom: 0.25em;
}

.table-tab {
  grid-area: tab;

  font-size: 0.5em;
}

.table-status-total {
  width: 100%;
  height: 0.3vw;
  margin-top: 1vw;

  background-color: $status-back;
}

.table-status-paid {
  height: 100%;

  background-color: $status-front;
}
</style>

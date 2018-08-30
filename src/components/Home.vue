<template>
<div v-if="showList" class="wrapper">
  <app-header title="MESAS" :isHome="showList"/>

  <div class="table-list">
    <div class="table" v-for="table in tableList" @click="goToTableCheck(table)">
      <div class="table-number">{{ table.n }}</div>

      <div class="table-tab">
        R${{ tableTotal(table).toFixed(2) }}
      </div>
    </div>
  </div>
</div>

<table-check v-else :table="selectedTable" :isHome="showList"
             @registerPayment="updateTable" @goBack="backToHome"/>
</template>


<script>
import TableCheck from "./TableCheck.vue";
import Header     from "./Header.vue";

export default {
  components: {
    "table-check": TableCheck,
    "app-header": Header
  },

  props: {
    tableList: {
      type: Array
    }
  },

  data() {
    return{
      showList: true,
      selectedTable: null
    };
  },

  methods: {
    tableTotal(table) {
      var total = 0;

      for (var i = 0; i < table.dishes.length; i++)
        total += table.dishes[i].left;

      return total;
    },

    goToTableCheck(table) {
      this.showList = false;
      this.selectedTable = table;
    },

    backToHome(value) {
      this.showList = true;
    },

    updateTable(value) {
      var n = value.n;
      var i = 0

      while (this.tableList[i].n != n) 
        i++;

      this.tableList[i] = value;
    }
  }
};
</script>


<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-areas:
    "header"
    "list"
    "list"
    "list"
    "list";

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

  border-radius: 1vh;
  margin: 2vh 1.5vw 0 0;
  padding: 1em;
  min-width: 15vw;
  max-width: 15vw;
  min-height: 10vh;
  max-height: 10vh;

  background-color: #B7A9A3;
  font-size: 4vh;
  text-align: center;
}

.table-number {
  grid-area: number;

  margin-bottom: 0.25em;
}

.table-tab {
  grid-area: tab;

  font-size: 2.5vh;
}
</style>

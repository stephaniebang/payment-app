<template>
<div class="table">
  <!-- Table number -->
  <div class="number">{{ table.n }}</div>

  <!-- Table tab left -->
  <div class="tab">
    R${{ tableTotal(table).toFixed(2) }}
  </div>

  <!-- Table payment status -->
  <div class="status-total" v-if="table.dishes.length > 0">
    <div class="paid" :style="{ width: getStatus(table)+'%' }"/>
  </div>
</div>
</template>

<script>
export default {
  props: {
    // table info
    table: {
      type: Object
    }
  },

  methods: {
    /* Return the sum of a table's left costs
     */
    tableTotal(table) {
      return table.dishes.reduce((total, dish) => total+dish.left, 0);
    },
    
    /* Return how much, in percentage, was already paid
     */
    getStatus(table) {
      return (1 - this.tableTotal(table)/table.dishes.reduce(
        (total, dish) => total+dish.total, 0)
      )*100;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/reference.scss';

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

  > .number {
    grid-area: number;

    margin-bottom: 0.25em;
  }

  > .tab {
    grid-area: tab;

    font-size: 0.5em;
  }

  > .status-total {
    width: 100%;
    height: 0.3vw;
    margin-top: 1vw;

    background-color: $status-back;
  }

  > .status-total > .paid {
    height: 100%;

    background-color: $status-front;
  }
}
</style>

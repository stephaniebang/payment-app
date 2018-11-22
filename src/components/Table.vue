<template>
<div class="table">
  <!-- Table number -->
  <div class="number">{{ tableNumber(ind) }}</div>

  <!-- Table tab left -->
  <div class="tab">R${{ tableTotal(ind).toFixed(2) }}</div>

  <!-- Table payment status -->
  <div class="status-total" v-if="numDishes(ind) > 0">
    <div class="paid" :style="{ width: tableStatus(ind)+'%' }"/>
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    // Table index
    ind: {
      type: Number
    }
  },

  computed: {
    ...mapGetters([
      'numDishes',
      'tableNumber',
      'tableStatus',
      'tableTotal'
    ])
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

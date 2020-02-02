<template>
<div class="table">
  <!-- Table number -->
  <div class="number">{{ n }}</div>

  <!-- Table tab left -->
  <div class="tab">R${{ total.toFixed(2) }}</div>

  <!-- Table payment status -->
  <div class="status-total" v-if="dishes > 0">
    <div class="paid" :style="{ width: perc+'%' }"/>
  </div>
</div>
</template>

<script>
export default {
  props: {
    // table number
    n: { type: Number },
    // table total value
    total: { type: Number },
    // table dish number
    dishes: { type: Number },
    // table status
    perc: { type: Number }
  }
}
</script>

<style lang="scss">
@import '~styles/reference.scss';

.table {
  display: grid;
  grid-template-areas:
    "number"
    "tab";

  // margin: 2vh 2vw 0 0;
  padding: 1em;
  min-width: 12vw;
  max-width: 12vw;
  min-height: 10vh;
  max-height: 10vh;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 4em;
  color: $table-color;

  & > .number {
    grid-area: number;

    margin-bottom: 0.25em;
  }

  & > .tab {
    grid-area: tab;

    font-size: 0.5em;
  }

  & > .status-total {
    width: 100%;
    height: 0.3vw;
    margin-top: 1vw;

    background-color: $status-back;
  }

  & > .status-total > .paid {
    height: 100%;

    background-color: $status-front;
  }
}
</style>

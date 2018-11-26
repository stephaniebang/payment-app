<template>
<div class="tab">
  <!-- Total unpaid tab -->
  <total-value style="{ gridArea: 'total' }"/>

  <!-- List of dishes -->
  <div class="list">
    <item v-for="i in numDishes(tableIndex)" :ind="i-1"/>

    <!-- Pay all items button -->
    <all-button v-if="tableTotal(tableIndex) > 0"/>
  </div>
  
  <!-- Pay all selected items button -->
  <selected-button v-if="tableTotal(tableIndex) > 0"/>
</div>
</template>


<script>
import Total             from "./Total.vue";
import Item              from "./Item.vue";
import PayAllButton      from "./PayAllButton.vue";
import PaySelectedButton from "./PaySelectedButton.vue";

import { mapGetters } from "vuex";
import * as types from "../store/types";

export default {
  components: {
    "total-value": Total,
    "item": Item,
    "all-button": PayAllButton,
    "selected-button": PaySelectedButton
  },

  computed: {
    ...mapGetters({
      numDishes:  types.NUMBER_DISHES,
      tableTotal: types.TABLE_TOTAL,
      tableIndex: types.INDEX
    })
  }
};
</script>


<style lang="scss" scoped>
.tab {
  grid-area: body;

  display: grid;
  grid-template-areas:
    "total"
    "list"
    "list"
    "list"
    "button";
  grid-template-rows: 10%;

  height: 100%;
  width: 100%;

  > .list {
    grid-area: list;

    display: flex;
    flex-flow: column;
    padding: 1.5vh 2vh;
    overflow-y: auto;
  }
}
</style>

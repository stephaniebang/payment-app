<template>
<div class="tab">
  <!-- Total unpaid tab -->
  <total-tab :value="tableTotal(tableIndex)"/>

  <!-- List of dishes -->
  <div class="list">
    <item
      v-for="i in numDishes(tableIndex)"
      :key="`dish-${i}`"
      :ind="i-1"
    />

    <!-- Pay all items button -->
    <all-button v-if="tableTotal(tableIndex) > 0"/>
  </div>
  
  <!-- Pay all selected items button -->
  <selected-button v-if="tableTotal(tableIndex) > 0"/>
</div>
</template>


<script>
import Item              from "./Dish.vue";
import TotalTab          from "../components/TotalTab.vue";
import PayAllButton      from "../components/PayAllButton.vue";
import PaySelectedButton from "../components/PaySelectedButton.vue";

import { mapGetters } from "vuex";
import * as types from "../store/types";

export default {
  components: {
    "total-tab":       TotalTab,
    "item":            Item,
    "all-button":      PayAllButton,
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


<style lang="scss">
.tab {
  grid-area: body;

  display: grid;
  grid-template-areas:
    "total"
    "list"
    "list"
    "list"
    "button";

  height: 100%;
  width: 100%;

  & > .list {
    grid-area: list;

    display: flex;
    flex-flow: column;
    padding: 1.5vh 2vh;
    overflow-y: auto;
    margin-bottom: 75px;

    & > .all-button { border-bottom: none }
  }
}
</style>

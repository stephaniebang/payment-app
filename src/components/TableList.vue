<template>
<div class="list">
  <item v-for="(t, i) in tableList" @click.native="goToTab(i)"
        :table="t"/>
</div>
</template>


<script>
import Table from "./Table.vue";

export default {
  components: {
    "item": Table
  },

  props: {
    // Array of tables
    tableList: {
      type: Array
    },

    // Index of the table to be shown in table tab view mode
    tableIndex: {
      type: Number
    }
  },

  methods: {
    /* Set view mode as table tab and prepare selected table to be shown
     */
    goToTab(ind) {
      // Set table dish payment mode to false, so that when entering table tab view
      // mode, only the dish table is visible
      this.tableList[ind].dishes.map((dish) => dish.selected = false);

      this.$emit("goToTab", ind);
    }
  }
};
</script>


<style lang="scss" scoped>
.list {
   grid-area: body;
   align-self: stretch;

   display: flex;
   flex-flow: row wrap;
   align-content: flex-start;
   justify-content: space-around;
   padding: 0 0 2vh 1.5vw;
}
</style>

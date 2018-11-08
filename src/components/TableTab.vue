<template>
<div class="tab">
  <!-- Total unpaid tab -->
  <total-value :value="getTotalLeft()" style="{ gridArea: 'total' }"/>

  <!-- List of dishes -->
  <div class="list">
    <item v-for="(dish, i) in dishes" :dish="dish"/>

    <!-- Pay all items button -->
    <all-button v-if="getTotalLeft() > 0" @click.native="payAllLeft"
                :total="getTotalLeft()"/>
  </div>
  
  <!-- Pay all selected items button -->
  <selected-button v-if="getTotalLeft() > 0" @click.native="payAllSelected"
                   :total="getTotalPaying()"/>
</div>
</template>


<script>
import Total             from "./Total.vue";
import Item              from "./Item.vue";
import PayAllButton      from "./PayAllButton.vue";
import PaySelectedButton from "./PaySelectedButton.vue";

export default {
  components: {
    "total-value": Total,
    "item": Item,
    "all-button": PayAllButton,
    "selected-button": PaySelectedButton
  },

  props: {
    // current table
    table: {
      type: Object
    }
  },

  data() {
    return {
      dishes: this.table.dishes
    };
  },

  methods: {
    /* Retun the total cost left
     */
    getTotalLeft() {
      return this.dishes.reduce((total, dish) => total+dish.left, 0);
    },
    
    /* Return the sum of all payments being made
     */
    getTotalPaying() {
      return this.dishes.reduce((total, dish) => total+dish.paying, 0);
    },

    /* Pay all items
     */
    payAllLeft() {
      let i = 0;

      this.dishes.map((dish) => {
        if (dish.left > 0) this.payItem(i, dish.left);

        i++;
      });
    },

    /* Pay all pending items, updating the total left cost and each item's left
     * cost and payment history
     */
    payAllSelected() {
      let i = 0;

      this.dishes.map((dish) => {
        if (dish.paying > 0) this.payItem(i, dish.paying);

        i++;
      });

      // Updates parent component dish list
      this.table.dishes = this.dishes;
      this.$emit("registerPayment", this.table);
    },

    /* Pay item, given its index and the payment value
     */
    payItem(ind, payment) {
      this.dishes[ind].history.push(payment);
      this.dishes[ind].left -= payment;
      this.dishes[ind].paying = 0;
    }
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

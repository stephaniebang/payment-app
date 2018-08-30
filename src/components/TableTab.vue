<template>
<div class="tab-wrapper">
  <!-- Header -->
  <app-header :title="headerTitle" :isHome="isHome" @goBack="goBack"/>

  <!-- Total unpaid tab -->
  <div class="total-remaining">R${{ getTotalLeft().toFixed(2) }}</div>

  <!-- List of dishes -->
  <div class="list">
    <div class="item" v-for="(dish, i) in dishes">
      <!-- Dish name -->
      <div class="item-name" @click="selectItem(i)">{{ dish.name }}</div>
      
      <!-- Dish unpaid status or... -->
      <div v-if="dish.left > 0" class="item-unpaid">
        <!-- Dish total unpaid value -->
        <div class="item-value cost" @click="selectItem(i)">
          R${{ dish.left.toFixed(2) }}
        </div>

        <!-- Dish current payment setting -->
        <div v-if="dish.paying > 0" class="item-value paying" @click="cancelPay(i)">
          <span>R${{ dish.paying.toFixed(2) }}</span>
          <span :style="{ marginLeft: '2vw', fontFamily: 'Arial', fontSize: '0.75em', paddingTop: '0.3vh' }">X</span>
        </div>
      </div>

      <!-- ... dish paid status -->
      <div v-else class="item-paid">
        <done-icon class="check-icon"/>
      </div>

      <!-- Item payment edit mode -->
      <item-payment-mode v-if="dish.selected" class="item-payment"
       :itemList="dishes" :ind="i" @itemUnselected="dishes = $event"/>
    </div>

    <!-- Pay all items button -->
    <div v-if="getTotalLeft() > 0" class="option-button" @click="payAllLeft">
      PAGAR TUDO (R${{ getTotalLeft().toFixed(2) }})
    </div>
  </div>
  
  <!-- Pay all selected items button -->
  <div v-if="getTotalLeft() > 0" class="pay-button" @click="payAllSelected">
    PAGAR R${{ getTotalPaying().toFixed(2) }}
  </div>
</div>
</template>


<script>
import "vue-material-design-icons/styles.css";
import DoneIcon        from "vue-material-design-icons/Check.vue";
import Header          from "./Header.vue";
import ItemPaymentMode from "./ItemPaymentMode.vue";

export default {
  components: {
    "done-icon": DoneIcon,
    "app-header": Header,
    "item-payment-mode": ItemPaymentMode
  },

  props: {
    // current table
    table: {
      type: Object
    },

    // flag that is true when view mode is table list and false when it is table tab
    isHome: {
      type: Boolean
    }
  },

  data() {
    return {
      headerTitle: "MESA "+this.table.n,
      dishes: this.table.dishes
    };
  },

  methods: {
    /* Retun the total cost left
     */
    getTotalLeft() {
      var total = 0;

      for (var i = 0; i < this.dishes.length; i++)
        total += this.dishes[i].left;

      return total;
    },
    
    /* Return the sum of all payments being made
     */
    getTotalPaying() {
      var total = 0;

      for (var i = 0; i < this.dishes.length; i++)
        total += this.dishes[i].paying;

      return total;
    },

    /* Set item as selected, triggering payment mode view only when the item
     * wasn't fully paid
     */
    selectItem(ind) {
      this.dishes[ind].selected = !this.dishes[ind].selected;
    },

    /* Cancel payment for the given item
     */
    cancelPay(ind) {
      this.dishes[ind].paying = 0;
    },

    /* Pay all items
     */
    payAllLeft() {
      for (var i = 0; i < this.dishes.length; i++)
        if (this.dishes[i].left > 0) 
          this.payItem(i, this.dishes[i].left);
    },

    /* Pay all pending items, updating the total left cost and each item's left
     * cost and payment history
     */
    payAllSelected() {
      for (var i = 0; i < this.dishes.length; i++)
        if (this.dishes[i].paying > 0) 
          this.payItem(i, this.dishes[i].paying);

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
    },

    /* Set view status to table list and triggers table list view
     */
    goBack(value) {
      this.isHome = true;
      this.$emit("goBack", this.isHome);
    }
  }
};
</script>


<style lang="scss" scoped>
$item-name-color: #33353A;
$price-left-color: #8E524B;
$price-pay-color: #6B95BF;
$pay-part-back-color: #7ECC8A;
$pay-part-font-color: #3A5E3F;
$cancel-button-back-color: #C9C8C3;
$cancel-button-font-color: #686765;
$pay-all-back-color: #80B3E5;
$pay-all-font-color: #304A63;

.tab-wrapper {
  display: grid;
  grid-template-areas:
    "header"
    "total"
    "list"
    "list"
    "list"
    "button";
  grid-template-rows: 10%;

  height: 100%;
  width: 100%;
}

.total-remaining {
  grid-area: total;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 10vw;
  border-radius: 0.5vh;

  font-size: 8em;
  color: $price-left-color;
}

.list {
  grid-area: list;

  display: flex;
  flex-flow: column;
  padding: 1.5vh 2vh;
  overflow-y: auto;
}

.item {
  display: grid;
  grid-template-areas:
    "name name name status"
    "edit edit edit edit";
  grid-auto-columns: 25%;
  
  padding: 1vh 0.5vw;
  margin: 1vh 2vw 1.5vh 2vw;
  border-bottom: 0.05em solid #CCC3C5;
}

.item:last-child {
  margin-bottom: 2vh;
}

.item-name {
  grid-area: name;
  margin-right: 2vw;

  font-size: 2.2em;
  color: $item-name-color;
}

.item-unpaid {
  grid-area: status;

  display: flex;
  flex-flow: column;
  align-content: flex-start;
  justify-content: center;
}

.item-value {
  display: flex;
  flex-flow: column;
  justify-items: center;

  padding: 0.5vh 0.6vw;
  border-radius: 0.7vh;

  font-size: 2.2em;
}

.item-value.cost {
  color: $price-left-color;
}

.item-value.paying {
  display: flex;
  flex-flow: row;
  margin-top: 1vh;

  color: $price-pay-color;
}

.item-paid {
  grid-area: status;
  justify-self: center;
  align-self: center;

  margin-right: 5vw;
  min-height: 1.1em;
  max-height: 1.1em;
  min-width: 1.1em;
  max-width: 1.1em;

  font-size: 2.8em;
  color: $pay-part-back-color;
}

.check-icon {
  position: relative;
}

.item-payment {
  grid-area: edit;
}

.option-button {
  padding: 1vh 1vw;
  margin: 1.5vh 1.5vw 10vh 1.5vw;
  border-radius: 0.1em;

  font-size: 3vh;
  text-align: center;

  background-color: $pay-all-back-color;
  color: $pay-all-font-color;
}

.pay-button {
  grid-area: button;

  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  padding: 2vh 8vw 2vh 0;

  font-size: 4vh;
  background-color: $pay-part-back-color;
  color: $pay-part-font-color;
}
</style>

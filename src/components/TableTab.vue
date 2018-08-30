<template>
<div class="wrapper">
  <app-header :title="headerTitle" :isHome="isHome" @goBack="goBack"/>

  <div class="total-remaining">R${{ calculateTotal().toFixed(2) }}</div>

  <div class="list">
    <div class="item" v-for="(dish, i) in dishes">
      <div class="item-name" @click="selectItem(i)">{{ dish.name }}</div>
      
      <div v-if="dish.left > 0" class="item-unpaid" @click="selectItem(i)">
        <div class="item-value cost">R${{ dish.left.toFixed(2) }}</div>
        <div v-if="dish.paying > 0" class="item-value paying">R${{ dish.paying.toFixed(2) }}</div>
      </div>

      <div v-else class="item-paid">
        <done-icon class="check-icon"/>
      </div>

      <item-payment-mode v-if="dish.selected" class="item-payment"
       :itemList="dishes" :ind="i" @itemUnselected="dishes = $event"/>
    </div>
  </div>

  <div class="pay-button" @click="payItems">
    PAGAR
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
    table: {
      type: Object
    },

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
    itemSelected(ind) {
      this.dishes[ind].selected = 1;
    },

    payItems() {
      var paid = 0;

      for (var i = 0; i < this.dishes.length; i++)
        if (this.dishes[i].selected === 1) {
          paid += this.dishes[i].price;
          this.dishes[i].selected = 2;
        }

      this.total = this.calculateTotal();
    },

    calculateTotal() {
      var t = 0;

      for (var i = 0; i < this.dishes.length; i++)
        t += this.dishes[i].left;

      return t;
    },

    selectItem(ind) {
      if (this.dishes[ind].left > 0)
        this.dishes[ind].selected = true;
    },

    payItems() {
      for (var i = 0; i < this.dishes.length; i++) {
        this.dishes[i].left -= this.dishes[i].paying;
        this.dishes[i].paying = 0;
      }

      this.table.dishes = this.dishes;
      this.$emit("registerPayment", this.table);
    },

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
$pay-back-color: #7ECC8A;
$pay-font-color: #3A5E3F;

.wrapper {
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
  margin-bottom: 10vh;
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
  color: $pay-back-color;
}

.check-icon {
  position: relative;
}

.item-payment {
  grid-area: edit;
}

.pay-button {
  grid-area: button;

  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2vh 8vw 2vh 0;

  font-size: 4vh;
  background-color: $pay-back-color;
  color: $pay-font-color;
}
</style>

<template>
<div class="itemEdit">
  <!-- Item total value and payment history -->
  <dish-status @click.native="changeItemSelection(ind)"
               :history="dish(ind).history" :total="dish(ind).total"/>
  
  <!-- Item payment setting -->
  <div class="setting" v-if="dish(ind).left > 0">
    <!-- Full payment option -->
    <pay-button @click.native="pay(dish(ind).left)"
                :text="'PAGAR TUDO (R$'+dish(ind).left.toFixed(2)+')'"/>
    
    <p>ou</p>

    <!-- Divided payment option -->
    <div class="option">
      <p>Dividir a conta em </p>
      <input type="number" v-model="divisor" min="2" style="width: 8vw"/>
    </div>
    <pay-button @click.native="pay(dividedValue())"
                :text="'PAGAR DIVIDIDO (R$'+dividedValue().toFixed(2)+')'"/>
    
    <p>ou</p>
    
    <!-- Partial payment mode -->
    <div class="option">
      <p>Pagar apenas </p>
      <input type="number" v-model="partial" min="0.00" max="dish.left" step="0.01" style="width: 15vw"/>
    </div>
    <pay-button @click.native="pay(partialValue())"
                :text="'PAGAR PARTE (R$'+partialValue().toFixed(2)+')'"/>

    <!-- Close button -->
    <close-button @click.native="changeItemSelection(ind)"/>
  </div>
</div>
</template>


<script>
import CloseButton      from "../components/CloseButton.vue";
import SetPaymentButton from "../components/SetPaymentButton.vue";
import DishStatus       from "../components/DishStatus.vue";

import { mapGetters, mapActions } from "vuex";
import * as types from "../store/types"

export default {
  components: {
    "close-button": CloseButton,
    "pay-button":   SetPaymentButton,
    "dish-status":  DishStatus
  },

  props: {
    // dish index
    ind: {
      type: Number
    }
  },

  data() {
    return {
      // Divisor to equally divide the dish's left cost
      divisor: 2,
      // Partial value of the dish's left cost
      partial: 0,
    };
  },

  computed: {
    ...mapGetters({
      dish: types.DISH
    })
  },

  methods: {
    ...mapActions({
      changeItemSelection: types.UPDATE_ITEM_SELECTION,
      updatePaymentValue:  types.UPDATE_ITEM_PAYMENT
    }),

    /* Return the dish's left cost divided by the chosen divisor
     */
    dividedValue() {
      if (this.divisor <= 0) return 0;

      return(this.dish(this.ind).left/parseInt(this.divisor));
    },

    /* Return the dish's chosen partial payment. It forces the payment to be a
     * vaue between 0 and the dish's total left cost
     */
    partialValue() {
      if (!this.partial || isNaN(this.partial)) this.partial = 0;
      if (this.partial > this.dish(this.ind).left) this.partial = this.dish(this.ind).left;
      
      return(parseFloat(this.partial));
    },

    /* Set item payment and close item edit mode */
    pay(value) {
      this.updatePaymentValue({ ind: this.ind, value: value });
      this.changeItemSelection(this.ind);
    }
  }
};
</script>


<style lang="scss" scoped>
@import '~styles/reference.scss';

.itemEdit {
  grid-area: edit;

  display: grid;
  grid-template-areas:
    "info"
    "button";

  margin: 1vh 8vw;
  padding: 0 3vw;

  > .setting {
    grid-area: button;

    margin-top: 2vh;

    display: flex;
    flex-flow: column;
  }

  > .setting > .option {
    display: flex;
    flex-flow: row;

    margin-bottom: 1.5vh;
    justify-content: center;
  }
}
</style>

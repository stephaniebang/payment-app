<template>
<div class="item-edit">
  <!-- Item total value and payment history -->
  <div class="status" @click="close()">
    <p>Preço total do prato: R${{ dish.total.toFixed(2) }}</p>
    <p>Histórico de pagamentos:</p>
    <p v-for="(val, i) in dish.history" class="history">{{ i+1 }}. R${{ (val).toFixed(2) }}</p>
    <p v-if="dish.history.length === 0" class="history">Nenhum pagamento realizado</p>
  </div>
  
  <!-- Item payment setting -->
  <div class="payment" v-if="dish.left > 0">
    <!-- Full payment option -->
    <div class="button pay" @click="pay(dish.left)">
      PAGAR TUDO (R${{ dish.left.toFixed(2) }})
    </div>
    
    <p>ou</p>

    <!-- Divided payment option -->
    <div class="partial-pay-option">
      <p>Dividir a conta em </p>
      <input type="number" v-model="divisor" min="2" style="width: 8vw"/>
    </div>
    <div class="button pay" @click="pay(dividedValue())">
      PAGAR DIVIDIDO (R${{ dividedValue().toFixed(2) }})
    </div>
    
    <p>ou</p>
    
    <!-- Partial payment mode -->
    <div class="partial-pay-option">
      <p>Pagar apenas </p>
      <input type="number" v-model="partial" min="0.00" max="dish.left" step="0.01" style="width: 15vw"/>
    </div>
    <div class="button pay" @click="pay(partialValue())">
      PAGAR PARTE (R${{ partialValue().toFixed(2) }})
    </div>

    <!-- Close button -->
    <div class="button close" @click="close()">FECHAR</div>
  </div>
</div>
</template>


<script>
export default {
  props: [
    // Array of current table's dishes
    'itemList',
    // Index of current dish
    'ind'
  ],

  data() {
    return {
      // Current dish
      dish: this.itemList[this.ind],
      // Divisor to equally divide the dish's left cost
      divisor: 2,
      // Partial value of the dish's left cost
      partial: 0,
    };
  },

  methods: {
    /* Return the dish's left cost divided by the chosen divisor
     */
    dividedValue() {
      if (this.divisor <= 0) return 0;

      return(this.dish.left/parseInt(this.divisor));
    },

    /* Return the dish's chosen partial payment. It forces the payment to be a
     * vaue between 0 and the dish's total left cost
     */
    partialValue() {
      if (!this.partial || isNaN(this.partial)) this.partial = 0;
      if (this.partial > this.dish.left) this.partial = this.dish.left;
      
      return(parseFloat(this.partial));
    },

    /* Set the item payment with the chosen method
     */
    pay(value) {
      this.itemList[this.ind].paying = value;
      this.close();
    },

    /* Set item as unselected, updating its payment mode in the parent component
     */
    close() {
      this.itemList[this.ind].selected = false;
      this.$emit("itemUnselected", this.itemList);
    }
  }
};
</script>


<style lang="scss" scoped>
$normal-text-color: #434854;
$pay-button-back-color: #80B3E5;
$pay-button-font-color: #304A63;
$cancel-button-back-color: #C9C8C3;
$cancel-button-font-color: #686765;

input {
  font-size: 1em;
  padding: 0;
  color: $normal-text-color;
}

p {
  margin: 0.4vh;
  text-align: center;
  color: $normal-text-color;
}

.item-edit {
  display: grid;
  grid-template-areas:
    "info"
    "button";

  margin: 1vh 8vw;
  padding: 0 3vw;

  font-size: 2.1em;
}

.status {
  grid-area: info;

  display: flex;
  flex-flow: column;
  justify-content: space-around;

  color: $normal-text-color;
}

.history {
  margin: 0;
  
  font-size: 0.9em;
}

.payment {
  grid-area: button;

  margin-top: 2vh;

  display: flex;
  flex-flow: column;
}

.button {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 1vh 1vw;
  border-radius: 0.1em;
}

.button.pay {
  background-color: $pay-button-back-color;
  color: $pay-button-font-color;
}

.button.close {
  margin-top: 1.5vh;

  background-color: $cancel-button-back-color;
  color: $cancel-button-font-color;
}

.partial-pay-option {
  display: flex;
  flex-flow: row;
  margin-bottom: 1.5vh;
  justify-content: center;
}
</style>

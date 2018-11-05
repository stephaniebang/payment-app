<template>
<div class="itemEdit">
  <!-- Item total value and payment history -->
  <div class="status" @click="close()">
    <p>Preço total do prato: R${{ dish.total.toFixed(2) }}</p>
    <p>Histórico de pagamentos:</p>
    <p v-for="(val, i) in dish.history" class="history">{{ i+1 }}. R${{ (val).toFixed(2) }}</p>
    <p v-if="dish.history.length === 0" class="history">Nenhum pagamento realizado</p>
  </div>
  
  <!-- Item payment setting -->
  <div class="setting" v-if="dish.left > 0">
    <!-- Full payment option -->
    <div class="button pay" @click="pay(dish.left)">
      PAGAR TUDO (R${{ dish.left.toFixed(2) }})
    </div>
    
    <p>ou</p>

    <!-- Divided payment option -->
    <div class="option">
      <p>Dividir a conta em </p>
      <input type="number" v-model="divisor" min="2" style="width: 8vw"/>
    </div>
    <div class="button pay" @click="pay(dividedValue())">
      PAGAR DIVIDIDO (R${{ dividedValue().toFixed(2) }})
    </div>
    
    <p>ou</p>
    
    <!-- Partial payment mode -->
    <div class="option">
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
  props: {
    // current dish
    dish: {
      type: Object
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
      this.$emit("payment", value);
      this.close();
    },

    /* Set item as unselected, updating its payment mode in the parent component
     */
    close() {
      this.$emit("itemUnselected", false);
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

  font-size: 2.1em;

  > .status {
    grid-area: info;

    display: flex;
    flex-flow: column;
    justify-content: space-around;

    color: $normal-text-color;
  }

  > .status > .history {
    margin: 0;
    
    font-size: 0.9em;
  }

  > .setting {
    grid-area: button;

    margin-top: 2vh;

    display: flex;
    flex-flow: column;
  }

  > .setting > .button {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 1vh 1vw;
    border-radius: 0.1em;
  }

  > .setting > .button.pay {
    background-color: $pay-button-back-color;
    color: $pay-button-font-color;
  }

  > .setting > .option {
    display: flex;
    flex-flow: row;
    margin-bottom: 1.5vh;
    justify-content: center;
  }

  > .setting > .button.close {
    margin-top: 1.5vh;

    background-color: $cancel-button-back-color;
    color: $cancel-button-font-color;
  }
}
</style>

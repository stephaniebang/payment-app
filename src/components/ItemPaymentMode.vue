<template>
<div class="item-edit">
  <div class="status">
    <p>Preço total do prato: R${{ dish.total.toFixed(2) }}</p>
    <p>Pagamentos feitos:</p>
    <p v-for="val in dish.history">R${{ (val).toFixed(2) }}</p>
  </div>
  
  <div class="payment">
    <div class="button pay" @click="pay(dish.left)">
      PAGAR TUDO (R${{ dish.left.toFixed(2) }})
    </div>
    
    <p>ou</p>

    <div class="partial-pay-option">
      <p>Dividir a conta em </p>
      <input type="number" v-model="divisor" min="2" style="width: 8vw"/>
    </div>
    <div class="button pay" @click="pay(dividedValue())">
      PAGAR DIVIDIDO (R${{ dividedValue().toFixed(2) }})
    </div>
    
    <p>ou</p>
    
    <div class="partial-pay-option">
      <p>Pagar apenas </p>
      <input type="number" v-model="partial" min="0.00" max="dish.left" step="0.01" style="width: 15vw"/>
    </div>
    <div class="button pay" @click="pay(partialValue())">
      PAGAR PARTE (R${{ partialValue().toFixed(2) }})
    </div>
    
    <div class="button cancel" @click="close()">CANCELAR</div>
  </div>
</div>
</template>


<script>
export default {
  props: [
    'itemList', 'ind'
  ],

  data() {
    return {
      dish: this.itemList[this.ind],
      divisor: 2,
      partial: 0,
    };
  },

  methods: {
    nome() {
      return(this.dish.name);
    },

    dividedValue() {
      if (this.divisor <= 0) return 0;

      return(this.dish.left/parseInt(this.divisor));
    },

    partialValue() {
      if (!this.partial || isNaN(this.partial)) this.partial = 0;
      if (this.partial > this.dish.left) this.partial = this.dish.left;
      
      return(parseFloat(this.partial));
    },

    pay(value) {
      this.itemList[this.ind].paying = value;
      this.close();
    },

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
  margin: 0.7vh;
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

  font-size: 2em;
}

.status {
  grid-area: info;

  display: flex;
  flex-flow: column;
  justify-content: space-around;
  margin-bottom: 3vh;

  color: $normal-text-color;
}

.payment {
  grid-area: button;

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

.button.cancel {
  margin-top: 2.5vh;

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

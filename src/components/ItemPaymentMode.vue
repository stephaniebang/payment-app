<template>
<div class="item-edit">
  <div class="status">
    <span>Preço total do prato: R${{ dish.total.toFixed(2) }}</span>
    <span>Total pago até agora: R${{ (dish.total-dish.left).toFixed(2) }}</span>
  </div>
  
  <div class="payment">
    <div class="pay-button" @click="pay(dish.left)">
      PAGAR TUDO (R${{ dish.left.toFixed(2) }})
    </div>
    
    <p>OU</p>

    <div class="partial-pay-option">
      <p>Dividir a conta em </p>
      <input type="number" v-model="divisor" min="2" style="width: 8vw"/>
    </div>
    <div class="pay-button" @click="pay(dividedValue())">
      PAGAR DIVIDIDO (R${{ dividedValue().toFixed(2) }})
    </div>
    
    <p>OU</p>
    
    <div class="partial-pay-option">
      <p>Pagar apenas </p>
      <input type="number" v-model="partial" min="0.00" max="dish.left" step="0.01" style="width: 15vw"/>
    </div>
    <div class="pay-button" @click="pay(partialValue())">
      PAGAR PARTE (R${{ partialValue().toFixed(2) }})
    </div>
    
    <div class="cancel-button" @click="close()">CANCELAR</div>
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
.item-edit {
  display: grid;
  grid-template-areas:
    "info"
    "button";

  margin: 1vh 4vw;
  border-radius: 1vh;
  padding: 2vh 3vw;

  background-color: #E5DCDE;
}

.status {
  grid-area: info;

  display: flex;
  flex-flow: column;
  justify-content: space-around;
  margin-bottom: 2vh;

  font-size: 2.4em;
}

.payment {
  grid-area: button;

  display: flex;
  flex-flow: column;

  font-size: 2.4em;
}

.pay-button {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 1vh 1vw;
  border-radius: 1vh;

  background-color: #5EC4FF;
}

.partial-pay-option {
  display: flex;
  flex-flow: row;
  margin-bottom: 1.5vh;
  justify-content: center;
}

.cancel-button {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 1vh 1vw;
  border-radius: 1vh;
  margin-top: 2.5vh;

  background-color: brown;
}

input {
  font-size: 1em;
  padding: 0;
}

p {
  margin: 0.7vh;
  text-align: center;
}
</style>

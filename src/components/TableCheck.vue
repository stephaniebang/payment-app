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

  <button class="pay-button" @click="payItems">
    PAGAR
  </button>
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
    tableNum: {
      type: Number
    },

    isHome: {
      type: Boolean
    }
  },

  data() {
    return {
      headerTitle: "MESA "+this.tableNum,
      dishes: [
        { name: 'Filé de Frango Acebolado',
          total: 22.60, left: 22.60, paying: 0, selected: false },
        { name: 'Berinjela Recheada com Feijão Branco',
          total: 24.00, left: 24.00, paying: 0, selected: false },
        { name: 'Creme de Espinafre',
          total: 15.50, left: 15.50, paying: 0, selected: false },
        { name: 'Água sem Gás',
          total:  2.00, left:  2.00, paying: 0, selected: false },
        { name: 'Salada com Pepino, Abóbora Seca, Rúcula e Alface',
          total: 20.00, left: 20.00, paying: 0, selected: false },
        { name: 'Suco de Laranja',
          total:  5.50, left:  5.50, paying: 0, selected: false },
        { name: 'Arroz Pilaf',
          total: 18.95, left: 18.95, paying: 0, selected: false },
        { name: 'Pudim de Chocolate com Coco',
          total:  8.90, left:  8.90, paying: 0, selected: false }]
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
    },

    goBack(value) {
      this.isHome = true;
      this.$emit("goBack", this.isHome);
    }
  }
};
</script>


<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-areas:
    "header"
    "total"
    "list"
    "list"
    "list"
    "button";

  height: 100%;
  width: 100%;
}

.total-remaining {
  grid-area: total;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 3vh 10vw;
  padding: 1.5vh 0;
  border-radius: 0.5vh;

  background-color: #EDAE61;
  font-size: 7vh;
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
  
  padding: 1vh 1.5vw;
  margin-bottom: 1.5vh;
  border-radius: 1vh;

  background-color: #EFE8EA;
}

.item:last-child {
  margin-bottom: 10vh;
}

.item-name {
  grid-area: name;
  margin-right: 2vw;

  font-size: 2.2em;
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
  border-radius: 0.4em;

  font-size: 2.4em;
}

.item-value.cost {
  background-color: #EDAE61;
}

.item-value.paying {
  margin-top: 1vh;

  background-color: #5EC4FF;
}

.item-paid {
  grid-area: status;
  justify-self: end;
  align-self: center;

  margin-right: 5vw;
  border-radius: 30em;
  min-height: 1.1em;
  max-height: 1.1em;
  min-width: 1.1em;
  max-width: 1.1em;

  background-color: lightgreen;
  font-size: 2.8em;
  color: green;
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
  width: 100%;
  padding: 0.5em;

  background-color: #CCE067;
  border: none;
  font-size: 5vh;
}
</style>

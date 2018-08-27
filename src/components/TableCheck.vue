<template>
<div class="wrapper">
  <app-header :title="headerTitle"/>
  <div class="total-remaining">R${{ total.toFixed(2) }}</div>

  <div class="list">
    <div class="item" v-for="(dish, i) in dishes" @click="">
      <div class="item-name">{{ dish.name }}</div>
      
      <div v-if="dish.left > 0" class="item-unpaid">
        <div class="item-value cost">R${{ dish.left.toFixed(2) }}</div>
        <div v-if="dish.paying > 0" class="item-value paying">R${{ dish.paying.toFixed(2) }}</div>
      </div>
      <template v-else class="list-item-paid">
        <done-icon/>
      </template>
    </div>
  </div>

  <button class="pay-button" @click="payItems">
    PAGAR
  </button>
</div>
</template>


<script>
import "vue-material-design-icons/styles.css";
import DoneIcon from "vue-material-design-icons/Check.vue";
import Header   from "./Header.vue";

export default {
  components: {
    "done-icon": DoneIcon,
    "app-header": Header
  },

  props: {
    tableNum: {
      type: Number
    }
  },

  data() {
    return {
      headerTitle: "MESA "+this.tableNum,
      dishes: [
        { name: 'Filé de Frango Acebolado',
          total: 26.60, left: 26.60, paying: 0, selected: false },
        { name: 'Berinjela Recheada com Feijão Branco',
          total: 27.40, left: 27.40, paying: 0, selected: false },
        { name: 'Creme de Espinafre',
          total: 15.50, left: 15.50, paying: 0, selected: false },
        { name: 'Água sem Gás',
          total:  2.00, left:  2.00, paying: 0, selected: false },
        { name: 'Salada com Pepino, Abóbora Seca, Rúcula e Alface',
          total: 20.00, left: 20.00, paying: 0, selected: false },
        { name: 'Suco de Laranja',
          total:  5.50, left:  5.50, paying: 0, selected: false },
        { name: 'Pudim de Chocolate com Coco',
          total:  8.90, left:  8.90, paying: 0, selected: false }],
      total: 105.90,
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
        if (this.dishes[i].selected == 0)
          t += this.dishes[i].price;

      console.log(t);

      return t;
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

  margin: 1.5vh 10vw;
  padding: 1.5vh 0;
  border-radius: 0.5vh;

  background-color: #EDAE61;
  font-size: 6vh;
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
    "name name name status";
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
  margin-right: 1vw;

  font-size: 3vh;
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

  padding: 0.5vh 0.5vw;
  border-radius: 0.5vh;

  font-size: 2.5vh;
}

.item-value.cost {
  background-color: #EDAE61;
}

.item-value.paying {
  margin-top: 1vh;

  background-color: #BFB7B9;
}

.list-item-paid {
  grid-area: status
}

.pay-button {
  grid-area: button;

  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.5em;
  vertical-align: middle;

  background-color: #CCE067;
  border: none;
  font-size: 5vh;
}

button:focus {
  outline: 0;
}
</style>

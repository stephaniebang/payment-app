<template>
<div class="item">
  <!-- Dish name -->
  <div class="name" @click="changeItemSelection()">{{ dish.name }}</div>
      
  <!-- Dish unpaid status or... -->
  <div v-if="dish.left > 0" class="unpaid">
    <!-- Dish total unpaid value -->
    <div class="value" @click="changeItemSelection()">
      R${{ dish.left.toFixed(2) }}
    </div>

    <!-- Dish current payment setting -->
    <div v-if="dish.paying > 0" class="toPay" @click="cancelPay()">
      <span>R${{ dish.paying.toFixed(2) }}</span>
      <span :style="{ marginLeft: '2vw', fontFamily: 'Arial', fontSize: '0.75em', paddingTop: '0.3vh' }">X</span>
    </div>
  </div>

  <!-- ... dish paid status -->
  <div v-else class="paid" @click="changeItemSelection()">
    <done-icon class="icon"/>
  </div>

  <!-- Item payment edit mode -->
  <item-edit v-if="dish.selected" :dish="dish" @itemUnselected="changeItemSelection"
             @payment="setItemPayment"/>
</div>
</template>


<script>
import "vue-material-design-icons/styles.css";
import DoneIcon from "vue-material-design-icons/Check.vue";
import ItemEdit from "./ItemEdit.vue";

export default {
  components: {
    "done-icon": DoneIcon,
    "item-edit": ItemEdit
  },

  props: {
    // dish
    dish: {
      type: Object
    }
  },

  methods: {
    /* Set item as selected, triggering payment mode view only when the item
     * wasn't fully paid, or set it as unselected
     */
    changeItemSelection(ind) {
      this.dish.selected = !this.dish.selected;
    },

    /* Update item when payment method is chosen in item edit mode
     */
    setItemPayment(value) {
      this.dish.paying = value;
    },

    /* Cancel payment for the given item
     */
    cancelPay() {
      this.dish.paying = 0;
    },
  }
}
</script>


<style lang="scss" scoped>
@import '~styles/reference.scss';

.item {
  display: grid;
  grid-template-areas:
    "name name name status"
    "edit edit edit edit";
  grid-auto-columns: 25%;
  
  padding: 1vh 0.5vw;
  margin: 1vh 2vw 1.5vh 2vw;
  border-bottom: 0.05em solid #CCC3C5;

  > .name {
    grid-area: name;
    margin-right: 2vw;

    font-size: 2.2em;
    color: $item-name-color;
  }
  
  > .unpaid {
    grid-area: status;

    display: flex;
    flex-flow: column;
    align-content: flex-start;
    justify-content: center;

    font-size: 2.2em;
  }
 
  > .unpaid > .value {
    display: flex;
    flex-flow: column;
    justify-items: center;

    padding: 0.5vh 0.6vw;
    border-radius: 0.7vh;

    color: $price-left-color;
  }

  > .unpaid > .toPay {
    display: flex;
    flex-flow: row;
    justify-items: center;

    margin-top: 1vh;
    padding: 0.5vh 0.6vw;

    color: $price-pay-color;
  }

  > .paid {
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

  > .paid > .icon {
    position: relative;
  }
}

.item:last-child {
  margin-bottom: 2vh;
}
</style>

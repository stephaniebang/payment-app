<template>
<div class="item">
  <!-- Dish name -->
  <div class="name" @click="changeItemSelection(ind)">{{ dish(ind).name }}</div>
  
  <!-- Dish unpaid status or... -->
  <div v-if="dish(ind).left > 0" class="unpaid">
    <!-- Dish total unpaid value -->
    <div class="value" @click="changeItemSelection(ind)">
      R${{ dish(ind).left.toFixed(2) }}
    </div>

    <!-- Dish current payment setting -->
    <div v-if="dish(ind).paying > 0" class="toPay" @click="cancelPayment(ind)">
      <span>R${{ dish(ind).paying.toFixed(2) }}</span>
      <span :style="{ marginLeft: '2vw', fontFamily: 'Arial', fontSize: '0.75em', paddingTop: '0.3vh' }">X</span>
    </div>
  </div>

  <!-- ... dish paid status -->
  <div v-else class="paid" @click="changeItemSelection(ind)">
    <done-icon class="icon"/>
  </div>

  <!-- Item payment edit mode -->
  <item-edit v-if="dish(ind).selected" :ind="ind"/>
</div>
</template>


<script>
import "vue-material-design-icons/styles.css";
import DoneIcon from "vue-material-design-icons/Check.vue";
import ItemEdit from "./ItemEdit.vue";

import { mapGetters, mapActions } from "vuex";
import * as types from "../store/types"

export default {
  components: {
    "done-icon": DoneIcon,
    "item-edit": ItemEdit
  },

  props: {
    // dish index
    ind: {
      type: Number
    }
  },

  computed: {
    ...mapGetters({
      dish: types.DISH
    })
  },

  methods: {
    ...mapActions({
      changeItemSelection: types.UPDATE_ITEM_SELECTION
    })
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

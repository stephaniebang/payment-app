<template>
  <div class="dish">
    <!-- Dish name -->
    <dish-title @click.native="changeItemSelection(ind)" :name="dish(ind).name"/>
    
    <!-- Dish unpaid status or... -->
    <dish-unpaid v-if="dish(ind).left > 0" :left="dish(ind).left"
                :paying="dish(ind).paying" @edit="changeItemSelection(ind)"
                @cancel="updatePaymentValue({ ind, value: 0 })"/>
    <!-- ... dish paid status -->
    <dish-paid v-else class="paid" @click.native="changeItemSelection(ind)"/>

    <!-- Item payment edit mode -->
    <dish-edit v-if="dish(ind).selected" :ind="ind"/>
  </div>
</template>

<script>
import DishEdit   from "./DishEdit.vue";
import DishTitle  from "../components/DishTitle.vue";
import DishUnpaid from "../components/DishUnpaid.vue";
import DishPaid   from "../components/DishPaid.vue";

import { mapGetters, mapActions } from "vuex";
import * as types from "../store/types"

export default {
  components: {
    "dish-edit":   DishEdit,
    "dish-title":  DishTitle,
    "dish-unpaid": DishUnpaid,
    "dish-paid":   DishPaid
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
      changeItemSelection: types.UPDATE_ITEM_SELECTION,
      updatePaymentValue:  types.UPDATE_ITEM_PAYMENT
    })
  }
}
</script>

<style lang="scss">
@import '~styles/reference.scss';

.dish {
  display: grid;
  grid-template-areas:
    "name name name status"
    "edit edit edit edit";
  grid-auto-columns: 25%;
  align-items: center;
  
  padding: 1vh 0.5vw;
  margin: 1vh 2vw 1.5vh 2vw;
  border-bottom: 0.05em solid #CCC3C5;
}
</style>

<template>
<div class="paySelected" @click="pay()">
  PAGAR R${{ tablePaying(tableIndex).toFixed(2) }}
</div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "../store/types"

export default {
  computed: {
    ...mapGetters({
      tablePaying: types.TABLE_PAYING,
      tableIndex:  types.INDEX
    })
  },

  methods: {
    ...mapActions({
      pay: types.PAY_SELECTED,
    })
  }
}
</script>


<style lang="scss" scoped>
@import '~styles/reference.scss';

.paySelected {
  grid-area: button;

  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  padding: 2vh 0;

  font-size: 4vh;
  background-color: $pay-part-back-color;
  color: $pay-part-font-color;
}
</style>

<template>
<div class="payAll" @click="pay()">
  PAGAR TUDO (R${{ tableTotal(tableIndex).toFixed(2) }})
</div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "../store/types"

export default{
  computed: {
    ...mapGetters({
      tableTotal: types.TABLE_TOTAL,
      tableIndex: types.INDEX
    })
  },
  
  methods: {
    ...mapActions({
      pay: types.PAY_LEFT,
    })
  }
}
</script>


<style lang="scss" scoped>
@import '~styles/reference.scss';

.payAll {
  padding: 1vh 1vw;
  margin: 1.5vh 1.5vw 10vh 1.5vw;
  border-radius: 0.1em;

  font-size: 3vh;
  text-align: center;

  background-color: $pay-all-back-color;
  color: $pay-all-font-color;
}
</style>

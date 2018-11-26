<template class="total">
  <div class="total">
    R${{ tableTotal(tableIndex).toFixed(2) }}
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import * as types from "../store/types"

export default {
  computed: {
    ...mapGetters({
      tableTotal: types.TABLE_TOTAL,
      tableIndex: types.INDEX
    })
  }
}
</script>


<style lang="scss" scoped> 
@import '~styles/reference.scss';

.total {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 10vw;
  padding: 0.5em;

  font-size: 8em;
  color: $price-left-color;
}
</style>

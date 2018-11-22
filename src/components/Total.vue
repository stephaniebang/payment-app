<template class="total">
  <div class="total">
    R${{ tableTotal(tableIndex).toFixed(2) }}
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      'tableTotal',
      'tableIndex'
    ])
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

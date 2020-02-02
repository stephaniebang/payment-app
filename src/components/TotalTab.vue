<template class="total">
  <div class="total">
    R${{ value.toFixed(2) }}
  </div>
</template>


<script>
export default {
  props: {
    // total value
    value: { type: Number }
  }
}
</script>


<style lang="scss"> 
@import '~styles/reference.scss';

.total {
  grid-area: total;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5em;

  font-size: 6em;
  color: $price-left-color;
}
</style>

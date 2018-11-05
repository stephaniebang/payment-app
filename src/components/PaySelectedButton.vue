<template>
<div class="paySelected">
  PAGAR R${{ total.toFixed(2) }}
</div>
</template>


<script>
export default {
  props: {
    // Total value of the selected items
    total: {
      type: Number
    }
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
  padding: 2vh 8vw 2vh 0;

  font-size: 4vh;
  background-color: $pay-part-back-color;
  color: $pay-part-font-color;
}
</style>

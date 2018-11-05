<template>
<div class="payAll">
  PAGAR TUDO (R${{ total.toFixed(2) }})
</div>
</template>


<script>
export default{
  props: {
    // total value to pay
    total: {
      type: Number
    }
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

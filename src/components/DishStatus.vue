<template>
<div class="dish-status">
  <!-- Original total cost -->
  <p>Preço total do prato: R${{ total.toFixed(2) }}</p>

  <!-- Payment history -->
  <p>Histórico de pagamentos:</p>
  <p
    v-for="(val, i) in history"
    :key="`history-${i}`"
    class="history"
  >
    {{ i + 1 }}. R${{ (val).toFixed(2) }}
  </p>
  <p v-if="history.length === 0" class="history">
    Nenhum pagamento realizado
  </p>
</div>
</template>


<script>
export default {
  props: {
    history: { type: Array },
    total:   { type: Number }
  }
};
</script>


<style lang="scss">
@import '~styles/reference.scss';

.dish-status {
  grid-area: info;

  display: flex;
  flex-flow: column;
  justify-content: space-around;

  color: $normal-text-color;

  & > .history {
    margin: 0;

    font-size: 1.5em;
  }
}
</style>

<template>
<div class="unpaid">
  <!-- Dish total unpaid value -->
  <div class="value" @click="edit()">
    R${{ left.toFixed(2) }}
  </div>

  <!-- Dish current payment setting -->
  <div v-if="paying > 0" class="toPay" @click="cancel()">
    <span>R${{ paying.toFixed(2) }}</span>
    <span class="x">X</span>
  </div>
</div>
</template>


<script>
export default {
  props: {
    // dish left value
    left: { type: Number },
    // dish paying value
    paying: { type: Number }
  },

  methods: {
    /* Tells parent container to change dish selection */
    edit() {
      this.$emit("edit", 0);
    },

    /* Tells parent container to cancel dish payment */
    cancel() {
      this.$emit("cancel", 0);
    }
  }
};
</script>


<style lang="scss" scoped>
@import '~styles/reference.scss';

.unpaid {
  grid-area: status;

  display: flex;
  flex-flow: column;
  align-content: flex-start;
  justify-content: center;

  font-size: 2.2em;

  > .value {
    display: flex;
    flex-flow: column;
    justify-items: center;

    padding: 0.5vh 0.6vw;
    border-radius: 0.7vh;

    color: $price-left-color;
  }

  > .toPay {
    display: flex;
    flex-flow: row;
    justify-items: center;

    margin-top: 1vh;
    padding: 0.5vh 0.6vw;

    color: $price-pay-color;
  }

  > .toPay .x {
    margin-left: 2vw;
    padding-top: 0.3vh;

    font-family: 'Arial';
    font-size: 0.75em;
  }
}
</style>

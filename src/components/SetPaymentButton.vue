<template>
  <div class="button">
    {{ text }}
  </div>
</template>


<script>
export default {
  props: {
    text: { type: String }
  }
};
</script>


<style lang="scss">
@import '~styles/reference.scss';

.button {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  padding: 1vh 1vw;
  border-radius: 0.1em;

  font-size: 2em;
  background-color: $pay-button-back-color;
  color: $pay-button-font-color;
}
</style>

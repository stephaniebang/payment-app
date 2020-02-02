<template>
  <div class="button">
     FECHAR
  </div>
</template>


<script>
</script>


<style lang="scss">
@import '~styles/reference.scss';

.button {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  padding: 1vh 1vw;
  margin-top: 1.5vh;
  border-radius: 0.1em;

  font-size: 1.8em;
  background-color: $cancel-button-back-color;
  color: $cancel-button-font-color;
}
</style>

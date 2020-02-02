<template>
<div class="dish-paid">
  <done-icon class="icon"/>
</div>
</template>


<script>
import "vue-material-design-icons/styles.css";
import DoneIcon from "vue-material-design-icons/Check.vue";

export default {
  components: {
    "done-icon": DoneIcon
  }
};
</script>


<style lang="scss">
@import '~styles/reference.scss';

.dish-paid {
  grid-area: status;
  justify-self: center;
  align-self: center;

  margin-right: 5vw;

  font-size: 2.8em;
  color: $pay-part-back-color;

  & > .icon {
    position: relative;
  }
}
</style>

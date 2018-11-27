<template>
<div class="paid">
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


<style lang="scss" scoped>
@import '~styles/reference.scss';

.paid {
  grid-area: status;
  justify-self: center;
  align-self: center;

  margin-right: 5vw;
  min-height: 1.1em;
  max-height: 1.1em;
  min-width: 1.1em;
  max-width: 1.1em;

  font-size: 2.8em;
  color: $pay-part-back-color;

  > .icon {
    position: relative;
  }
}
</style>

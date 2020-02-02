<template>
<div class="back">
  <back-icon/>
</div>
</template>


<script>
import "vue-material-design-icons/styles.css";
import BackIcon from "vue-material-design-icons/ArrowLeft.vue";

export default {
  components: {
    "back-icon": BackIcon
  }
};
</script>


<style lang="scss">
@import '~styles/reference.scss';

.back {
  grid-area: icon;
  justify-self: begin;
  align-self: center;

  text-align: left;

  color: $header-text-color;
  font-size: 2.2em;
}
</style>

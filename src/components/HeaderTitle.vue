<template>
<div class="title">
  <span v-if="ind < 0">MESAS</span>
  <span v-else>MESA {{ ind+1 }}</span>
</div>
</template>


<script>
export default {
  props: {
    // current table index
    ind: {
      type: Number
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~styles/reference.scss";

.title {
  grid-area: title;

  display: flex;
  align-items: center;

  color: $header-text-color;
  font-size: 2.2em;
}
</style>

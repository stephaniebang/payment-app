<template>
<div class="name">
  {{ name }}
</div>
</template>


<script>
export default {
  props: {
    // dish name
    name: { type: String }
  }
};
</script>


<style lang="scss">
@import '~styles/reference.scss';

.name {
  grid-area: name;
  margin-right: 2vw;

  font-size: 2em;
  color: $item-name-color;
}
</style>

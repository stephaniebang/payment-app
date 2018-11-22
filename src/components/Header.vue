<template>
<div class="header">
  <div class="title">
    <span v-if="tableIndex < 0">MESAS</span>
    <span v-else>MESA {{ tableIndex+1 }}</span>
  </div>

  <div v-if="tableIndex >= 0" class="back" @click="updateTableIndex(-1)">
    <back-icon class="back-icon"/>
  </div>
</div>
</template>


<script>
import "vue-material-design-icons/styles.css";
import BackIcon from "vue-material-design-icons/ArrowLeft.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    "back-icon": BackIcon
  },

  methods: {
    ...mapActions([
      'updateTableIndex'
    ])
  },

  computed: {
    ...mapGetters([
      'tableIndex'
    ])
  }
};
</script>


<style lang="scss" scoped>
@import '~styles/reference.scss';

.header {
  grid-area: header;

  display: grid;
  grid-template-areas:
    ". icon title";
  grid-template-columns: 3% 40% 57%;

  padding: 0.5em;
  position: sticky;
  top: 0;

  font-size: 2.2em;
  color: $header-text-color;
  background-color: $app-back-color;

  > .title {
    grid-area: title;

    display: flex;
    align-items: center;
  }

  > .back {
    grid-area: icon;
    justify-self: begin;
    align-self: center;

    text-align: left;
  }
}
</style>

<template>
<div class="header">
  <header-title :ind="tableIndex"/>

  <header-back v-if="tableIndex >= 0" class="back" @click.native="updateTableIndex(-1)"/>
</div>
</template>


<script>
import HeaderTitle from "../components/HeaderTitle.vue";
import HeaderBack  from "../components/HeaderBack.vue";

import { mapGetters, mapActions } from "vuex";
import * as types from "../store/types"

export default {
  components: {
    "header-back":  HeaderBack,
    "header-title": HeaderTitle
  },

  computed: {
    ...mapGetters({
      tableIndex: types.INDEX
    })
  },

  methods: {
    ...mapActions({
      updateTableIndex: types.UPDATE_INDEX
    })
  }
};
</script>


<style lang="scss">
@import '~styles/reference.scss';

.header {
  grid-area: header;

  display: grid;
  grid-template-areas:
    ". icon title";
  grid-template-columns: 3% 40% 57%;

  position: sticky;
  top: 0;
}
</style>

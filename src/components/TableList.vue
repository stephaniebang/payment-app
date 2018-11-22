<template>
<div class="list">
  <item v-for="i in numTables" @click.native="updateTableIndex(i-1)" :ind="i-1"/>
</div>
</template>


<script>
import Table from "./Table.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    "item": Table
  },

  methods: {
    ...mapActions([
      'updateTableIndex'
    ])
  },

  computed: {
    ...mapGetters([
      'numTables'
    ])
  }
};
</script>


<style lang="scss" scoped>
.list {
   grid-area: body;
   align-self: stretch;

   display: flex;
   flex-flow: row wrap;
   align-content: flex-start;
   justify-content: space-around;
   padding: 0 0 2vh 1.5vw;
}
</style>

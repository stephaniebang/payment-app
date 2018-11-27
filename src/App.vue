<template>
  <div class="app">
    <!-- Header -->
    <app-header class="header"/>

    <!-- Table list -->
    <table-list v-if="tableIndex < 0"/>

    <!-- ... or table tab -->
    <table-tab v-else/>
  </div>
</template>


<script>
import TableList from './containers/TableList.vue';
import TableTab  from "./containers/TableTab.vue";
import Header    from "./containers/Header.vue";

import { mapGetters } from "vuex";
import * as types from "./store/types";

export default {
  components: {
    'app-header': Header,
    'table-list': TableList,
    'table-tab':  TableTab
  },

  computed: {
    ...mapGetters({
      tableIndex: types.INDEX
    })
  }
};
</script>


<style src="./styles/index.scss" lang="scss"/>

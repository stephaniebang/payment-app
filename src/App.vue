<template>
  <div class="app">
    <!-- Header -->
    <app-header/>

    <!-- Table list -->
    <table-list v-if="tableIndex < 0"/>

    <!-- ... or table tab -->
    <table-tab v-else/>
  </div>
</template>


<script>
import TableList from './components/TableList.vue';
import TableTab  from "./components/TableTab.vue";
import Header    from "./components/Header.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    'app-header': Header,
    'table-list': TableList,
    'table-tab':  TableTab
  },

  computed: {
    ...mapGetters([
      'tableIndex'
    ])
  }
};
</script>


<style src="./styles/index.scss" lang="scss">
.app {
  display: grid;
  grid-template-areas:
    "header"
    "body"
    "body"
    "body"
    "body"
    "body";
  grid-template-rows: 10%;

  height: 100%;
  width: 100%;
}
</style>

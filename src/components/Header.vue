<template>
<div class="header">
  <div class="title">
    {{ headerTitle() }}
  </div>

  <div v-if="tableIndex >= 0" class="back" @click="goBack">
    <back-icon class="back-icon"/>
  </div>
</div>
</template>


<script>
import "vue-material-design-icons/styles.css";
import BackIcon from "vue-material-design-icons/ArrowLeft.vue";

export default {
  components: {
    "back-icon": BackIcon
  },

  props: {
    title: {
      type: String
    },

    tableIndex: {
      type: Number
    }
  },

  methods: {
    headerTitle() {
      if (this.tableIndex < 0) return "MESAS";

      return "MESA "+(this.tableIndex+1);
    },

    goBack() {
      this.$emit("goBack", -1);
    }
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

  font-size: 2.2em;
  color: $header-text-color;

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

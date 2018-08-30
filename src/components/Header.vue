<template>
<div class="app-header">
  <div class="app-header-title">
    {{ title }}
  </div>

  <div v-if="!isHome" class="app-header-icon" @click="goBack">
    <back-icon class="back-icon"/>
  </div>
</div>
</template>


<script>
import "vue-material-design-icons/styles.css";
import BackIcon from "vue-material-design-icons/ArrowLeft.vue";

export default{
  components: {
    "back-icon": BackIcon
  },

  props: {
    title: {
      type: String
    },

    isHome: {
      type: Boolean
    }
  },

  methods: {
    goBack() {
      this.isHome = true;
      this.$emit("goBack", this.isHome);
    }
  }
};
</script>


<style lang="scss" scoped>
.app-header {
  grid-area: header;

  display: grid;
  grid-template-areas:
    ". icon title";
  grid-template-columns: 3% 40% 57%;

  min-height: 8vh;
  max-height: 8vh;
  padding: 2vh;

  font-size: 4vh;
  color: #91A2AA;
}

.app-header-title {
  grid-area: title;

  display: flex;
  align-items: center;
}

.app-header-icon {
  grid-area: icon;
  justify-self: begin;
  align-self: center;

  text-align: left;
}
</style>

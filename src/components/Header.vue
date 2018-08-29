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
    "title title title title icon";

  padding: 1vh;

  background-color: #E85A4A;
}

.app-header-title {
  grid-area: title;

  display: flex;
  align-items: center;

  font-size: 5vh;
}

.app-header-icon {
  grid-area: icon;
  justify-self: end;
  align-self: center;

  margin-right: 2.5vw;

  font-size: 2.8em;
  color: brown;
}
</style>

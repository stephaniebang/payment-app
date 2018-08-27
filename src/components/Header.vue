<template>
<div class="app-header">
  <div class="app-header-title">
    {{ title }}
  </div>
</div>
</template>


<script>
export default{
  props: {
    title: {
      type: String
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
  display: flex;
  align-items: center;

  font-size: 5vh;
}
</style>

<template>
  <home/>
</template>

<script>
  import Home       from './components/Home.vue';

  export default{
    components: {
      'home': Home
    },

    data() {
      return{
        title: "MESAS"
      };
    }
  };
</script>

<style lang="scss">
html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;

  font-family: 'Open Sans', sans-serif;
  background-color: #F7F5F2;
}

button {
  outline: 0;
}
</style>

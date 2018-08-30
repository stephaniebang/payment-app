<template>
  <home :tableList="tables"/>
</template>

<script>
  import Home from './components/Home.vue';

  export default{
    components: {
      'home': Home
    },

    data() {
      return{
        tables: [
          { n: 1,
            dishes: [
              { name: 'Filé de Frango Acebolado',
                total: 22.60, left: 22.60, paying: 0, selected: false },
              { name: 'Berinjela Recheada com Feijão Branco',
                total: 24.00, left: 24.00, paying: 0, selected: false },
              { name: 'Creme de Espinafre',
                total: 15.50, left: 15.50, paying: 0, selected: false },
              { name: 'Água sem Gás',
                total:  2.00, left:  2.00, paying: 0, selected: false },
              { name: 'Salada com Pepino, Abóbora Seca, Rúcula e Alface',
                total: 20.00, left: 20.00, paying: 0, selected: false },
              { name: 'Suco de Laranja',
                total:  5.50, left:  5.50, paying: 0, selected: false },
              { name: 'Arroz Pilaf',
                total: 18.95, left: 18.95, paying: 0, selected: false },
              { name: 'Pudim de Chocolate com Coco',
                total:  8.90, left:  8.90, paying: 0, selected: false }] },
          { n: 2,
            dishes: [] },
          { n: 3,
            dishes: [] },
          { n: 4,
            dishes: [] },
          { n: 5,
            dishes: [
              { name: 'Farofa de Ovos',
                total:  9.90, left:  9.90, paying: 0, selected: false },
              { name: 'Feijão Tropeiro',
                total: 19.65, left: 19.65, paying: 0, selected: false },
              { name: 'Maionese de Batatas',
                total:  9.90, left:  9.90, paying: 0, selected: false },
              { name: 'Moqueca Cearense',
                total: 31.00, left: 31.00, paying: 0, selected: false },
              { name: 'Arroz Biro Biro',
                total: 22.50, left: 22.50, paying: 0, selected: false },
              { name: 'Carne de Sol',
                total: 28.70, left: 28.70, paying: 0, selected: false },
              { name: 'Suco de Melancia',
                total:  5.50, left:  5.50, paying: 0, selected: false },
              { name: 'Soda',
                total:  4.00, left:  4.00, paying: 0, selected: false },
              { name: 'Coca-Cola',
                total:  4.00, left:  4.00, paying: 0, selected: false }] },
          { n: 6,
            dishes: [] },
          { n: 7,
            dishes: [] },
          { n: 8,
            dishes: [] },
          { n: 9,
            dishes: [] },
          { n: 10,
            dishes: [] },
          { n: 11,
            dishes: [] },
          { n: 12,
            dishes: [] },
          { n: 13,
            dishes: [] },
          { n: 14,
            dishes: [] },
          { n: 15,
            dishes: [] }
        ]
      };
    }
  };
</script>

<style lang="scss">
$app-back-color: #F7F7F7;

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

  //font-family: 'Open Sans', sans-serif;
  background-color: $app-back-color;
}

button {
  outline: 0;
}
</style>

<template>
<div class="item">
  <div class="item-name">
    NOME
  </div>

  <div class="item-unpaid-cost">
    R$xx,xx
  </div>

  <div class="item-paying">
    R$oo,oo
  </div>
</div>
</template>


<script>
export default {
  props: {
    items: {
      type: Array
    }
  }
}
</script>

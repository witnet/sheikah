<template>
  <div class="transactions">
    <TransactionList :transactions="transactions" />
  </div>
</template>

<script>
import TransactionList from './TransactionList'

export default {
  name: 'Transactions',
  components: {
    TransactionList,
  },
  data () {
    return {
      transactions: [
        {
          amount: '+0.1',
          sending: true,
          address: '1957128f5d125609c37d2079a904be42f0809556',
          date: 'April 23 at 14:38',
        },
        {
          amount: '+0.1',
          sending: true,
          address: '1957128f5d125609c37d2079a904be42f0809556',
          date: 'April 23 at 14:38',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.transactions {
  // width: 700px;
  padding: 32px;
}
</style>

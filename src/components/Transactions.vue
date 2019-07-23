<template>
  <div class="transactions">
    <TransactionList class="list" :transactions="transactions" />
    <Balances :available="available" :timelocked="timelocked" :unconfirmed="unconfirmed" :total="total" />
  </div>
</template>

<script>
import 'mapState' from 'vuex'

import Balances from './Balances'
import TransactionList from './TransactionList'

export default {
  name: 'Transactions',
  components: {
    TransactionList,
    Balances,
  },
  computed: {
    ...mapState({
      available: state => state.wallet.balances.available,
      timelocked: state => state.wallet.balances.timelocked,
      unconfirmed: state => state.wallet.balances.unconfirmed,
      total: state => state.wallet.balances.total,
    }),
  },
  data () {
    return {
      transactions: [
        // {
        //   amount: '+0.1',
        //   address: '1957128f5d125609c37d2079a904be42f0809556',
        //   date: 'April 23 at 14:38',
        // },
        // {
        //   amount: '-0.1',
        //   address: '1957128f5d125609c37d2079a904be42f0809556',
        //   date: 'April 23 at 14:38',
        // },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.transactions {
  // width: 700px;
  padding: 32px;
  display: flex;
  min-width: 300px;

  .list {
    margin-right: 40px;
  }
}

</style>

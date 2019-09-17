<template>
  <div class="transactions">
    <TransactionList class="list" :transactions="transactions" />
    <Balances
      :available="available"
      :timelocked="timelocked"
      :unconfirmed="unconfirmed"
      :total="total"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
      transactions: state =>
        state.wallet.transactions.map(transaction => ({
          address: '',
          amount: `${transaction.kind === 'Credit' ? '+' : '-'}${transaction.value}`,
          block: transaction.block ? transaction.block.epoch : 'PENDING',
          date: new Date(transaction.timestamp).toISOString(),
        })),
      error: state => state.wallet.errors.getTransactions,
    }),
  },
  beforeCreate() {
    this.$store.dispatch('getTransactions', { limit: 50, page: 0 })
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

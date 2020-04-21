<template>
  <LayoutTransactions data-test="transactions">
    <template #transactions>
      <TransactionList class="list" :transactions="transactions" :currency="currency" />
    </template>

    <template #balance>
      <Balance :total="total" :currency="currency" />
    </template>

    <template #addresses>
      <Addresses :addresses="addresses" v-on:generate-address="() => generateAddress('')" />
    </template>
  </LayoutTransactions>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Balance from '@/components/Balance'
import TransactionList from '@/components/TransactionList'
import Addresses from '@/components/Addresses'
import LayoutTransactions from '@/components/LayoutTransactions'

export default {
  name: 'Transactions',
  components: {
    LayoutTransactions,
    TransactionList,
    Balance,
    Addresses,
  },
  beforeCreate() {
    this.$store.dispatch('getTransactions', { limit: 50, page: 0 })
    this.$store.dispatch('getAddresses')
    this.$store.dispatch('getBalance')
    // TODO: place this methods in the correct place when the generated transaction from the wallet is ready
    this.$store.dispatch('getLabels')
  },
  computed: {
    ...mapState({
      total: state => state.wallet.balance,
      txLabels: state => state.wallet.txLabels,
      transactions: state => state.wallet.transactions,
      addresses: state => {
        return Array.from(state.wallet.addresses)
      },
      currency: state => state.wallet.currency,
    }),
  },
  methods: {
    ...mapActions(['generateAddress']),
  },
}
</script>

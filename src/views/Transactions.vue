<template>
  <LayoutTwoColumns data-test="transactions">
    <template v-slot:left>
      <TransactionList
        class="list"
        :transactions="transactions"
        :currency="currency"
      />
    </template>

    <template v-slot:upperRight>
      <Balance :total="total" :currency="currency" />
    </template>

    <template v-slot:bottomRight>
      <Addresses
        :addresses="addresses"
        :currency="currency"
        @generate-address="() => generateAddress('')"
      />
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Balance from '@/components/Balance'
import TransactionList from '@/components/TransactionList'
import Addresses from '@/components/Addresses'
import LayoutTwoColumns from '@/components/LayoutTwoColumns'
export default {
  name: 'Transactions',
  components: {
    LayoutTwoColumns,
    TransactionList,
    Balance,
    Addresses,
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
  watch: {
    transactions(val) {
      if (val.length) {
        this.$store.dispatch('startTransactionDateSync')
      }
    },
  },
  created() {
    this.getTransactions({})
    this.getAddresses()
    this.getBalance()
  },
  beforeCreate() {
    // TODO: place this methods in the correct place when the generated transaction from the wallet is ready
    this.$store.dispatch('getLabels')
  },
  destroyed() {
    this.$store.dispatch('stopTransactionDateSync')
  },
  methods: {
    ...mapActions([
      'generateAddress',
      'getTransactions',
      'getAddresses',
      'getBalance',
      'getLabels',
    ]),
  },
}
</script>

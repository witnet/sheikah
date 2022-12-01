<template>
  <LayoutTwoColumns data-test="transactions">
    <template v-slot:left>
      <TransactionList
        class="list"
        :transactions-length="transactionsLength"
        :transactions="transactions"
        :unit="unit"
      />
    </template>

    <template v-slot:upperRight>
      <Balance :total="total" :unit="unit" />
    </template>

    <template v-slot:bottomRight>
      <Addresses
        :addresses="addresses"
        :unit="unit"
        @generate-address="() => generateAddress('')"
      />
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Balance from '@/components/Balance.vue'
import TransactionList from '@/components/TransactionList.vue'
import Addresses from '@/components/Addresses.vue'
import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'
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
      transactionsLength: state => state.wallet.transactionsLength,
      transactions: state => state.wallet.transactions,
      addresses: state => {
        return Array.from(state.wallet.addresses)
      },
      unit: state => state.wallet.unit,
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
    this.getTransactions()
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

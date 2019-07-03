<template>
  <div class="transaction-list">
    <p><span class="label">TRANSACTIONS</span> <span class="number">{{ transactionsLength }} transactions</span></p>
    <div class="list">
      <Transaction v-for="(transaction, index) in transactions"
        :key="transaction.id"
        :amount="transaction.amount"
        :address="transaction.address"
        :sending="transaction.sending"
        :date="transaction.date"
        :block="transaction.block"
        :border="index !== transactionsLength - 1"
      />
    </div>
  </div>
</template>

<script>
import Transaction from './Transaction'

export default {
  name: 'TransactionList',
  components: {
    Transaction,
  },
  computed: {
    transactionsLength () {
      return this.transactions.length
    },
  },
  data () {
    return {

    }
  },
  props: {
    transactions: Array,
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
.transaction-list {
  width: 100%;

  .label {
    font-size: 16px;
    font-weight: 600;
    color: #808080ff;
  }

  .number {
    font-size: 14px;
    color: $grey-5;
    margin-left: 8px;
  }

  .list {
    padding: 0 16px;
    border: 1px solid lightgray;
    box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);
  }
}
</style>

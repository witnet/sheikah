<template>
  <div class="transaction-list">
    <p class="title"><span class="label">TRANSACTIONS</span> <span class="number">{{ transactionsLength }} transactions</span></p>
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
    <div v-if='transactions.length === 0' class="no-transactions-container">
      <img class="no-transactions-img" src='@/resources/svg/empty.svg' />
      <p class="no-transactions-text">You don't have transactions</p>
    </div>
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
    border: .5px solid rgb(224, 224, 224);
    box-shadow: 0 0px 5px 0px rgba(29, 29, 29, 0.1);
  }
  .no-transactions-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    .no-transactions-text{
    font-size: 12px;
    font-weight: 400;
    font-style: italic;
    color: $grey-5;
    }
    .no-transactions-img{
      width: 36px;
      margin-bottom: 10px;
    }
  }

  .title{
    margin-bottom: 10px;
  }
}
</style>

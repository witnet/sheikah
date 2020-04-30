<template>
  <div class="transaction-list">
    <p class="title">
      <span class="label">Transactions</span>
      <span class="number">{{ transactionsLength }} transactions</span>
    </p>
    <div class="list">
      <Transaction
        v-for="transaction in paginatedItems"
        :key="transaction.id"
        :currency="currency"
        :type="transaction.type"
        :inputs="transaction.inputs"
        :outputs="transaction.outputs"
        :fee="transaction.fee"
        :date="transaction.date"
        :timeAgo="transaction.timeAgo"
        :id="transaction.id"
        :label="transaction.label"
        :amount="transaction.amount"
        :block="transaction.block"
        :witnesses="transaction.witnesses"
        :rewards="transaction.rewards"
        :rounds="transaction.rounds"
        :state="transaction.currentStage"
        :reveals="transaction.reveals"
        :result="transaction.finalResult"
        :transactionType="transaction.transactionType"
      />
      <div v-if="transactions.length === 0" class="no-transactions-container">
        <p class="no-transactions-text">You don't have transactions</p>
      </div>
    </div>
    <div v-show="transactions.length" class="pagination-nav">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="transactions.length"
        :current-page="currentPage"
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
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    }
  },
  computed: {
    paginatedItems() {
      const from = this.currentPage * this.itemsPerPage - this.itemsPerPage
      const to = this.currentPage * this.itemsPerPage
      return this.transactions.slice(from, to)
    },
    transactionsLength() {
      return this.transactions.length
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
  },
  props: {
    currency: String,
    transactions: Array,
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.transaction-list {
  width: 100%;
  .label {
    font-size: 16px;
    font-weight: 600;
    color: $alt-grey-5;
  }
  .number {
    font-size: 14px;
    color: $alt-grey-3;
    margin-left: 8px;
  }
  .list {
    height: 84vh;
    overflow: auto;
    border-radius: 4px;
    border: 0.5px solid rgb(224, 224, 224);
    box-shadow: $card-box-shadow;
    background-color: $white;
  }
  .no-transactions-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    .no-transactions-text {
      font-size: 16px;
      font-weight: 400;
      font-style: italic;
      color: $alt-grey-5;
    }
    .no-transactions-img {
      width: 40px;
      margin-bottom: 16px;
    }
  }
  .pagination-nav {
    padding: 16px 0px 0px 0px;
    text-align: center;
  }
  .title {
    margin-bottom: 16px;
  }
}
</style>

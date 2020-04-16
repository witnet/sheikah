<template>
  <div class="transaction-list">
    <p class="title">
      <span class="label">TRANSACTIONS</span>
      <span class="number">{{ transactionsLength }} transactions</span>
    </p>
    <div class="list">
      <Transaction
        :currency="currency"
        :inputs="inputs"
        :outputs="outputs"
        :fee="fee"
        id="f92557f3a820dc10595fe594117f5f1c56b85be5"
        label="jajaja"
        amount="30"
        address="twit1kkvtfhexalusqdsmggaxghnwudhdhm8nuw3qs7"
        sending="twit1q30eenqw0mme5058npqt2cl5njgy4qe8zayz9x"
        date="date"
        block="block"
      />
      <Transaction
        v-for="(transaction, index) in paginatedItems"
        :currency="currency"
        :key="transaction.id"
        :id="transaction.id"
        :label="transaction.label"
        :amount="transaction.amount"
        :address="transaction.address"
        :sending="transaction.sending"
        :date="transaction.date"
        :block="transaction.block"
        :border="index !== transactionsLength - 1"
      />
      <!-- <div v-if="transactions.length === 0" class="no-transactions-container">
        <img class="no-transactions-img" src="@/resources/svg/empty.svg" />
        <p class="no-transactions-text">You don't have transactions</p>
      </div> -->
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
      inputs: [{ amount: 100000, address: 'twit1dj8enj85vcglhum9amjd00236dt3sfdmd6ss9s' }],
      outputs: [
        { amount: 98765, address: 'twit1n28rggnw3fz0e0dw657twc5qjv3q65xczqlywk' },
        { amount: 735, address: 'twit1g4va4ewfjya7d4cu7chahemkwhqdxuhg5ha0lt' },
      ],
      fee: { amount: 500, address: 'twit1g93yvxdwltazk834mvzaah2egmth2pql8qt3rl' },
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

.transaction-list {
  width: 100%;
  .label {
    font-size: 16px;
    font-weight: 600;
    color: $alt-grey-3;
  }
  .number {
    font-size: 16px;
    color: $alt-grey-5;
    margin-left: 8px;
  }
  .list {
    overflow: auto;
    max-height: 73vh;
    border: 0.5px solid rgb(224, 224, 224);
    box-shadow: 0 0px 5px 0px rgba(29, 29, 29, 0.1);
    background: $white;
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
    padding: 16px 0px 16px 0px;
    text-align: center;
  }
  .title {
    margin-bottom: 16px;
  }
}
</style>

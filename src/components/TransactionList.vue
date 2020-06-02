<template>
  <div class="transaction-list">
    <p class="title">
      <span class="label">Transactions</span>
      <span class="number">{{ transactionsLength }} transactions</span>
    </p>
    <div class="list">
      <Transaction
        v-for="transaction in paginatedItems"
        :id="transaction.id"
        :key="transaction.id"
        :currency="currency"
        :type="transaction.type"
        :inputs="transaction.inputs"
        :outputs="transaction.outputs"
        :fee="transaction.fee"
        :date="transaction.date"
        :time-ago="transaction.timeAgo"
        :label="transaction.label"
        :amount="transaction.amount"
        :block="transaction.block"
        :witnesses="transaction.witnesses"
        :rewards="transaction.rewards"
        :rounds="transaction.rounds"
        :state="transaction.currentStage"
        :reveals="transaction.reveals"
        :result="transaction.finalResult"
        :transaction-type="transaction.transactionType"
      />
      <div v-if="transactions.length === 0" class="no-transactions-container">
        <p class="no-transactions-text">You don't have transactions</p>
      </div>
    </div>
    <div v-show="transactions.length" class="pagination-nav">
      <el-pagination
        layout="prev, pager, next"
        :total="transactions.length"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
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
  props: {
    currency: {
      type: String,
      required: true,
    },
    transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 15,
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
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.transaction-list {
  width: 100%;

  .label {
    color: $alt-grey-5;
    font-size: 16px;
    font-weight: 600;
  }

  .number {
    color: $alt-grey-3;
    font-size: 14px;
    margin-left: 8px;
  }

  .list {
    background-color: $white;
    border: 0.5px solid rgb(224, 224, 224);
    border-radius: 4px;
    box-shadow: $card-box-shadow;
    overflow: auto;
  }

  .no-transactions-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 24px;

    .no-transactions-text {
      color: $alt-grey-5;
      font-size: 16px;
      font-style: italic;
      font-weight: 400;
    }

    .no-transactions-img {
      margin-bottom: 16px;
      width: 40px;
    }
  }

  .pagination-nav {
    padding: 16px 0 0 0;
    text-align: center;
  }

  .title {
    margin-bottom: 16px;
  }
}
</style>

<docs>
### Example

```jsx
  const transactions = [{
    block: "511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f",
    border: "false",
    date: "JAN 19, 1970 @ 10:00:31",
    timeAgo: "33 minutes ago",
    fee: 12,
    id: "600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109",
    outputs: [
      { value: 123, address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq' },
      { value: 499999999865, address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }
    ],
    inputs: [{ value: 500000000000, address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }],
    type: "POSITIVE",
    transactionType: "value_transfer",
    amount: 123
  }]

  <TransactionList
    currency="nanoWits"
    :transactions="transactions"
  />
```
</docs>

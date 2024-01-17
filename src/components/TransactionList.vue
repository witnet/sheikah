<template>
  <div class="transaction-list">
    <Fieldset
      data-test="transactions-length"
      :title="$t('transactions')"
      :subtitle="
        $t('transactions_count', transactionsLength, {
          count: transactionsLength,
        })
      "
    >
      <div class="list">
        <Transaction
          v-for="(transaction, index) in transactions"
          :id="transaction.id"
          :key="transaction.id"
          :confirmed="transaction.confirmed"
          :data-test="`transaction-${index}`"
          :unit="unit"
          :type="transaction.type"
          :inputs="transaction.inputs"
          :outputs="transaction.outputs"
          :fee="transaction.fee"
          :date="transaction.date"
          :time-ago="transaction.timeAgo"
          :label="transaction.label"
          :amount="transaction.amount"
          :block="transaction.block"
          :epoch="transaction.epoch"
          :witnesses="transaction.witnesses"
          :rewards="transaction.rewards"
          :rounds="transaction.rounds"
          :state="transaction.currentStage"
          :timelocked="transaction.timelocked"
          :reveals="transaction.reveals"
          :result="transaction.finalResult"
          :address="transaction.address"
          :transaction-type="transaction.transactionType"
        />
        <div
          v-if="transactionsLength === '0'"
          class="no-transactions-container"
          data-test="empty-transactions"
        >
          <p class="no-transactions-text">{{ $t('transactions_empty') }}</p>
        </div>
      </div>
      <div
        v-show="transactionsLength > itemsPerPage"
        class="pagination-nav"
        data-test="pagination"
      >
        <el-pagination
          layout="prev, pager, next"
          :page-count="numberOfPages"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        />
      </div>
    </Fieldset>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Transaction from '@/components/Transaction.vue'
import Fieldset from '@/components/Fieldset.vue'
import { TRANSACTIONS_LIMIT } from '@/constants'

export default {
  name: 'TransactionList',
  components: {
    Transaction,
    Fieldset,
  },
  props: {
    unit: {
      type: String,
      required: true,
    },
    transactions: {
      type: Array,
      required: true,
    },
    transactionsLength: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: TRANSACTIONS_LIMIT,
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.transactionsLength / this.itemsPerPage)
    },
  },
  watch: {
    currentPage(value) {
      this.setCurrentTransactionsPage({ page: value })
    },
  },
  methods: {
    ...mapActions({
      setCurrentTransactionsPage: 'setCurrentTransactionsPage',
    }),
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
  display: grid;
  grid-template-rows: max-content max-content 1fr;

  .list {
    background-color: var(--transaction-background);
    border: var(--transaction-border);
    border-radius: 4px;
    box-shadow: var(--card-box-shadow);
    overflow: auto;

    .no-transactions-container {
      align-items: center;
      display: flex;
      flex-direction: column;
      padding: 24px;

      .no-transactions-text {
        color: var(--text-medium-emphasis);
        font-size: 16px;
        font-style: italic;
        font-weight: 400;
      }
    }
  }

  .pagination-nav {
    align-self: flex-end;
    padding: 16px 0 0;
    text-align: center;
  }
}
</style>

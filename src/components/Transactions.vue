<template>
  <div class="transactions">
    <TransactionList class="list" :transactions="transactions" />
    <div class="col-right">
      <Balances
        :available="available"
        :timelocked="timelocked"
        :unconfirmed="unconfirmed"
        :total="total"
      />
      <div class="send-received">
        <Button class="primary" :onClick="displayModalSend">
          Send
        </Button>
        <Button class="secondary" :onClick="displayModalReceive">
          Receive
        </Button>
      </div>
      <el-dialog
        title="New Transaction"
        :visible.sync="dialogVisible1"
        width="60%"
        v-on:close="closeAndClear"
      >
        <Alert
          v-if="transactionsError.message"
          :key="transactionsError.message"
          type="error"
          :message="transactionsError.message"
          :description="transactionsError.description"
          v-on:close="closeAndClear"
        />
        <Send />
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible2" width="60%">
        <!-- <Alert
          :key="transactionsError.message"
          type="error"
          :description="transactionsError.description"
          :message="transactionsError.message"
          v-on:close="() => clearError(transactionsError)"
        /> -->
        <Receive />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Button from '@/components/Button'
import Balances from './Balances'
import Send from '@/components/Send'
import Receive from '@/components/Receive'
import TransactionList from './TransactionList'
import Alert from '@/components/Alert'

export default {
  name: 'Transactions',
  components: {
    TransactionList,
    Balances,
    Button,
    Send,
    Receive,
    Alert,
  },
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
    }
  },
  methods: {
    displayModalSend: function() {
      this.dialogVisible1 = true
    },
    displayModalReceive: function() {
      this.dialogVisible2 = true
    },
    closeAndClear: function() {
      this.clearError(this.createVTTErrorName)
    },
    clearError: function() {
      console.log('cleaaar error.....')
      console.log('THIS', this)
      return this.$store.commit('clearError', { error: this.createVTTErrorName })
    },
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
      getTransactionsError: state => {
        console.log('map state transacions-->', state.wallet.errors.getTransactions)
        return state.wallet.errors.getTransactions
      },
      createVTTErrorMessage: state => {
        if (state.wallet.errors.createVTT) {
          return state.wallet.errors.createVTT.message
        }
      },
      createVTTErrorDescription: state => {
        if (state.wallet.errors.createVTT) {
          return state.wallet.errors.createVTT.error.message
        }
      },
      createVTTErrorName: state => {
        if (state.wallet.errors.createVTT) {
          return state.wallet.errors.createVTT.name
        }
      },
    }),
    transactionsError() {
      return {
        message: this.createVTTErrorMessage,
        description: this.createVTTErrorDescription,
        name: this.createVTTErrorName,
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch('getTransactions', { limit: 50, page: 0 })
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.transactions {
  padding: 32px;
  display: flex;
  min-width: 300px;

  .list {
    margin-right: 40px;
  }
  .col-right {
    display: flex;
    flex-direction: column;

    .send-received {
      margin: 0 auto;
      .primary {
        margin: 10px;
      }
    }
  }
}
</style>

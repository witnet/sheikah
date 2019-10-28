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
      <el-dialog title="New Transaction" :visible.sync="dialogVisible1" width="60%">
        <Alert
          v-for="error in errors"
          :key="error.name"
          type="error"
          :message="error.message"
          :description="error.description"
          v-on:close="() => clearError(error.name)"
        />
        <Send />
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible2" width="60%">
        <Alert
          v-for="error in errors"
          :key="error.name"
          type="error"
          :message="error.message"
          :description="error.description"
          v-on:close="() => clearError(error.name)"
        />
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
import { formatSectionApiErrorsByRoute } from '@/utils'

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
    clearError(errorName) {
      this.$store.commit('clearError', { error: errorName })
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
        return state.wallet.errors.getTransactions
      },
      createVTTError: state => {
        return state.wallet.errors.createVTT
      },
    }),
    errors() {
      console.log('In errors...>')
      return formatSectionApiErrorsByRoute(
        this.$route.name,
        {
          transactions: ['getTransactionsError', 'createVTTError'],
          // receive: ['receiveError'],
        },
        {
          getTransactionsError: this.getTransactionsError,
          createVTTError: this.createVTTError,
        }
      )
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

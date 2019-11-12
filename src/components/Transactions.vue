<template>
  <div data-test="transactions" class="transactions">
    <TransactionList class="list" :transactions="transactions" />
    <div class="col-right">
      <div class="top">
        <Balances
          :available="available"
          :timelocked="timelocked"
          :unconfirmed="unconfirmed"
          :total="total"
        />
        <div class="send-received">
          <Button data-test="send-btn" class="primary" :onClick="displayModalSend">
            Send
          </Button>
          <Button data-test="receive-btn" class="secondary" :onClick="displayModalReceive">
            Receive
          </Button>
        </div>
        <el-dialog
          title="New Transaction"
          :visible.sync="dialogVisible"
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
        <el-dialog
          data-test="receive-modal"
          title="New payment request"
          :visible.sync="dialogVisible2"
          width="60%"
        >
          <Receive :addresses="addresses" />
        </el-dialog>
      </div>
      <ListAddresses :addresses="addresses" />
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
import ListAddresses from '@/components/ListAddresses'

export default {
  name: 'Transactions',
  components: {
    TransactionList,
    Balances,
    Button,
    Send,
    Receive,
    Alert,
    ListAddresses,
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      posts: this.addresses,
      page: 1,
      perPage: 5,
      middleItemActive: null,
      lastItemActive: false,
      firstItemActive: true,
    }
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
          amount: `${transaction.entry === 'Credit' ? '+' : '-'}${transaction.value}`,
          block: transaction.block ? transaction.block.epoch : 'PENDING',
          date: new Date(transaction.timestamp).toISOString(),
        })),
      error: state => state.wallet.errors.getTransactions,
      getTransactionsError: state => {
        return state.wallet.errors.getTransactions
      },
      addresses: state => {
        return state.wallet.addresses
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
  methods: {
    displayModalSend: function() {
      this.dialogVisible = true
    },
    displayModalReceive: function() {
      this.generateAddress()
      this.dialogVisible2 = true
    },
    closeAndClear: function() {
      this.clearError(this.createVTTErrorName)
    },
    clearError: function() {
      return this.$store.commit('clearError', { error: this.createVTTErrorName })
    },
    generateAddress() {
      this.$store.dispatch('generateAddress', {
        label: this.label,
      })
      this.$store.dispatch('getAddresses')
    },
  },
  beforeCreate() {
    this.$store.dispatch('getTransactions', { limit: 50, page: 0 })
    this.$store.dispatch('getAddresses')
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
    height: 55vh;

    .send-received {
      margin: 0 auto;
      .primary {
        margin: 10px;
      }
    }
  }
}
</style>

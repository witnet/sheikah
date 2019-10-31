<template>
  <div class="transactions">
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
        <el-dialog title="New payment request" :visible.sync="dialogVisible2" width="60%">
          <Receive />
        </el-dialog>
      </div>
      <div class="card">
        <p class="header">
          GENERATED ADDRESSES
        </p>
        <div class="content">
          <!-- <p class="address">{{ addresses[0].address }}</p> -->
          <p class="address" v-for="address in addresses" :key="address.address">
            {{ address.address }}
          </p>
        </div>
      </div>
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
.card {
  min-width: 200px;
  max-height: 400px;
  margin-top: 40px;
  .header {
    border-bottom: 1px solid $grey-0;
    margin-bottom: 24px;
    color: $grey-4;
    font-weight: bold;
  }
  .content {
    max-height: 45vh;
    overflow-y: scroll;
    overflow-wrap: break-word;
    border-radius: 2px;
    box-shadow: $default-box-shadow;
    padding: 32px;
    background-color: $alpha-blue;
    .address {
      text-align: center;
      width: 250px;
      border-bottom: 1px solid $grey-0;
      padding: 16px;
      color: $black;
      font-weight: 500;
    }
  }
}
</style>

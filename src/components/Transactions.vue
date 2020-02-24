<template>
  <div data-test="transactions">
    <div v-show="dialogVisible === false || !dialogVisible2 === false">
      <Alert
        data-test="alert"
        v-for="error in errors"
        :key="error.message"
        type="error"
        :message="error.message"
        :description="error.description"
        v-on:close="() => clearError(error.name)"
      />
    </div>
    <div class="transactions">
      <TransactionList class="list" :transactions="transactions" :currency="currency" />
      <div class="col-right">
        <div class="top">
          <Balances :total="total" :currency="currency" />
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
            width="700px"
            v-on:close="closeAndClear"
          >
            <Alert
              data-test="alert"
              v-for="error in errors"
              :key="error.message"
              type="error"
              :message="error.message"
              :description="error.description"
              v-on:close="closeAndClear"
            />
            <Send
              :form="form"
              v-on:close="closeAndClear"
              v-on:create-VTT="createVTT"
              v-on:form="setFormValues"
            />
          </el-dialog>
          <el-dialog
            data-test="receive-modal"
            title="New payment request"
            :visible.sync="dialogVisible2"
            width="700px"
          >
            <Alert
              data-test="alert"
              v-for="error in errors"
              :key="error.message"
              type="error"
              :message="error.message"
              :description="error.description"
              v-on:close="() => closeAndClear"
            />
            <Receive :lastAddress="lastAddress" :modalShown="dialogVisible2" />
          </el-dialog>
        </div>
        <ListAddresses :addresses="addresses" />
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
      posts: this.newAddresses,
      lastAddress: '',
      page: 1,
      perPage: 5,
      middleItemActive: null,
      lastItemActive: false,
      firstItemActive: true,
      newAddresses: null,
      form: {
        address: '',
        label: '',
        amount: 0,
        fee: { value: 79, primaryText: 'High', secondaryText: '79 uWit/B' },
        options: [
          { value: 79, primaryText: 'High', secondaryText: '79 uWit/B' },
          { value: 59, primaryText: 'Medium', secondaryText: '59 uWit/B' },
          { value: 39, primaryText: 'Low', secondaryText: '39 uWit/B' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      // FIXME(#902): Show all balance types when the wallet has implement it
      // available: state => state.wallet.balances.available,
      // timelocked: state => state.wallet.balances.timelocked,
      // unconfirmed: state => state.wallet.balances.unconfirmed,
      total: state => state.wallet.balances,
      txLabels: state => state.wallet.txLabels,
      transactions: state => state.wallet.transactions,
      error: state => state.wallet.errors.getTransactions,
      addresses: state => Array.from(state.wallet.addresses),
      createVTTError: state => {
        if (state.wallet.errors.createVTT) {
          return {
            message: state.wallet.errors.createVTT.message,
            description: state.wallet.errors.createVTT.error.message,
            name: state.wallet.errors.createVTT.name,
          }
        }
      },
      currency: state => state.wallet.currency,
      sendTransactionError: state => {
        if (state.wallet.errors.sendTransaction) {
          return {
            message: state.wallet.errors.sendTransaction.message,
            description: state.wallet.errors.sendTransaction.error.message,
            name: state.wallet.errors.sendTransaction.name,
          }
        }
      },
      getAddressesError: state => {
        if (state.wallet.errors.getAddresses) {
          return {
            message: state.wallet.errors.getAddresses.message,
            description: state.wallet.errors.getAddresses.error.message,
            name: state.wallet.errors.getAddresses.name,
          }
        }
      },
      generateAddressError: state => {
        if (state.wallet.errors.generateAddress) {
          return {
            message: state.wallet.errors.generateAddress.message,
            description: state.wallet.errors.generateAddress.error.message,
            name: state.wallet.errors.generateAddress.name,
          }
        }
      },
      getBalanceError: state => {
        if (state.wallet.errors.getBalance) {
          return {
            message: state.wallet.errors.getBalance.message,
            description: state.wallet.errors.getBalance.error.message,
            name: state.wallet.errors.getBalance.name,
          }
        }
      },
      getTransactionsError: state => {
        if (state.wallet.errors.getTransactions) {
          return {
            message: state.wallet.errors.getTransactions.message,
            description: state.wallet.errors.getTransactions.error.message,
            name: state.wallet.errors.getTransactions.name,
          }
        }
      },
      getLabelsError: state => {
        if (state.wallet.errors.getItem) {
          return {
            message: state.wallet.errors.getItem.message,
            description: state.wallet.errors.getItem.error.message,
            name: state.wallet.errors.getItem.name,
          }
        }
      },
      errors() {
        if (this.$store.state.wallet.networkStatus !== 'error') {
          return [
            this.getTransactionsError,
            this.getBalanceError,
            this.getLabelsError,
            this.getAddressesError,
            this.generateAddressError,
            this.sendTransactionError,
            this.createVTTError,
          ].filter(error => !!error)
        } else {
          return []
        }
      },
    }),
  },
  watch: {
    addresses() {
      if (this.addresses.length !== 0) {
        this.lastAddress = this.addresses[0].address
      }
    },
  },
  methods: {
    setFormValues(updatedForm) {
      this.form = updatedForm
    },
    createVTT() {
      this.refindex = 0
      this.$store.dispatch('createVTT', {
        label: this.form.label,
        address: this.form.address,
        amount: this.form.amount,
        fee: this.form.fee.value,
      })
    },
    displayModalSend: function() {
      this.dialogVisible = true
    },
    displayModalReceive: function() {
      this.generateAddress()
      this.$store.dispatch('getAddresses')
      this.dialogVisible2 = true
    },
    clearSendForm() {
      this.form.address = ''
      this.form.label = ''
      this.form.amount = 0
      this.form.fee = { value: 79, primaryText: 'High', secondaryText: '79 uWit/B' }
    },
    closeAndClear: function() {
      this.clearSendForm()
      this.$store.commit('clearGeneratedTransaction')
      this.dialogVisible = false
      if (this.createVTTError) {
        this.clearError(this.createVTTError.name)
      } else if (this.sendTransactionError) {
        this.clearError(this.sendTransactionError.name)
      }
    },
    clearError: function(name) {
      return this.$store.commit('clearError', { error: name })
    },
    generateAddress() {
      this.$store.dispatch('generateAddress', {
        label: this.label,
      })
    },
  },
  beforeCreate() {
    this.$store.dispatch('getTransactions', { limit: 50, page: 0 })
    this.$store.dispatch('getAddresses')
    this.$store.dispatch('getBalance')
    // TODO: place this methods in the correct place when the generated transaction from the wallet is ready
    this.$store.dispatch('getLabels')
  },
  beforeDestroy() {
    if (this.generateAddressError) {
      this.clearError(this.generateAddressError.name)
    }
    if (this.getLabelsError) {
      this.clearError(this.getLabelsError.name)
    }
    if (this.getTransactionsError) {
      this.clearError(this.getTransactionsError.name)
    }
    if (this.getBalanceError) {
      this.clearError(this.getBalanceError.name)
    }
    if (this.getAddressesError) {
      this.clearError(this.getAddressesError.name)
    }
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
        margin: 8px;
      }
    }
  }
}
</style>

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
            data-test="alert-send-transaction"
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
          <Receive />
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
          amount: `${transaction.kind === 'Credit' ? '+' : '-'}${transaction.value}`,
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
    setPages() {
      let pages = []
      let numberOfPages = Math.ceil(this.addresses.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        pages.push(index)
      }
      return pages
    },
    rangePages() {
      let range = []
      let lenghtRange = 4
      if (this.setPages.length === 1) {
        return range
      }
      if (this.setPages.length === 2) {
        if (this.page !== 1 && this.page !== this.setPages.length) {
          lenghtRange = this.page + 2
        }
        lenghtRange = 2
      }
      if (this.setPages.length === 3) {
        if (this.page !== 1 && this.page !== this.setPages.length) {
          lenghtRange = this.page + 2
        }
        lenghtRange = 3
      }
      if (this.setPages.length === 4) {
        if (this.page !== 1 && this.page !== this.setPages.length) {
          lenghtRange = this.page + 2
        }
        lenghtRange = 4
      }
      if (this.setPages.length >= 5) {
        if (this.page !== 1 && this.page !== this.setPages.length) {
          lenghtRange = this.page + 2
        }
        lenghtRange = 4
      }
      // -----------------------------------------------------
      if (this.setPages.length === 0) {
        if (this.page !== 1 && this.page !== this.setPages.length) {
          lenghtRange = this.page + 2
        }
        return range
      }
      if (this.page === 1) {
        for (let index = 2; index <= lenghtRange; index++) {
          range.push(index)
        }
      } else if (
        this.page === this.setPages.length ||
        this.page + 1 === this.setPages.length ||
        this.page + 2 === this.setPages.length
      ) {
        if (this.setPages.length >= 5) {
          for (let index = this.setPages.length - 3; index <= 4; index++) {
            range.push(index)
          }
        }
        if (this.setPages.length < 5) {
          for (let index = 2; index <= lenghtRange; index++) {
            range.push(index)
          }
        }
      } else if (this.page !== 1 && this.page !== this.setPages.length) {
        for (let index = this.page; index <= lenghtRange; index++) {
          range.push(index)
        }
      }
      return range
    },
    paginatedAddresses() {
      return this.paginate(this.addresses)
    },
    transactionsError() {
      return {
        message: this.createVTTErrorMessage,
        description: this.createVTTErrorDescription,
        name: this.createVTTErrorName,
      }
    },
  },
  methods: {
    toogleDirectionRight: function(position) {
      position++
      this.page++
      if (position === 1) {
        this.firstItemActive = true
        this.lastItemActive = false
        this.middleItemActive = null
      } else if (position === this.setPages.length) {
        this.lastItemActive = true
        this.firstItemActive = false
        this.middleItemActive = null
      } else {
        this.middleItemActive = position
        this.firstItemActive = false
        this.lastItemActive = false
      }
    },
    toogleDirectionLeft: function(position) {
      this.page--
      position--
      if (position === this.setPages.length) {
        this.lastItemActive = true
        this.firstItemActive = false
        this.middleItemActive = null
      } else if (position === 1) {
        this.firstItemActive = true
        this.lastItemActive = false
        this.middleItemActive = null
      } else if (position < this.setPages.length) {
        this.middleItemActive = position
        this.firstItemActive = false
        this.lastItemActive = false
      }
    },
    tooglePaginationButton: function(position) {
      if (position === 'last') {
        this.page = this.setPages.length
        this.lastItemActive = true
        this.firstItemActive = false
        this.middleItemActive = null
      } else if (position === 'first') {
        this.page = 1
        this.firstItemActive = true
        this.lastItemActive = false
        this.middleItemActive = null
      } else {
        this.page = position
        this.middleItemActive = position
        this.firstItemActive = false
        this.lastItemActive = false
      }
    },
    displayModalSend: function() {
      this.dialogVisible = true
    },
    displayModalReceive: function() {
      this.generateAddress()
      this.dialogVisible2 = true
      this.setPages()
    },
    closeAndClear: function() {
      this.clearError(this.createVTTErrorName)
    },
    clearError: function() {
      return this.$store.commit('clearError', { error: this.createVTTErrorName })
    },
    paginate(posts) {
      let page = this.page
      let perPage = this.perPage
      let from = page * perPage - perPage
      let to = page * perPage
      return posts.slice(from, to)
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
  .pagination-nav {
    padding: 16px;
    text-align: center;

    .page-link {
      padding: 10px;
      border-radius: 2px;
      border: none;
      background-color: transparent;
      color: $blue-6;
      font-size: 14px;
      margin: 4px;
    }
    .static {
      border: none;
      background-color: $blue-1;
      color: $grey-6;
    }
    .num {
      border: none;
      background-color: transparent;
      color: $grey-6;
    }
    .active {
      color: $blue-6;
      font-size: 16px;
    }
    :active,
    :focus,
    :hover {
      outline: none;
      cursor: pointer;
    }
  }
}
</style>

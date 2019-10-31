<template>
  <div>
    <TopBar :tabs="tabs" />
    <!-- <Alert
      v-for="error in errors"
      :key="error.name"
      type="error"
      :message="error.message"
      :description="error.description"
      v-on:close="() => clearError(error.name)"
    /> -->
    <router-view />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import { mapState } from 'vuex'

export default {
  name: 'Wallet',
  data() {
    return {
      tabs: [{ name: 'Transactions', link: '/wallet/transactions' }],
    }
  },
  methods: {
    clearError(errorName) {
      this.$store.commit('clearError', { error: errorName })
    },
  },
  computed: {
    ...mapState({
      getTransactionsError: state => {
        return state.wallet.errors.getTransactions
      },
      createVTTError: state => {
        return state.wallet.errors.createVTT
      },
    }),
    // errors() {
    //   return formatSectionApiErrorsByRoute(
    //     this.$route.name,
    //     {
    //       transactions: ['getTransactionsError'],
    //       // receive: ['receiveError'],
    //       send: ['createVTTError'],
    //     },
    //     {
    //       getTransactionsError: this.getTransactionsError,
    //       createVTTError: this.createVTTError,
    //     }
    //   )
    // },
  },
  components: {
    TopBar,
  },
}
</script>

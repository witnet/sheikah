<template>
  <div>
    <TopBar :tabs="tabs" />
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
  },
  components: {
    TopBar,
  },
}
</script>

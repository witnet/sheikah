<template>
  <LayoutSidebar data-test="main">
    <router-view></router-view>
  </LayoutSidebar>
</template>

<script>
import { mapActions } from 'vuex'
import LayoutSidebar from '@/components/LayoutSidebar'

export default {
  name: 'Main',
  components: {
    LayoutSidebar,
  },
  created() {
    this.pollData()
  },
  data() {
    return {
      pollingInterval: setInterval(this.pollData, 1000),
    }
  },
  methods: {
    ...mapActions({
      getBalance: 'getBalance',
      getTransactions: 'getTransactions',
      getAddresses: 'getAddresses',
      getWalletInfos: 'getWalletInfos',
    }),
    pollData() {
      const currentRoute = this.$router.currentRoute.path
      const matchRoute = currentRoute.startsWith('/welcome-back') || currentRoute.startsWith('/ftu')
      this.getWalletInfos()
      if (!matchRoute) {
        this.getBalance()
        this.getTransactions({ limit: 50, page: 0 })
        this.getAddresses()
      }
    },
  },
}
</script>

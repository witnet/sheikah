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
      if (matchRoute) {
        this.getWalletInfos()
      }
      setTimeout(this.pollData, 30000)
    },
  },
}
</script>

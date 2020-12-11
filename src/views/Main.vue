<template>
  <LayoutSidebar data-test="main">
    <template v-slot:sidebar>
      <Sidebar />
    </template>

    <router-view />
  </LayoutSidebar>
</template>

<script>
import { mapActions } from 'vuex'
import LayoutSidebar from '@/components/LayoutSidebar'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'Main',
  components: {
    LayoutSidebar,
    Sidebar,
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
      shutdown: 'shutdown',
    }),
    pollData() {
      const currentRoute = this.$router.currentRoute.path
      const matchRoute =
        currentRoute.startsWith('/welcome-back') ||
        currentRoute.startsWith('/ftu')
      if (matchRoute) {
        this.getWalletInfos()
      }
      setTimeout(this.pollData, 30000)
    },
  },
}
</script>

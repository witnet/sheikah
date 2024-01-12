<template>
  <div class="layout">
    <Sidebar />
    <router-view class="main" />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Main',
  components: {
    Sidebar,
  },
  created() {
    this.pollData()
  },
  beforeUnmount() {
    this.closeModals()
  },
  methods: {
    ...mapMutations({
      closeModals: 'closeAllModals',
    }),
    ...mapActions({
      getBalance: 'getBalance',
      getTransactions: 'getTransactions',
      getAddresses: 'getAddresses',
      getWalletInfos: 'getWalletInfos',
      shutdown: 'shutdown',
    }),
    pollData() {
      const currentRoute = this.$route.path

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

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.layout {
  background: var(--app-background-color);
  display: grid;
  grid-template-columns: 70px 1fr;
}

.sidebar {
  grid-row-end: span 2;
}

.main {
  background: var(--app-background-color);
  min-height: 100vh;
}
</style>

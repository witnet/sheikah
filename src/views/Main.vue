<template>
  <div class="layout" data-test="home">
    <Sidebar />
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Main',
  components: {
    Sidebar,
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

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Titillium+Web:300,300i,400,400i,600,600i&display=swap');

.layout {
  display: flex;
  position: relative;

  .main {
    height: 100vh;
    overflow-y: auto;
    width: 100%;
  }
  .alert {
    margin: 0px;
  }
}
</style>

<template>
  <div id="app">
    <router-view />
    <Notification />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import Notification from '@/components/Notification'

export default {
  name: 'App',
  components: {
    Notification,
  },
  data() {
    return {
      loading: true,
      polling: null,
    }
  },
  watch: {
    $route: function(from, to) {
      this.loading = false
    },
  },
  async created() {
    await this.getWalletInfos()
    this.pollData()
    // Disable back and forward from keyboard and mouse buttons
    window.onpopstate = function(event) {
      event.stopImmediatePropagation()
    }
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  methods: {
    ...mapMutations({
      checkNetworkStatus: 'checkNetworkStatus',
    }),
    ...mapActions({
      getWalletInfos: 'getWalletInfos',
    }),
    pollData() {
      this.polling = setInterval(() => {
        this.checkNetworkStatus()
      }, 3000)
    },
  },
  async beforeCreate() {
    this.$store.dispatch('getWalletInfos')

    // Initialize polling interval to retrieve network status
    setInterval(() => {
      this.$store.commit('checkNetworkStatus')
      this.$store.commit('checkTokenGenerationEventDate')
    }, 3000)
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
@import '@/styles/app.global.scss';

.app {
  min-height: 100vh;
  min-width: 100vw;
}
</style>

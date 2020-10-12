<template>
  <div id="app">
    <router-view />
    <UpdateNotification v-if="isUpdateNotificationVisible" />
    <Notification />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import UpdateNotification from '@/components/UpdateNotification'
import Notification from '@/components/Notification'

export default {
  name: 'App',
  components: {
    UpdateNotification,
    Notification,
  },
  data() {
    return {
      loading: true,
      polling: null,
    }
  },
  computed: {
    ...mapState({
      isUpdateNotificationVisible: state =>
        state.uiInteractions.isUpdateNotificationVisible,
      tokenGenerationEventOccurred: state =>
        state.wallet.tokenGenerationEventOccurred,
    }),
  },
  watch: {
    $route: function(from, to) {
      this.loading = false
    },
  },
  async created() {
    this.pollData()

    // Disable back and forward from keyboard and mouse buttons
    window.onpopstate = function(event) {
      event.stopImmediatePropagation()
    }
    if (process.env.VUE_APP_CLAIMING_PROCESS) {
      const tokenGenerationInterval = setInterval(() => {
        if (this.tokenGenerationEventOccurred) {
          clearInterval(tokenGenerationInterval)
          this.deleteSession()
          this.$router.push('/')
        }
        this.$store.commit('checkTokenGenerationEventDate')
      }, 1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  methods: {
    ...mapMutations({
      checkNetworkStatus: 'checkNetworkStatus',
      deleteSession: 'deleteSession',
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

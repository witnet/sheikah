<template>
  <div id="app">
    <router-view />
    <Notification />

    <ResyncConfirmation v-if="isResyncConfirmationVisible" />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import Notification from '@/components/Notification'

export default {
  name: 'App',
  components: {
    Notification,
    ResyncConfirmation: () => import('@/components/ResyncConfirmation'),
  },
  data() {
    return {
      loading: true,
      polling: null,
    }
  },
  computed: {
    ...mapState({
      tokenGenerationEventOccurred: state =>
        state.wallet.tokenGenerationEventOccurred,
      isResyncConfirmationVisible: state =>
        state.uiInteractions.isResyncConfirmationVisible,
    }),
  },
  watch: {
    $route: function(from, to) {
      this.loading = false
    },
  },
  async created() {
    this.pollData()
    this.getNotifications()
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
      deleteSession: 'deleteSession',
    }),
    ...mapActions({
      getWalletInfos: 'getWalletInfos',
      getNotifications: 'getNotifications',
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

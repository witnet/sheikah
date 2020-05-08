<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'app',
  async created() {
    await this.getWalletInfos()
    this.pollData()
    // Disable back and forward from keyboard and mouse buttons
    window.onpopstate = function(event) {
      event.stopImmediatePropagation()
    }
  },
  data() {
    return {
      loading: true,
      polling: null,
    }
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
  watch: {
    $route: function(from, to) {
      this.loading = false
    },
  },
  computed: {
    x() {
      return this.$route
    },
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
@import '@/styles/app.global.scss';
.app {
  min-width: 100vw;
  min-height: 100vh;
}
</style>

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
    // Initialize polling interval to retrieve network status
    setInterval(() => {
      this.checkNetworkStatus()
    }, 3000)
    // Disable back and forward from keyboard and mouse buttons
    window.onpopstate = function(event) {
      event.stopImmediatePropagation()
    }
  },
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    ...mapMutations({
      checkNetworkStatus: 'checkNetworkStatus',
    }),
    ...mapActions({
      getWalletInfos: 'getWalletInfos',
    }),
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
}
</script>

<style lang="scss">
@import '@/styles/app.global.scss';
.app {
  min-width: 100vw;
  min-height: 100vh;
}
</style>

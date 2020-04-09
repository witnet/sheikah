<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
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
  async beforeCreate() {
    this.$store.dispatch('getWalletInfos')
    // Initialize polling interval to retrieve network status
    setInterval(() => {
      this.$store.commit('checkNetworkStatus')
    }, 3000)
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

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',

  mounted () {
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
</style>

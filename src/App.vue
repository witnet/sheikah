<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',

  created () {
    setInterval(() => {
      this.$store.commit('checkNetworkStatus')
    }, 3000)
  },
}
</script>

<style lang="scss">

</style>

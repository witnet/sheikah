<template>
  <div id="app">
    <!-- <Spinner class="spinner" v-if="loading" /> -->
    <router-view />
  </div>
</template>

<script>
// import Spinner from '@/components/Spinner.vue'

export default {
  name: 'app',
  components: {
    // Spinner,
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
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

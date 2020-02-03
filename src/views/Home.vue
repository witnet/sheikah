<template>
  <div class="layout" data-test="home">
    <Sidebar />
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Home',
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
    pollData() {
      this.$store.dispatch('getTransactions', { limit: 50, page: 0 })
      this.$store.dispatch('getAddresses')
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Titillium+Web:300,300i,400,400i,600,600i&display=swap');

.layout {
  display: flex;

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

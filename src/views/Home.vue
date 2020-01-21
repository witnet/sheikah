<template>
  <div class="layout" data-test="home">
    <Sidebar />
    <div class="main">
      <Alert
        data-test="alert"
        v-for="error in errors"
        :key="error.message"
        type="error"
        :message="error.message"
        :description="error.description"
        v-on:close="() => clearError(error.name)"
      />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Alert from '@/components/Alert'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Sidebar,
    Alert,
  },
  methods: {
    clearError(errorName) {
      this.$store.commit('clearError', { error: errorName })
    },
  },
  computed: {
    ...mapState({
      closeSessionError: state => {
        if (state.wallet.errors.closeSession) {
          return {
            message: state.wallet.errors.closeSession.message,
            description: state.wallet.errors.closeSession.error.message,
            name: state.wallet.errors.closeSession.name,
          }
        }
      },
      networkError: state => {
        if (state.wallet.errors.network) {
          return {
            message: state.wallet.errors.network.message,
            description: state.wallet.errors.network.error,
            name: state.wallet.errors.network.name,
          }
        }
      },
    }),
    errors() {
      return [this.closeSessionError, this.networkError].filter(error => !!error)
    },
  },
  beforeDestroy() {
    if (this.closeSessionError) {
      this.clearError(this.closeSessionError.name)
    }
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

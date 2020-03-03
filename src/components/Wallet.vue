<template>
  <div>
    <Alert
      data-test="alert"
      v-for="error in errors"
      :key="error.message"
      type="error"
      :message="error.message"
      :description="error.description"
      v-on:close="() => clearError(error.name)"
    />
    <router-view />
  </div>
</template>

<script>
import Alert from '@/components/Alert'
import { mapState } from 'vuex'

export default {
  name: 'Wallet',
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
            description: state.wallet.errors.closeSession.error,
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
  components: {
    Alert,
  },
}
</script>

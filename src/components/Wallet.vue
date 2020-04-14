<template>
  <div>
    <Alert
      data-test="alert"
      v-for="error in errors"
      :key="error.message"
      type="error"
      :message="error.message"
      :description="error.description"
      v-on:close="() => clearError({ error: error.name })"
    />
    <router-view />
  </div>
</template>

<script>
import Alert from '@/components/Alert'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Wallet',
  methods: {
    ...mapMutations({
      clearError: 'clearError',
    }),
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
      this.clearError({ error: this.closeSessionError.name })
    }
  },
  components: {
    Alert,
  },
}
</script>

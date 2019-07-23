<template>
  <div class="unlock-wallet">
    <p class="text">Insert a password to unlock wallet</p>
    <input v-model="password" type="password">

    <button @click="unlockWallet">
      Unlock
    </button>
    <p v-if="showError">Invalid password</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UnlockWallet',
  data () {
    return {
      password: '',
      showError: false,
      sent: false,
    }
  },
  methods: {
    unlockWallet () {
      this.$store.dispatch('unlockWallet', { walletId: this.$route.params.id, password: this.password })
      this.sent = true
    },
    updateView () {
      this.showError = false
      this.$router.push('/wallet/transactions')
    },
  },
  computed: {
    ...mapState({
      walletId: state => {
        return state.wallet.walletId
      },
      sessionId: state => state.wallet.sessionId,
    }),
  },
  watch: {
    sessionId: function(newValue) {
      if (newValue) {
        this.updateView()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .unlock-wallet{
    .text {
      margin-bottom: 30px;
    }
}
</style>

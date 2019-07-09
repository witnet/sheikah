<template>
  <div class="unlock-wallet">
    <p class="text">Insert a password to unlock wallet</p>
    <input v-model="password" type="password">

    <button @click="unlockWallet">
      Unlock
    </button>
    <p v-if="showError">Invalid password</p>

    <p v-if="sent">{{ updateView(wallet) }}</p>
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
    updateView (wallet) {
      if (wallet) {
        this.showError = false
        this.$router.push('/wallet/transactions')
      } else {
        // this.showError = true
      }
    },
  },
  computed: {
    ...mapState({
      wallet: state => state.wallet.wallet,
    }),
  },
}
</script>

<style scoped lang="scss">
  .unlock-wallet{
    .text {
      margin-bottom: 30px;
    }
}
</style>

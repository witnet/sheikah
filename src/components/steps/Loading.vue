<template>
  <Card class="">
    <div class="card">
      <p class="title">Sheikah is loading your wallet</p>
      <Spinner class="spinner" :active="true" />
      <p class="description">This will take a few seconds</p>
    </div>
  </Card>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/card/Card.vue'
import Spinner from '@/components/Spinner.vue'

export default {
  name: 'WalletDisclaimer',
  components: {
    Card,
    Spinner,
  },
  methods: {
    goToFirstStep() {
      this.$router.push('/ftu/welcome')
    },
    reloadView() {},
  },
  computed: {
    ...mapState({
      sessionId: state => state.wallet.sessionId,
      error: state => state.wallet.errors.unlockWallet || state.wallet.errors.createWallet,
    }),
  },
  watch: {
    sessionId(value) {
      if (value) {
        this.$router.push('/wallet/transactions')
      }
    },
    error(value) {
      if (value) {
        this.goToFirstStep()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.card {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: center;
  .title {
    border: none;
    color: $purple-4;
    font-size: 24px;
    margin: 0 0 32px 0;
  }

  .description {
    color: $purple-6;
    font-size: 16px;
    margin: 32px 0 0 0;
  }

  .spinner {
    grid-row: 3;
    margin: 0 auto;
  }
}
</style>

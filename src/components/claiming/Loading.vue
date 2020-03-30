<template>
  <Card data-test="loading">
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
import { sleep } from '@/utils'
export default {
  name: 'Loading',
  components: {
    Card,
    Spinner,
  },
  methods: {
    goToFirstStep() {
      this.$router.push('/claiming/claiming-instructions')
    },
    reloadView() {},
  },
  computed: {
    ...mapState({
      sessionId: state => state.wallet.sessionId,
      disclaimers: state => state.wallet.disclaimers,
      error: state => state.wallet.errors.unlockWallet || state.wallet.errors.createWallet,
    }),
  },
  watch: {
    async sessionId(value) {
      if (value) {
        await sleep(2000)
        this.$store.dispatch('signData')
        this.$store.dispatch('saveClaimingInfo')
        this.$router.push('/claiming/generate-addresses')
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
  width: max-content;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    border: none;
    color: $blue-6;
    font-size: 24px;
    margin: 0 0 48px 0;
  }
  .description {
    color: $blue-6;
    font-size: 16px;
    margin: 40px 0 0 0;
  }
  .spinner {
    grid-row: 3;
    margin: 0 auto;
  }
}
</style>

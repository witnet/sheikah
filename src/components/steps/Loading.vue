<template>
  <Card class="">
    <div class="card">
      <p class="title">{{ $t('loading_0') }}</p>
      <Spinner class="spinner" :active="true" />
      <p class="description">{{ $t('loading_1') }}</p>
    </div>
  </Card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Card from '@/components/card/Card.vue'
import Spinner from '@/components/Spinner.vue'
// TODO(#1714): Remove logic from this component
export default {
  name: 'WalletDisclaimer',
  components: {
    Card,
    Spinner,
  },
  computed: {
    ...mapState({
      locale: state => state.wallet.locale,
      sessionId: state => state.wallet.sessionId,
      error: state =>
        state.wallet.errors.unlockWallet || state.wallet.errors.createWallet,
    }),
  },
  watch: {
    sessionId(value) {
      if (value) {
        this.$router.push(`/wallet/transactions?session_id=${this.sessionId}`)
        // TODO: uncomment when witnet-request-js is compatible with esm
        // this.setDefaultTemplates()
      }
    },
    error(value) {
      if (value) {
        this.goToFirstStep()
      }
    },
  },
  methods: {
    ...mapMutations({
      setDefaultTemplates: 'setDefaultTemplates',
    }),
    goToFirstStep() {
      this.$router.push('/ftu/welcome')
    },
    reloadView() {},
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
    color: var(--loading-title);
    font-size: 24px;
    margin: 0 0 32px;
  }

  .description {
    color: var(--loading-description);
    font-size: 16px;
    margin: 32px 0 0;
  }

  .spinner {
    grid-row: 3;
    margin: 0 auto;
  }
}
</style>

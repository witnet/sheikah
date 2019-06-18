<template>
  <BaseCard
    class="card"
  >
    <p class="title">Sheikah is loading your wallet</p>
    <Spinner class="spinner" :active="true" />
    <p class="description">This will take a few seconds</p>
    <p v-if="wallet"> {{ reloadView() }} </p>
  </BaseCard>

</template>

<script>
import BaseCard from '@/components/BaseCard.vue'
import Spinner from '@/components/Spinner.vue'

export default {
  name: 'WalletDisclaimer',
  components: {
    BaseCard,
    Spinner,
  },
  methods: {
    previousStep () {
      this.$router.push('/ftu/seed-type-selection')
    },
    nextStep () {
      this.$store.dispatch('createMnemonics')
      this.$router.push('ftu/seed-backup')
    },
    reloadView () {
      if (this.wallet) {
        this.$router.push('/wallet/transactions')
      }
    },
  },
  computed: {
    wallet () {
      return this.$store.state.wallet
    },
  },

}
</script>

<style scoped lang="scss">
  @import '@/styles/_colors.scss';

.card {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: center;
  width: 600px;
}

.title {
  border: none;
  color: $blue-6;
  font-size: 20px;
  margin: 0 0 20px 0;
}

.description {
  color: $blue-6;
  font-size: 14px;
  margin: 20px 0 0 0;
}

.spinner {
  grid-row: 3;
  margin: 0 auto;
}

</style>

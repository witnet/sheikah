<template>
  <BaseCard
    class="card"
  >
    <p class="title">Sheikah is loading your wallet</p>
    <Spinner class="spinner" :active="true" />
    <p class="description">This will take a few seconds</p>
    <p v-if="wallet"></p>
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
  },
  computed: {
    wallet () {
      const wallet = this.$store.state.wallet
      if (wallet) {
        this.$router.push('/wallet/transaction')
      }
      return wallet
    },
  },

}
</script>

<style scoped lang="scss">
  @import '@/styles/_colors.scss';

.card {
  height: 450px;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.spinner {

}

  // .modal {
  //   align-items: center;
  //   background: $loading_modal-background;
  //   display: grid;
  //   grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  //   height: $loading_modal-height;
  //   position: absolute;
  //   width: $loading_modal-width;
  //   z-index: 10;

    .title {
      color: $blue-6;
      font-size: 20px;
      // grid-row: 2;
      margin: 0 0 20px 0;
      border: none;
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

  .hidden {
    display: none;
  }
</style>

<template>
  <BaseCard
    class="wallet-creation"
  >
    <div class='creation-title-container'>
      <h5 class='creation-title'>IMPORTANT</h5>
    </div>
    <div class="content">
      <p>Your wallet is being created</p>
      <p v-if="wallet">Your wallet was created</p>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue'

export default {
  name: 'WalletDisclaimer',
  components: {
    BaseCard,
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

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.wallet-creation .shadow {
  height: 550px;
}

.creation-title-container {
  align-items: center;
  background: $sheikah-gradient;
  border-bottom: solid 1px $grey-4;
  color: $grey-2;
  display: flex;
  flex-flow: row nowrap;
  font-size: $loading-modal-title-font-size;
  font-size: 19px;
  font-weight: 100;
  height: 100px;
}

.creation-title {
  margin-left: 38px;
}

.content {
  padding: 40px;
}
</style>
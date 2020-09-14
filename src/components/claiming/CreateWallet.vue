<template>
  <div>
    <NavigationCard
      data-test="create-wallet"
      class="introduction"
      title="Create your wallet"
      :previous-step="previousStep"
      :next-step="nextStep"
      :disabled-next-button="false"
      previous-text="Back"
      next-text="Let's do it"
    >
      <p class="text bold">
        This assistant will guide you through the process of creating your own
        Witnet wallet.
      </p>
      <p class="text">
        A wallet is an app that keeps your credentials safe and lets you
        interface with the Witnet blockchain in many ways: from transferring Wit
        to someone else to creating smart contracts.
      </p>
    </NavigationCard>
  </div>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'WelcomeForm',
  components: {
    NavigationCard,
  },

  computed: {
    sessionId() {
      const walletInfosLength = this.$store.state.wallet.walletInfos.length
      return walletInfosLength > 0
    },
  },
  methods: {
    previousStep() {
      this.$router.push('/claiming/vesting')
    },
    nextStep() {
      this.$router.push('/claiming/disclaimer/0')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.text {
  margin-bottom: 8px;

  &.bold {
    font-weight: bold;
  }

  &:last-of-type {
    margin: 0;
  }
}
</style>

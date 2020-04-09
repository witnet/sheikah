<template>
  <Disclaimer
    data-test="header-2"
    class="wallet-disclaimer"
    title="Hey, listen!"
    :previousStep="previousStep"
    :nextStep="nextStep"
    previousText="Back"
    nextText="I will be careful, I promise!"
  >
    <p class="text bold">Please, read carefully before continue.</p>
    <p class="text">
      A wallet is an app that keeps your credentials safe and lets you interface with the Witnet
      blockchain in many ways: from transferring Wit to someone else to creating smart contracts.
    </p>
    <p class="text">
      You should never share your seed phrase with anyone. We at Witnet do not store your seed
      phrase and will never ask you to share it with us. If you lose your seed phrase, you will
      permanently lose access to your wallet and your funds.
    </p>
    <p class="text">
      If someone finds or sees your seed phrase, they will have access to your wallet and all of
      your funds.
    </p>
    <p class="text">
      We recommend storing your seed phrase on paper somewhere safe. Do not store it in a file on
      your computer or anywhere electronically.
    </p>
  </Disclaimer>
</template>

<script>
import Disclaimer from '@/components/card/Disclaimer'

export default {
  name: 'WalletDisclaimer',
  components: {
    Disclaimer,
  },
  methods: {
    previousStep() {
      this.$router.push('/ftu/welcome')
    },
    nextStep() {
      this.$router.push('/ftu/seed-backup')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.text {
  margin-bottom: 8px;
  color: $white;
  &.bold {
    color: $white;
    font-weight: bold;
    margin-bottom: 16px;
  }
  &:last-of-type {
    margin: 0px;
  }
}
</style>

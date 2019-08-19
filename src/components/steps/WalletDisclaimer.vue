<template>
  <NavigationCard
    class="wallet-disclaimer"
    title="IMPORTANT"
    :previousStep="previousStep"
    :nextStep="nextStep"
    previousText="Back"
    nextText="I will be careful, I promise!"
  >
    <p class="paragraph">
      You will be shown a 12 word seed phrase. This seed phrase is very important. If you are ever
      locked out of your wallet or lose access for any reason, you can regain access to your wallet
      again from any computer using your seed phrase.
    </p>
    <p class="paragraph">
      You should never share your seed phrase with anyone. We at Witnet do not store your seed
      phrase and will never ask you to share it with us. If you lose your seed phrase, you will
      permanently lose access to your wallet and your funds.
    </p>
    <p class="paragraph">
      If someone finds or sees your seed phrase, they will have access to your wallet and all of
      your funds.
    </p>
    <p class="paragraph">
      We recommend storing your seed phrase on paper somewhere safe. Do not store it in a file on
      your computer or anywhere electronically.
    </p>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'WalletDisclaimer',
  components: {
    NavigationCard,
  },
  methods: {
    previousStep() {
      this.$router.push('/ftu/seed-type-selection')
    },
    nextStep() {
      this.$store.dispatch('createMnemonics')
      this.$router.push('/ftu/seed-backup')
    },
  },
}
</script>

<style lang="scss" scoped>
.paragraph {
  margin-bottom: 15px;
  font-size: 16px;
  padding: 0 10px;
}
</style>

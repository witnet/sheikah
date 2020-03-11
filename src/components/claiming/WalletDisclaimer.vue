<template>
  <NavigationCard
    data-test="header-2"
    class="wallet-disclaimer"
    title="Important"
    :previousStep="previousStep"
    :nextStep="nextStep"
    previousText="Back"
    nextText="I will be careful, I promise!"
  >
    <InformativeContent :subtitle="subtitle" :texts="texts" />
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import InformativeContent from '@/components/card/InformativeContent'

export default {
  name: 'WalletDisclaimer',
  components: {
    NavigationCard,
    InformativeContent,
  },
  data() {
    return {
      subtitle: 'Please, read carefully before continue,',
      texts: {
        0: 'A wallet is an app that keeps your credentials safe and lets you interface with the Witnet blockchain in many ways: from transferring Wit to someone else to creating smart contracts.',
        1: 'You should never share your seed phrase with anyone. We at Witnet do not store your seed phrase and will never ask you to share it with us. If you lose your seed phrase, you will permanently lose access to your wallet and your funds.',
        2: 'If someone finds or sees your seed phrase, they will have access to your wallet and all of your funds.',
        3: 'We recommend storing your seed phrase on paper somewhere safe. Do not store it in a file on your computer or anywhere electronically.',
      },
    }
  },
  methods: {
    previousStep() {
      this.$router.push('/claiming/seed-type-selection')
    },
    nextStep() {
      this.$router.push('/claiming/seed-backup')
    },
  },
}
</script>

<style lang="scss" scoped>
.paragraph {
  margin-bottom: 16px;
  font-size: 16px;
  padding: 0 8px;
}
</style>

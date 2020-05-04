<template>
  <NavigationCard
    data-test="header-3"
    class="wallet-seed-backup"
    title="Wallet seed phrase backup"
    previousText="Back"
    nextText="Next"
    :previousStep="() => this.$router.push('/ftu/disclaimer')"
    :nextStep="() => this.$router.push('/ftu/seed-validation')"
  >
    <p class="paragraph-title">Your 12 word seed phrase:</p>
    <pre data-test="word-seed" class="seed">{{ seed }}</pre>
    <p class="paragraph">
      Please copy these 12 words onto a piece of paper which you will be able to safely store and
      secure. You must write the complete words in the exact order they are presented to you.
    </p>
    <p class="paragraph">
      We do not store your seed phrase - if you exit this setup or fail to write down your seed
      phrase, we cannot help you access your wallet.
    </p>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'WalletSeedBackup',

  computed: {
    ...mapState({
      seed: state => state.wallet.mnemonics,
    }),
  },
  components: {
    NavigationCard,
  },
  methods: {
    ...mapMutations({
      clearError: 'clearError',
    }),
    ...mapActions({
      createMnemonics: 'createMnemonics',
    }),
    calculateFirstSentence: () =>
      this.seed
        .split(' ')
        .slice(0, 6)
        .join(' '),
    calculateSecondSentence: () =>
      this.seed
        .split(' ')
        .slice(6)
        .join(' '),
  },
  created() {
    this.createMnemonics()
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.content {
  padding: 40px;
}

.seed {
  font-family: inherit;
  align-items: center;
  border-radius: $input_big-border-radius;
  border: $input_big-border;
  box-sizing: border-box;
  color: $input_big-color;
  font-size: 22px;
  line-break: auto;
  line-height: 1.5em;
  margin: 24px 0px;
  padding: 24px;
  white-space: pre-wrap;
  width: 100%;
  &:hover {
    border: $input_big-hover-border;
    box-shadow: $input_big-hover-box-shadow;
  }
}

.seed-text {
  color: $input_big-color;
  width: inherit;
}

.paragraph {
  margin-bottom: 8px;
  &:last-of-type {
    margin-bottom: 0px;
  }
}
</style>

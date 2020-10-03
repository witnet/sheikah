<template>
  <NavigationCard
    data-test="header-3"
    class="wallet-seed-backup"
    title="Wallet seed phrase backup"
    previous-text="Back"
    next-text="Next"
    :previous-step="() => this.$router.push('/ftu/disclaimer')"
    :next-step="() => this.$router.push('/ftu/seed-validation')"
  >
    <p class="paragraph-title">Your 12 word seed phrase:</p>
    <pre
      data-test="word-seed"
      class="seed"
      :class="{ 'copy-disabled': isCopyMnemonicsDisabled }"
      >{{ seed }}</pre
    >
    <p class="paragraph">
      Please write down these 12 words on a piece of paper and store them
      somewhere private and secure. You must write the complete words in the
      exact order they are presented to you.
    </p>
    <p class="text">
      Keeping your seed phrase secret is paramount. If someone gains access
      these 12 words, they will be able to take and spend your tokens.
    </p>
    <p class="paragraph">
      Do not store these words on a computer or an electronic device. It is your
      sole responsibility to store the paper with your seed phrase in a safe
      place-if you exit this setup or fail to write down or keep your seed
      phrase safe, we cannot help you access your wallet.
    </p>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'WalletSeedBackup',
  components: {
    NavigationCard,
  },
  computed: {
    ...mapState({
      seed: state => state.wallet.mnemonics,
    }),
    isCopyMnemonicsDisabled() {
      return process.env.NODE_ENV !== 'development'
    },
  },
  created() {
    this.createMnemonics()
  },
  methods: {
    ...mapMutations({
      clearError: 'clearError',
    }),
    ...mapActions({
      createMnemonics: 'createMnemonics',
    }),
    calculateFirstSentence() {
      return this.seed
        .split(' ')
        .slice(0, 6)
        .join(' ')
    },
    calculateSecondSentence() {
      return this.seed
        .split(' ')
        .slice(6)
        .join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.content {
  padding: 40px;
}

.seed {
  align-items: center;
  border: $input_big-border;
  border-radius: $input_big-border-radius;
  box-sizing: border-box;
  color: $input_big-color;
  font-family: inherit;
  font-size: 22px;
  line-break: auto;
  line-height: 1.5em;
  margin: 24px 0;
  padding: 24px;
  white-space: pre-wrap;
  width: 100%;
}

.seed-text {
  color: $input_big-color;
  width: inherit;
}

.paragraph {
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.copy-disabled {
  user-select: none;
}
</style>

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
    <Alert
      data-test="alert"
      v-if="createMnemonicsError"
      :key="createMnemonicsError.message"
      type="error"
      :message="createMnemonicsError.message"
      :description="createMnemonicsError.description"
      v-on:close="() => clearError(createMnemonicsError.name)"
    />
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
import { mapState } from 'vuex'
import Alert from '@/components/Alert'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'WalletSeedBackup',

  computed: {
    ...mapState({
      seed: state => state.wallet.mnemonics,
      createMnemonicsError: state => {
        if (state.wallet.errors.createMnemonics) {
          return {
            message: state.wallet.errors.createMnemonics.message,
            description: state.wallet.errors.createMnemonics.error.message,
            name: state.wallet.errors.createMnemonics.name,
          }
        }
      },
    }),
  },
  components: {
    NavigationCard,
    Alert,
  },
  methods: {
    clearError(errorName) {
      this.$store.commit('clearError', { error: errorName })
    },
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
  beforeCreate() {
    this.$store.dispatch('createMnemonics')
  },
  beforeDestroy() {
    if (this.createMnemonicsError) {
      this.clearError(this.createMnemonicsError.name)
    }
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
  border-radius: $input_big-border-radius;
  border: $input_big-border;
  box-sizing: border-box;
  color: $input_big-color;
  font-size: 16px;
  line-break: auto;
  line-height: 1.5em;
  margin: 24px 0px;
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
    margin-bottom: 0px;
  }
}
</style>

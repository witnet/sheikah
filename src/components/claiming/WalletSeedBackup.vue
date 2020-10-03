<template>
  <NavigationCard
    data-test="wallet-seed-backup"
    class="wallet-seed-backup"
    title="Wallet Seed Phrase Backup"
    previous-text="Back"
    next-text="Continue"
    :previous-step="
      () => this.$router.push(`/claiming/disclaimer/${disclaimers.length - 1}`)
    "
    :next-step="() => this.$router.push('/claiming/seed-validation')"
    :disabled-next-button="false"
  >
    <p class="text"
      >These 12 random words are your Witnet <em>seed phrase</em>. They will
      allow you to recover your tokens if you uninstall Sheikah or forget your
      password:</p
    >
    <p
      data-test="word-seed"
      class="seed"
      :class="{ 'copy-disabled': isCopyMnemonicsDisabled }"
    >
      {{ seed }}
    </p>
    <p class="text bold">
      Please write down these 12 words on a piece of paper and store them
      somewhere private and secure. You must write the complete words in the
      exact order they are presented to you.
    </p>
    <p class="text">
      Keeping your seed phrase secret is paramount. If someone gains access to
      these 12 words, they will be able to take and spend your tokens.
    </p>
    <p class="text">
      Do not store these words on a computer or an electronic device. It is your
      sole responsibility to store the paper with your seed phrase in a safe
      place -
      <b class="text bold"
        >if you exit this setup or fail to write down or keep your seed phrase
        safe, we cannot help you access or recover your tokens.</b
      >
    </p>
  </NavigationCard>
</template>

<script>
import { mapState } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'WalletSeedBackup',
  components: {
    NavigationCard,
  },
  computed: {
    ...mapState({
      disclaimers: state => state.wallet.disclaimers,
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
    isCopyMnemonicsDisabled() {
      return process.env.NODE_ENV !== 'development'
    },
  },
  beforeCreate() {
    this.$store.dispatch('createMnemonics')
  },
  beforeDestroy() {
    if (this.createMnemonicsError) {
      this.clearError(this.createMnemonicsError.name)
    }
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
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.text {
  margin-bottom: 8px;

  em {
    font-style: italic;
  }

  &:last-of-type {
    margin: 0;
  }
}

.bold {
  font-weight: 600;
}

.seed {
  border: $input_big-border;
  border-radius: $input_big-border-radius;
  color: $input_big-color;
  font-size: $input_big-font-size;
  line-height: 1.5em;
  margin: 16px 0;
  padding: 24px;
}

.copy-disabled {
  user-select: none;
}
</style>

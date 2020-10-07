<template>
  <NavigationCard
    ref="navCard"
    data-test="header-4"
    class="wallet-seed-validation"
    title="Confirm your seed phrase"
    previous-text="Back"
    next-text="Next"
    :previous-step="previousStep"
    :next-step="nextStep"
  >
    <p>
      Please type your 12 word seed phrase.
    </p>
    <!-- maxlength = longest_mnemonic_length * words + whitespaces -->
    <!-- maxlength = 8 * 12 + 11 -->
    <Input
      v-model="seed"
      type="big"
      class="seed"
      :autoresize="true"
      :maxlength="107"
      @go-next="nextStep"
    />
    <p v-if="seedError" data-test="mnemonics-error-alert" class="match-error">
      {{ seedError.message }}
    </p>
    <p class="paragraph">
      Please ensure you do not add any extra spaces between words or at the
      beginning or end of the phrase.
    </p>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import NavigationCard from '@/components/card/NavigationCard'
import Input from '@/components/Input.vue'

export default {
  name: 'WalletImport',
  components: {
    NavigationCard,
    Input,
  },
  data() {
    return {
      seed: '',
      showError: '',
      error: '',
    }
  },
  computed: {
    ...mapState({
      mnemonics: state => state.wallet.mnemonics,
      mnemonicsError: state => {
        return state.wallet.errors.mnemonics
      },
      seedError: state => {
        return state.wallet.errors.seed
      },
      areMnemonicsValid: state => state.wallet.areMnemonicsValid,
      wallets: state => state.wallet.walletInfos,
    }),
  },
  watch: {
    seed() {
      if (this.seedError) {
        this.clearError({ error: this.seedError.name })
      }
    },
  },
  beforeDestroy() {
    if (this.mnemonicsError) {
      this.clearError({ error: this.mnemonicsError.name })
    }
    if (this.seedError) {
      this.clearError({ error: this.seedError.name })
    }
  },
  methods: {
    ...mapMutations({
      setSeed: 'setSeed',
      setError: 'setError',
      clearError: 'clearError',
    }),
    ...mapActions({
      validateImportedMnemonics: 'validateImportedMnemonics',
    }),
    async validateForm() {
      await this.validateImportedMnemonics({ mnemonics: this.seed })
      if (!this.seedError) {
        this.setSeed({ result: this.seed })
      }
    },
    async nextStep() {
      await this.validateForm()
      if (!this.seedError) {
        this.$router.push(`/ftu/encryption-pass`)
      }
    },
    previousStep() {
      this.$router.push('/ftu/welcome')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.content {
  padding: 40px;
}

.seed {
  align-items: center;
  border: $input_big-border;
  border-radius: $input_big-border-radius;
  box-sizing: border-box;
  color: $input_big-color;
  display: inline-flex;
  font-size: 22px;
  line-break: auto;
  line-height: 1.5em;
  margin: 24px 0;
  padding: 16px;
  width: 100%;
}

.match-error {
  color: $red-2;
}

.paragraph {
  margin-top: 16px;
}
</style>

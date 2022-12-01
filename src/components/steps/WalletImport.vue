<template>
  <NavigationCard
    ref="navCard"
    data-test="header-4"
    class="wallet-seed-validation"
    :title="$t('confirm_seed')"
    :previous-text="$t('back')"
    :next-text="$t('next')"
    :previous-step="previousStep"
    :next-step="nextStep"
  >
    <p>
      {{ $t('wallet_import_seed') }}
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
    <p
      v-if="mnemonicsError"
      data-test="mnemonics-error-alert"
      class="match-error"
    >
      {{ mnemonicsError.message }}
    </p>
    <p class="paragraph">
      {{ $t('wallet_import_seed_info') }}
    </p>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import NavigationCard from '@/components/card/NavigationCard.vue'
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
      areMnemonicsValid: state => state.wallet.areMnemonicsValid,
      wallets: state => state.wallet.walletInfos,
      repeatedWallet: state => state.wallet.repeatedWallet,
    }),
  },
  watch: {
    seed() {
      if (this.mnemonicsError) {
        this.clearError({ error: this.mnemonicsError.name })
      }
    },
  },
  beforeDestroy() {
    if (this.mnemonicsError) {
      this.clearError({ error: this.mnemonicsError.name })
    }
  },
  methods: {
    ...mapMutations({
      setSeed: 'setSeed',
      clearError: 'clearError',
    }),
    ...mapActions({
      validateImportedWallet: 'validateImportedWallet',
    }),
    async validateForm() {
      await this.validateImportedWallet({ mnemonics: this.seed })
      if (!this.mnemonicsError) {
        this.setSeed({ result: this.seed })
      }
    },
    async nextStep() {
      await this.validateForm()
      if (this.repeatedWallet) {
        this.$router.push('/ftu/repeated-wallet?import=true')
      } else if (!this.mnemonicsError) {
        this.$router.push(`/ftu/wallet-birthdate?import=true`)
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
  border: var(--seed-big-border);
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

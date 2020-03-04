<template>
  <NavigationCard
    data-test="header-4"
    class="wallet-seed-validation"
    title="Confirm your seed phrase"
    previousText="Back"
    nextText="Next"
    :previousStep="previousStep"
    :nextStep="nextStep"
    ref="navCard"
  >
    <p>
      Please type your 12 word seed phrase.
    </p>
    <Input type="big" class="seed" v-model="seed" v-on:go-next="nextStep" />
    <p data-test="mnemonics-error-alert" class="match-error" v-if="seedError">
      {{ seedError.message }}
    </p>
    <p class="paragraph">
      Please ensure you do not add any extra spaces between words or at the beginning or end of the
      phrase.
    </p>
  </NavigationCard>
</template>

<script>
import { mapState } from 'vuex'

import NavigationCard from '@/components/card/NavigationCard'
import Input from '@/components/Input.vue'

export default {
  name: 'WalletSeedValidation',
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
      validatedMnemonics: state => state.wallet.validatedMnemonics,
      wallets: state => this.$store.state.wallet.walletInfos,
    }),
  },
  watch: {
    seed() {
      if (this.seedError) {
        this.clearError(this.seedError.name)
      }
    },
  },
  methods: {
    setSeed() {
      this.$store.commit('setSeed', {
        result: this.seed,
      })
    },
    validateForm() {
      if (this.seed) {
        // TODO: set seed only if validated by the wallet
        this.setSeed()
      } else {
        this.$store.commit('setError', {
          name: 'seed',
          message: 'You must provide a seed to import a wallet',
        })
      }
    },
    nextStep() {
      this.validateForm()
      if (!this.seedError) {
        this.$router.push(`/ftu/encryption-pass`)
      }
    },
    clearError(errorName) {
      this.$store.commit('clearError', { error: errorName })
    },
    previousStep() {
      this.$router.push('/ftu/seed-type-selection')
    },
  },
  beforeDestroy() {
    if (this.mnemonicsError) {
      this.clearError(this.mnemonicsError.name)
    }
    if (this.seedError) {
      this.clearError(this.seedError.name)
    }
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
  font-size: 16px;
  line-break: auto;
  line-height: 1.5em;
  margin: 32px 0;
  padding: 16px;
  width: 100%;
  margin-top: 40px;
}
.match-error {
  color: $red-0;
}
.paragraph {
  margin-top: 16px;
}
</style>

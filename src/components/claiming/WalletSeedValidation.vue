<template>
  <NavigationCard
    data-test="header-4"
    class="wallet-seed-validation"
    title="Confirm your seed phrase"
    previousText="Back"
    nextText="Confirm and continue"
    :previousStep="previousStep"
    :nextStep="nextStep"
    :disabled="disabled"
    ref="navCard"
  >
    <p class="text">
      Please type your 12 word seed phrase exactly as it was shown to you on the previous screen.
      This step is to confirm that you have copied your seed phrase correctly.
    </p>
    <Input type="big" class="seed" v-model="seed" v-on:go-next="nextStep" />
    <p data-test="mnemonics-error-alert" class="match-error" v-if="mnemonicsError">
      Mnemonics must match
    </p>
    <p class="text last">
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
      disabled: true,
    }
  },
  watch: {
    seed(seed) {
      this.validateForm()
    },
  },
  computed: {
    ...mapState({
      mnemonics: state => state.wallet.mnemonics,
      mnemonicsError: state => {
        return state.wallet.errors.mnemonics
      },
      validatedMnemonics: state => state.wallet.validatedMnemonics,
    }),
  },
  methods: {
    validateForm() {
      this.$store.commit('validateMnemonics', {
        seed: this.seed,
        mnemonics: this.mnemonics,
      })
      if (this.validatedMnemonics) {
        if (this.mnemonicsError) {
          this.clearError(this.mnemonicsError.name)
        }
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    nextStep() {
      if (this.validatedMnemonics) {
        this.$router.push('/claiming/encryption-pass')
      }
    },
    clearError(errorName) {
      this.$store.commit('clearError', { error: errorName })
    },
    previousStep() {
      this.$router.push('/claiming/seed-backup')
    },
  },
  beforeDestroy() {
    if (this.mnemonicsError) {
      this.clearError(this.mnemonicsError.name)
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

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
  padding: 16px;
  width: 100%;
  margin: 16px 0;
}

.match-error {
  font-size: 14px;
  color: $red-0;
  margin-bottom: 8px;
}
.seed {
  font-size: 20px;
  font-family: inherit;
}
.text {
  margin-bottom: 8px;
  &.last {
    margin: 0px;
  }
}
</style>

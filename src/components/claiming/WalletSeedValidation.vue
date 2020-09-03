<template>
  <NavigationCard
    ref="navCard"
    data-test="header-4"
    class="wallet-seed-validation"
    title="Confirm your seed phrase"
    previousText="Back"
    nextText="Confirm and continue"
    :previousStep="previousStep"
    :nextStep="nextStep"
    :disabledNextButton="disabledNextButton"
  >
    <p>
      Please type your 12 word seed phrase exactly as it was shown to you on the
      previous screen. This step is to confirm that you have copied your seed
      phrase correctly.
    </p>
    <Input v-model="seed" type="big" class="seed" @go-next="nextStep" />
    <p
      v-if="mnemonicsError"
      data-test="mnemonics-error-alert"
      class="match-error"
    >
      Mnemonics must match
    </p>
    <p class="text">
      Please ensure you do not add any extra spaces between words or at the
      beginning or end of the phrase.
    </p>
  </NavigationCard>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

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
      disabledNextButton: true,
    }
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
  watch: {
    seed(seed) {
      this.validateForm()
    },
  },
  beforeDestroy() {
    if (this.mnemonicsError) {
      this.clearError(this.mnemonicsError.name)
    }
  },
  methods: {
    ...mapMutations({
      validateMnemonics: 'validateMnemonics',
      clearError: 'clearError',
    }),
    validateForm() {
      this.validateMnemonics({
        seed: this.seed,
        mnemonics: this.mnemonics,
      })

      if (this.validatedMnemonics) {
        if (this.mnemonicsError) {
          this.clearError(this.mnemonicsError.name)
        }
        this.disabledNextButton = false
      } else {
        this.disabledNextButton = true
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
  font-family: inherit;
  font-size: $input_big-font-size;
  line-break: auto;
  line-height: 1.5em;
  margin: 16px 0;
  padding: 16px;
  width: 100%;
}

.match-error {
  color: $red-2;
  font-size: 14px;
  margin-bottom: 8px;
}

.text {
  margin-bottom: 8px;

  &:last-of-type {
    margin: 0;
  }
}
</style>

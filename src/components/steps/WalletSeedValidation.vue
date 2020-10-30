<template>
  <NavigationCard
    ref="navCard"
    data-test="header-4"
    class="wallet-seed-validation"
    title="Confirm your seed phrase"
    previous-text="Back"
    next-text="Confirm and continue"
    :previous-step="previousStep"
    :next-step="nextStep"
    :disabled-next-button="isNextButtonDisabled"
  >
    <p class="text">
      Please type your 12 word <em>seed phrase</em> exactly as shown to you on
      the previous screen. This will ensure that you have noted down your seed
      phrase correctly.
    </p>
    <Input
      v-model="seed"
      type="big"
      class="seed"
      :autoresize="true"
      :maxlength="mnemonics.length"
      @go-next="nextStep"
    />
    <p
      v-if="seed && !areMnemonicsValid"
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
import { mapState, mapMutations } from 'vuex'

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
      isNextButtonDisabled: true,
    }
  },
  computed: {
    ...mapState({
      mnemonics: state => state.wallet.mnemonics,
      areMnemonicsValid: state => state.wallet.areMnemonicsValid,
    }),
  },
  watch: {
    seed(seed) {
      this.validateForm()
    },
  },
  methods: {
    ...mapMutations({
      validateMnemonics: 'validateMnemonics',
    }),
    validateForm() {
      this.validateMnemonics({
        seed: this.seed,
        mnemonics: this.mnemonics,
      })
      if (
        this.areMnemonicsValid &&
        this.seed.trim().length === this.mnemonics.trim().length
      ) {
        this.isNextButtonDisabled = false
      } else {
        this.isNextButtonDisabled = true
      }
    },
    nextStep() {
      this.validateForm()
      if (this.areMnemonicsValid) {
        this.$router.push('/ftu/wallet-description')
      }
    },
    previousStep() {
      this.$router.push('/ftu/seed-backup')
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
  font-size: 16px;
  line-break: auto;
  line-height: 1.5em;
  margin: 24px 0;
  padding: 16px;
  width: 100%;
}

.match-error {
  color: $red-2;
  margin-bottom: 8px;
}

.text {
  margin-bottom: 8px;

  &:last-of-type {
    margin: 0;
  }
}
</style>

<template>
  <NavigationCard
    ref="navCard"
    data-test="header-4"
    class="wallet-seed-validation"
    :title="$t('confirm_seed')"
    :previous-text="$t('back')"
    :next-text="$t('confirm_and_continue')"
    :previous-step="previousStep"
    :next-step="nextStep"
    :disabled-next-button="isNextButtonDisabled"
  >
    <i18n-t class="text" keypath="seed_validation_0_1" tag="p" scope="global">
      <em>{{ $t('seed_validation_0_2') }}</em>
    </i18n-t>
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
      {{ $t('seed_validation_1') }}
    </p>
    <p class="text">
      {{ $t('seed_validation_2') }}
    </p>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import NavigationCard from '@/components/card/NavigationCard.vue'
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
      if (!this.isNextButtonDisabled) {
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
  border: var(--seed-big-border);
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

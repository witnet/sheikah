<template>
  <NavigationCard
    data-test="header-4"
    class="wallet-seed-validation"
    title="Confirm your seed phrase"
    previousText="Back"
    nextText="Next"
    :previousStep="previousStep"
    :nextStep="nextStep"
    :disabledNextButton="disabledNextButton"
    ref="navCard"
  >
    <p class="text">
      Please type your 12 word seed phrase exactly as it was shown to you on the previous screen.
      This step is to confirm that you have copied your seed phrase correctly.
    </p>
    <Input
      type="big"
      class="seed"
      v-model="seed"
      :autoresize="true"
      :maxlength="mnemonics.length"
      v-on:go-next="nextStep"
    />
    <p data-test="mnemonics-error-alert" class="match-error" v-if="mnemonicsError">
      Mnemonics must match
    </p>
    <p class="text">
      Please ensure you do not add any extra spaces between words or at the beginning or end of the
      phrase.
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
          this.clearError({ error: this.mnemonicsError.name })
        }
        this.disabledNextButton = false
      } else {
        this.disabledNextButton = true
      }
    },
    nextStep() {
      this.validateForm()
      if (this.validatedMnemonics) {
        if (this.mnemonicsError) {
          this.clearError({ error: this.mnemonicsError.name })
        }
        this.$router.push('/ftu/encryption-pass')
      }
    },
    previousStep() {
      this.$router.push('/ftu/seed-backup')
    },
  },
  beforeDestroy() {
    if (this.mnemonicsError) {
      this.clearError({ error: this.mnemonicsError.name })
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
  margin: 24px 0px;
  padding: 16px;
  width: 100%;
}
.match-error {
  color: $red-2;
  margin-bottom: 8px;
}
.paragraph {
  margin-top: 16px;
}
</style>

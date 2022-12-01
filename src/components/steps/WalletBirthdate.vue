<template>
  <NavigationCard
    ref="navCard"
    class="wallet-encryption"
    :title="$t('select_wallet_birth_date')"
    :previous-text="$t('back')"
    :next-text="$t('next')"
    :previous-step="previousStep"
    :next-step="nextStep"
  >
    <p class="paragraph">
      {{ $t('wallet_birth_date_text') }}
    </p>
    <div ref="confirm" class="form-row password">
      <el-date-picker
        v-model="birthDate"
        type="date"
        :placeholder="$t('select_creation_date')"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import NavigationCard from '@/components/card/NavigationCard.vue'
import { isValidBirthDate } from '@/services/birthDate'

export default {
  name: 'WalletImport',
  components: {
    NavigationCard,
  },
  data() {
    const currentDate = new Date()
    return {
      birthDate: '',
      showError: '',
      error: '',
      pickerOptions: {
        disabledDate: function (date) {
          return !isValidBirthDate(date, currentDate)
        },
      },
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
  methods: {
    isValidBirthDate,
    ...mapMutations({
      setBirthDate: 'setBirthDate',
      clearError: 'clearError',
    }),
    async nextStep() {
      this.setBirthDate({ result: this.birthDate })
      this.$router.push(`/ftu/wallet-description?import=true`)
    },
    previousStep() {
      this.$router.push('/ftu/import-wallet')
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
  margin-bottom: 16px;
}
</style>

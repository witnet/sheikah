<template>
  <NavigationCard
    data-test="header-3"
    class="wallet-seed-backup"
    title="Wallet seed phrase backup"
    previous-text="Back"
    next-text="Next"
    :previous-step="() => this.$router.push('/ftu/disclaimer')"
    :next-step="() => this.$router.push('/ftu/seed-validation')"
  >
    <p class="paragraph-title"
      >{{ this.$t('wallet_seed_backup[0]') }}
      <em>{{ this.$t('wallet_seed_backup[1]') }}</em
      >. {{ this.$t('wallet_seed_backup[2]') }}</p
    >
    <pre
      data-test="word-seed"
      class="seed"
      :class="{ 'copy-disabled': isCopyMnemonicsDisabled }"
      >{{ seed }}</pre
    >
    <p class="paragraph bold">
      {{ this.$t('wallet_seed_backup[3]') }}
    </p>
    <p class="paragraph">
      {{ this.$t('wallet_seed_backup[4]') }}
    </p>
    <p class="paragraph">
      {{ this.$t('wallet_seed_backup[5]') }}
      -
      <b class="text bold">{{ this.$t('wallet_seed_backup[6]') }}</b>
    </p>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'WalletSeedBackup',
  components: {
    NavigationCard,
  },
  computed: {
    ...mapState({
      seed: state => state.wallet.mnemonics,
    }),
    isCopyMnemonicsDisabled() {
      return process.env.NODE_ENV !== 'development'
    },
  },
  created() {
    this.createMnemonics()
  },
  methods: {
    ...mapMutations({
      clearError: 'clearError',
    }),
    ...mapActions({
      createMnemonics: 'createMnemonics',
    }),
    calculateFirstSentence() {
      return this.seed
        .split(' ')
        .slice(0, 6)
        .join(' ')
    },
    calculateSecondSentence() {
      return this.seed
        .split(' ')
        .slice(6)
        .join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.content {
  padding: 40px;
}

.seed {
  align-items: center;
  border: $input_big-border;
  border-radius: $input_big-border-radius;
  box-sizing: border-box;
  color: $input_big-color;
  font-family: inherit;
  font-size: 22px;
  line-break: auto;
  line-height: 1.5em;
  margin: 24px 0;
  padding: 24px;
  white-space: pre-wrap;
  width: 100%;
}

.seed-text {
  color: $input_big-color;
  width: inherit;
}

.paragraph {
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.bold {
  font-weight: 600;
}

.copy-disabled {
  user-select: none;
}
</style>

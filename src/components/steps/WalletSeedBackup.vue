<template>
  <NavigationCard
    data-test="header-3"
    class="wallet-seed-backup"
    title="Wallet seed phrase backup"
    :previous-text="$t('back')"
    :next-text="$t('next')"
    :previous-step="() => $router.push('/ftu/disclaimer')"
    :next-step="() => $router.push('/ftu/seed-validation')"
  >
    <i18n-t class="paragraph-title" keypath="wallet_seed_backup_0_1" tag="p" scope="global">
      <em>{{ $t('wallet_seed_backup_0_2') }}</em>
    </i18n-t>
    <pre
      data-test="word-seed"
      class="seed"
      :class="{ 'copy-disabled': isCopyMnemonicsDisabled }"
      >{{ seed }}</pre
    >
    <p class="paragraph bold">
      {{ $t('wallet_seed_backup_1') }}
    </p>
    <p class="paragraph">
      {{ $t('wallet_seed_backup_2') }}
    </p>
    <i18n-t class="paragraph" keypath="wallet_seed_backup_3_1" tag="p" scope="global">
      <b class="bold">{{ $t('wallet_seed_backup_3_2') }}</b>
    </i18n-t>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard.vue'

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
      return this.seed.split(' ').slice(0, 6).join(' ')
    },
    calculateSecondSentence() {
      return this.seed.split(' ').slice(6).join(' ')
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
  border: var(--seed-big-border);
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

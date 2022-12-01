<template>
  <div>
    <NavigationCard
      ref="navCard"
      data-test="header-4"
      class="wallet-seed-validation"
      :title="$t('wallet_imported')"
      :previous-text="$t('back')"
      :next-text="$t('next')"
      :previous-step="previousStep"
      :next-step="nextStep"
    >
      <p
        ><strong class="bold">{{ $t('please_note').toUpperCase() }}</strong>
        {{ $t('repeated_wallet_info') }}</p
      >
    </NavigationCard>
  </div>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard.vue'

export default {
  name: 'WalletAlreadyImported',
  components: {
    NavigationCard,
  },
  computed: {
    isImportingMnemonics() {
      return this.$route.query && this.$route.query.import
    },
    isImportingXprv() {
      return this.$route.query && this.$route.query.xprv
    },
    previousRoute() {
      if (this.isImportingMnemonics) {
        return `/ftu/import-wallet`
      } else if (this.isImportingXprv) {
        return `/ftu/import-xprv`
      } else {
        return `/ftu/seed-validation`
      }
    },
  },
  methods: {
    nextStep() {
      if (this.isImportingXprv) {
        this.$router.push(`/ftu/wallet-description?xprv=true`)
      } else {
        this.$router.push(`/ftu/wallet-birthdate`)
      }
    },
    previousStep() {
      this.$store.commit('setRepeatedWallet', { exist: null })
      this.$router.push(this.previousRoute)
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

.bold {
  font-weight: bold;
}
</style>

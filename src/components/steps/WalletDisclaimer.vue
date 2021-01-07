<template>
  <Disclaimer
    data-test="header-2"
    class="wallet-disclaimer"
    :title="$t('hey_listen')"
    :previous-step="previousStep"
    :next-step="nextStep"
    :previous-text="$t('back')"
    :next-text="$t('disclaimer_next')"
  >
    <p class="text bold">{{ $t('wallet_disclaimer[0]') }}</p>
    <p class="text">
      {{ $t('wallet_disclaimer[1]') }}
    </p>
    <p class="text">
      {{ $t('wallet_disclaimer[2]') }}
    </p>
    <p class="text">
      {{ $t('wallet_disclaimer[3]') }}
    </p>
    <p class="text">
      {{ $t('wallet_disclaimer[4]') }}
    </p>
  </Disclaimer>
</template>

<script>
import Disclaimer from '@/components/card/Disclaimer'
import { mapMutations } from 'vuex'

export default {
  name: 'WalletDisclaimer',
  components: {
    Disclaimer,
  },
  methods: {
    ...mapMutations(['setWalletDescription']),
    previousStep() {
      this.setWalletDescription({ title: '', description: '' })
      this.$router.push('/ftu/welcome')
    },
    nextStep() {
      this.$router.push('/ftu/seed-backup')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.text {
  color: var(--text-dark-background);
  margin-bottom: 8px;

  &.bold {
    color: var(--text-dark-background);
    font-weight: bold;
    margin-bottom: 16px;
  }

  &:last-of-type {
    margin: 0;
  }
}
</style>

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
    <p class="text bold">{{ $t('wallet_disclaimer_0') }}</p>
    <p class="text">
      {{ $t('wallet_disclaimer_1') }}
    </p>
    <p class="text">
      {{ $t('wallet_disclaimer_2') }}
    </p>
    <p class="text">
      {{ $t('wallet_disclaimer_3') }}
    </p>
    <p class="text">
      {{ $t('wallet_disclaimer_4') }}
    </p>
  </Disclaimer>
</template>

<script>
import { mapMutations } from 'vuex'
import Disclaimer from '@/components/card/Disclaimer.vue'

export default {
  name: 'WalletDisclaimer',
  components: {
    Disclaimer,
  },
  methods: {
    ...mapMutations(['setWalletDescription', 'setBirthDate']),
    previousStep() {
      this.setWalletDescription({ title: '', description: '' })
      this.setBirthDate({ result: 'current' })
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
  color: var(--disclaimer-text);
  margin-bottom: 8px;

  &.bold {
    color: var(--disclaimer-text);
    font-weight: bold;
    margin-bottom: 16px;
  }

  &:last-of-type {
    margin: 0;
  }
}
</style>

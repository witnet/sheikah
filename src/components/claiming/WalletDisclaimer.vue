<template>
  <Disclaimer
    data-test="header-2"
    class="wallet-disclaimer"
    :title="disclaimers[index].title"
    :previous-step="previousStep"
    :next-step="nextStep"
    previous-text="Back"
    :next-text="disclaimers[index].nextText"
  >
    <p
      v-for="(content, idx) in disclaimers[index].content"
      :key="idx"
      class="text"
    >
      {{ content }}
    </p>
  </Disclaimer>
</template>

<script>
import Disclaimer from '@/components/card/Disclaimer'
import { mapState } from 'vuex'

export default {
  name: 'WalletDisclaimer',
  components: {
    Disclaimer,
  },
  computed: {
    ...mapState({
      disclaimers: state => state.wallet.disclaimers,
    }),
    index() {
      return parseInt(this.$route.params.index)
    },
  },
  methods: {
    previousStep() {
      if (this.index === 0) {
        this.$router.push('/claiming/vesting')
      } else {
        this.$router.push(`/claiming/disclaimer/${this.index - 1}`)
      }
    },
    nextStep() {
      if (this.index === this.disclaimers.length - 1) {
        this.$router.push('/claiming/seed-backup')
      } else {
        this.$router.push(`/claiming/disclaimer/${this.index + 1}`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.text {
  color: $white;
  margin-bottom: 8px;

  &.bold {
    color: $white;
    font-weight: bold;
    margin-bottom: 16px;
  }

  &:last-of-type {
    margin: 0;
  }
}
</style>

<template>
  <Card class="card" title="Default currency" :border="false" shadow="thin">
    <p class="text">Select the default currency</p>
    <Select
      v-model="actualCurrency"
      data-test="select-currency"
      type="big"
      :options="options"
    />
  </Card>
</template>

<script>
import Card from '@/components/card/Card.vue'
import Select from '@/components/Select.vue'
import { WIT_UNIT } from '@/constants'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SettingsOptionCurrenty',
  components: { Card, Select },
  data() {
    return {
      options: Object.values(WIT_UNIT).map(unit => ({
        primaryText: unit,
        value: unit,
      })),
    }
  },
  computed: {
    ...mapState({
      currency: state => state.wallet.currency,
    }),
    actualCurrency: {
      set(val) {
        this.changeDefaultCurrency(val.value)
      },
      get() {
        return { primaryText: this.currency, value: this.currency }
      },
    },
  },
  methods: {
    ...mapMutations({
      changeDefaultCurrency: 'changeDefaultCurrency',
    }),
  },
}
</script>

<style lang="scss" scoped>
.card {
  .text {
    margin: 0 0 16px 0;
  }
}
</style>

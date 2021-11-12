<template>
  <Card class="card" :title="$t('default_unit')" :border="false" shadow="thin">
    <p class="text">{{ $t('select_unit') }}</p>
    <Select
      v-model="actualUnit"
      data-test="select-unit"
      type="big"
      :options="options"
    />
  </Card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Card from '@/components/card/Card.vue'
import Select from '@/components/Select.vue'
import { WIT_UNIT } from '@/constants'

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
      unit: state => state.wallet.unit,
    }),
    actualUnit: {
      set(val) {
        this.changeDefaultUnit(val.value)
      },
      get() {
        return { primaryText: this.unit, value: this.unit }
      },
    },
  },
  methods: {
    ...mapMutations({
      changeDefaultUnit: 'changeDefaultUnit',
    }),
  },
}
</script>

<style lang="scss" scoped>
.card {
  .text {
    margin: 0 0 16px;
  }
}
</style>

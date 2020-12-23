<template>
  <Card class="card" :title="$t('language')" :border="false" shadow="thin">
    <p class="text">{{ this.$t('select_language') }}</p>
    <Select
      v-model="actualLanguage"
      data-test="select-unit"
      type="big"
      :options="options"
    />
  </Card>
</template>

<script>
import Card from '@/components/card/Card.vue'
import Select from '@/components/Select.vue'
import { LANGUAGES } from '@/constants'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SettingsOptionCurrenty',
  components: { Card, Select },
  data() {
    return {
      options: Object.values(LANGUAGES).map(language => ({
        primaryText: language,
        value: language,
      })),
    }
  },
  computed: {
    ...mapState({
      language: state => state.wallet.language,
    }),
    actualLanguage: {
      set(val) {
        this.changeLanguage({ language: val.value, i18n: this.$i18n })
      },
      get() {
        return { primaryText: this.language, value: this.language }
      },
    },
  },
  methods: {
    ...mapMutations({
      changeLanguage: 'changeLanguage',
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

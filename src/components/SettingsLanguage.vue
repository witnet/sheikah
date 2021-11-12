<template>
  <Card class="card" :title="$t('language')" :border="false" shadow="thin">
    <p class="text">{{ $t('select_language') }}</p>
    <Select
      v-model="actualLanguage"
      data-test="select-unit"
      type="big"
      :options="options"
    />
  </Card>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Card from '@/components/card/Card.vue'
import Select from '@/components/Select.vue'
import { LANGUAGES } from '@/constants'

export default {
  name: 'SettingsOptionCurrenty',
  components: { Card, Select },
  data() {
    return {
      options: Object.values(LANGUAGES).map(language => ({
        primaryText: language.name,
        value: language.locale,
      })),
    }
  },
  computed: {
    ...mapGetters({
      language: 'language',
    }),
    actualLanguage: {
      set(val) {
        this.changeLocale({ newLocale: val.value, i18n: this.$i18n })
      },
      get() {
        return { primaryText: this.language.name, value: this.language.locale }
      },
    },
  },
  watch: {
    language(val) {
      this.updateDRLanguage(val)
    },
  },
  methods: {
    ...mapMutations({
      changeLocale: 'changeLocale',
      updateDRLanguage: 'updateDRLanguage',
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

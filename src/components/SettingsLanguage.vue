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

<script setup>
import { useStore } from 'vuex'
import { localStorageWrapper } from '@/main'
import Card from '@/components/card/Card.vue'
import Select from '@/components/Select.vue'
import { LANGUAGES } from '@/constants'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()
const store = useStore()

const options = computed(() =>
  Object.values(LANGUAGES).map(language => ({
    primaryText: language.name,
    value: language.locale,
  })),
)

const actualLanguage = computed({
  get: () => ({
    primaryText: LANGUAGES[locale.value].name,
    value: LANGUAGES[locale.value].locale,
  }),
  set: val => {
    locale.value = val.value
    localStorageWrapper.setLanguageSettings(val.value)
    store.commit('updateDRLanguage', val)
  },
})
</script>

<style lang="scss" scoped>
.card {
  .text {
    margin: 0 0 16px;
  }
}
</style>

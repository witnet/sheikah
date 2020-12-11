<template>
  <div>
    <div v-for="setting in settings" :key="setting">
      <SettingsOptionCurrency
        v-if="setting === SETTINGS.CURRENCY"
        class="setting"
      />
    </div>
  </div>
</template>

<script>
import SettingsOptionCurrency from '@/components/SettingsOptionCurrency'
import { SETTINGS } from '@/constants'

export default {
  name: 'SettingsSection',
  components: { SettingsOptionCurrency },
  props: {
    settings: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      SETTINGS,
    }
  },
}
</script>

<style scoped lang="scss">
.setting {
  margin-bottom: 16px;
}
</style>

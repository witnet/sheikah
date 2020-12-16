<template>
  <div class="content">
    <div v-for="setting in settings" :key="setting">
      <SettingsOptionCurrency
        v-if="setting === SETTINGS.CURRENCY"
        data-test="settings-currency"
        class="setting"
      />
      <ExportXprv
        v-if="setting === SETTINGS.EXPORT_XPRV"
        data-test="settings-xprv"
        class="setting"
      />
      <SettingsNotificationList
        v-if="setting === SETTINGS.NOTIFICATIONS"
        data-test="settings-notifications"
        class="setting"
      />
      <Community
        v-if="setting === SETTINGS.COMMUNITY"
        data-test="settings-community"
        class="setting"
      />
      <SettingsResync
        v-if="setting === SETTINGS.RESYNC"
        data-test="settings-resync"
        class="setting"
      />
    </div>
  </div>
</template>

<script>
import SettingsOptionCurrency from '@/components/SettingsOptionCurrency'
import SettingsNotificationList from '@/components/SettingsNotificationList'
import SettingsResync from '@/components/SettingsResync'
import ExportXprv from '@/components/ExportXprv'
import Community from '@/components/Community'
import { SETTINGS } from '@/constants'

export default {
  name: 'SettingsSection',
  components: {
    SettingsOptionCurrency,
    ExportXprv,
    SettingsResync,
    Community,
    SettingsNotificationList,
  },
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
  margin-left: 70px;
  width: 600px;
}
</style>

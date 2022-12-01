<template>
  <Card
    class="card"
    :title="$t('appearance')"
    :border="false"
    shadow="thin"
    :padding="false"
  >
    <div class="notification-border">
      <p>{{ $t('change_theme') }}</p>
      <SettingsThemeSwitch />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/card/Card.vue'
import SettingsThemeSwitch from '@/components/SettingsThemeSwitch.vue'

export default {
  name: 'SettingsNotificationsList',
  components: { Card, SettingsThemeSwitch },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.notification-border {
  display: flex;
  justify-content: space-between;
  padding: 24px;
}
</style>

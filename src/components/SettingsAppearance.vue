<template>
  <Card
    class="card"
    title="Appearance"
    :border="false"
    shadow="thin"
    :padding="false"
  >
    <div class="notification-border">
      <p>Change Sheikah theme</p>
      <SettingsThemeSwitch />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/card/Card.vue'
import SettingsThemeSwitch from '@/components/SettingsThemeSwitch'

export default {
  name: 'SettingsNotificationsList',
  components: { Card, SettingsThemeSwitch },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.notification-border {
  border-bottom: 1px solid $grey-1;
  display: flex;
  justify-content: space-between;
  padding: 24px;
}
</style>

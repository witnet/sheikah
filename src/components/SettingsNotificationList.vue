<template>
  <Card
    class="card"
    title="Notifications"
    :border="false"
    shadow="thin"
    :padding="false"
  >
    <div
      v-for="notification in notifications"
      :key="notification.key"
      :data-test="notification.key"
      class="notification-border"
    >
      <p :data-test="`title-${notification.key}`">{{ notification.title }}</p>
      <SettingsNotificationSwitch :title="notification.key" />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/card/Card.vue'
import SettingsNotificationSwitch from '@/components/SettingsNotificationSwitch'
import { NOTIFICATIONS } from '@/constants'

export default {
  name: 'SettingsNotificationsList',
  components: { Card, SettingsNotificationSwitch },
  data() {
    return {
      notifications: NOTIFICATIONS,
    }
  },
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

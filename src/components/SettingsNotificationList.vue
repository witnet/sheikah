<template>
  <Card
    class="card"
    :title="$t('notifications')"
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
      <p :data-test="`title-${notification.key}`">{{
        notification.title(locale)
      }}</p>
      <SettingsNotificationSwitch :title="notification.key" />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/card/Card.vue'
import SettingsNotificationSwitch from '@/components/SettingsNotificationSwitch'
import { NOTIFICATIONS } from '@/constants'
import { mapState } from 'vuex'

export default {
  name: 'SettingsNotificationsList',
  components: { Card, SettingsNotificationSwitch },
  data() {
    return {
      notifications: NOTIFICATIONS,
    }
  },
  computed: {
    ...mapState({
      locale: state => state.wallet.locale,
    }),
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.notification-border {
  border-bottom: var(--notification-border);
  display: flex;
  justify-content: space-between;
  padding: 24px;
}
</style>

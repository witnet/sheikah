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
      :key="notification"
      :data-test="notification"
      class="notification-border"
    >
      <p :data-test="`title-${notification}`">{{
        notificationsTitle[notification]
      }}</p>
      <SettingsNotificationSwitch :title="notification" />
    </div>
  </Card>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/card/Card.vue'
import SettingsNotificationSwitch from '@/components/SettingsNotificationSwitch.vue'
import { NOTIFICATIONS } from '@/constants'

export default {
  name: 'SettingsNotificationsList',
  components: { Card, SettingsNotificationSwitch },
  data() {
    return {
      notifications: NOTIFICATIONS,
      notificationsTitle: {
        [NOTIFICATIONS.BLOCK]: this.$t('block_notifications_title'),
        [NOTIFICATIONS.TRANSACTIONS]: this.$t('tx_notifications_title'),
        [NOTIFICATIONS.PAYMENTS]: this.$t('payments_notifications_title'),
        [NOTIFICATIONS.SYNCRONIZATION]: this.$t(
          'syncronization_notifications_title',
        ),
      },
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

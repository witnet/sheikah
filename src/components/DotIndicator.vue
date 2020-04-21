<template>
  <img :class="nodeStatus" :src="url" alt="avatar" />
</template>

<script>
import { WALLET_EVENTS } from '@/constants'

export default {
  name: 'DotIndicator',
  props: {
    status: String,
    url: String,
  },
  computed: {
    nodeStatus() {
      if (this.status === WALLET_EVENTS.BLOCK) {
        return 'status block'
      } else if (this.status === WALLET_EVENTS.MOVEMENT) {
        return 'status movement'
      } else if (this.status === WALLET_EVENTS.SYNC_FINISH) {
        return 'status sync-finished'
      } else if (this.status === WALLET_EVENTS.SYNC_PROGRESS) {
        return 'status sync-progress'
      } else if (this.status === WALLET_EVENTS.SYNC_START) {
        return 'status sync-start'
      } else {
        return 'status syncing'
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.status {
  width: 30px;
  border-radius: 4px;
}
.block {
  border: 2px solid $green-5;
}
.movement {
  border: 2px solid $purple-4;
}
.sync-finished {
  border: 2px solid $green-5;
}
.sync-progress {
  border: 2px solid $yellow-4;
}
.sync-start {
  border: 2px solid $yellow-4;
}
.syncing {
  border: 2px solid $yellow-4;
}
</style>

<template>
  <div class="network-status">
    <div class="header" @click="showAll = !showAll">
      <div class="dot-status">
        <DotIndicator
          data-test="dot-indicator"
          :status="status"
          :url="`https://api.adorable.io/avatars/:${this.walletIdx}/`"
        />
      </div>
      <div class="wallet-info">
        <p data-test="wallet-name" v-if="expanded" class="current-wallet-name">
          Witnet wallet #{{ walletIdx }}
        </p>
        <div class="status-container">
          <div data-test="status" v-if="expanded" :class="nodeStatus">
            {{ standardizedStatus(status) }}
          </div>
          <DotsLoading data-test="loading-spinner" v-if="expanded && loading" class="spinner" />
        </div>
      </div>
      <div v-if="expanded && synced" class="icon">
        <img
          data-test="short-up"
          class="sort"
          v-if="showAll"
          src="@/resources/svg/short-up.svg"
          alt="sort-up"
        />
        <img
          data-test="short-down"
          class="sort"
          v-else
          src="@/resources/svg/short-down.svg"
          alt="sort-down"
        />
      </div>
    </div>
    <transition name="slide">
      <div data-test="detail-info" v-if="showAll && expanded && synced" class="detail-info">
        <p data-test="node" class="text">
          Connected to <span class="bold"> {{ node }} </span>
        </p>
        <p data-test="network" v-show="network" class="text">
          Tracking <span class="bold"> {{ network }} </span> network
        </p>
        <p data-test="last-block" class="text">
          Last block is <span class="bold"> #{{ lastBlock }} </span> ({{ timeAgo }})
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import DotIndicator from '@/components/DotIndicator'
import DotsLoading from '@/components/DotsLoading.vue'
import { WALLET_EVENTS } from '@/constants'
import { timeAgo } from '@/utils'

export default {
  name: 'NetworkStatus',
  props: {
    expanded: Boolean,
    status: String,
    node: String,
    network: String,
    lastBlock: String,
    timestamp: [String, Number],
    walletIdx: [String, Number],
  },
  components: {
    DotIndicator,
    DotsLoading,
  },
  created() {
    setInterval(() => {
      this.timeAgo = timeAgo(this.timestamp)
    }, 1000)
  },
  watch: {
    expanded(expanded) {
      this.showAll = false
    },
  },
  data() {
    return {
      showAll: false,
      timeAgo: null,
      loading: false,
    }
  },
  methods: {
    standardizedStatus(status) {
      if (
        status === WALLET_EVENTS.BLOCK ||
        status === WALLET_EVENTS.SYNC_FINISH ||
        status === WALLET_EVENTS.MOVEMENT
      ) {
        this.loading = false
        return 'SYNCED'
      } else if (status === WALLET_EVENTS.SYNC_PROGRESS || status === WALLET_EVENTS.SYNC_START) {
        this.loading = true
        return 'SYNCING'
      } else {
        this.loading = true
        return 'LOADING'
      }
    },
  },
  computed: {
    synced() {
      return this.status !== 'Unknown'
    },
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
@import '@/styles/theme.scss';
@import '@/styles/app.global.scss';

.network-status {
  display: grid;
  grid-template-rows: minmax(100px, max-content);
  grid-template-columns: 350px;
  .header {
    cursor: pointer;
    display: grid;
    grid-template-columns: 70px minmax(max-content, auto) 40px;
    align-items: center;
    justify-items: center;
    font-size: $icon_status-font_size;
    .wallet-info {
      justify-self: start;
      .current-wallet-name {
        font-weight: bold;
      }
      .status-container {
        display: flex;
        .status {
          font-weight: bold;
          margin-top: 8px;
          &.block {
            color: $green-5;
          }
          &.movement {
            color: $purple-4;
          }
          &.sync-finished {
            color: $green-5;
          }
          &.sync-progress {
            color: $yellow-4;
          }
          &.sync-start {
            color: $yellow-4;
          }
          &.syncing {
            color: $yellow-4;
          }
        }
      }
    }
    .icon {
      .sort {
        width: 12px;
      }
    }
  }

  .detail-info {
    min-width: max-content;
    margin-left: 70px;
    margin-bottom: 20px;
    .text {
      color: $alt-grey-3;
      font-size: 14px;
      margin-bottom: 8px;
      &:last-of-type {
        margin-bottom: 0px;
      }
      .bold {
        font-weight: bold;
        color: $alt-grey-6;
      }
    }
  }
  .slide-enter-active {
    -webkit-transition-duration: 0.1s;
    transition-duration: 0.1s;
    -webkit-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
  }

  .slide-leave-active {
    -webkit-transition-duration: 0.1s;
    transition-duration: 0.1s;
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }

  .slide-enter-to,
  .slide-leave {
    max-height: 100px;
    overflow: hidden;
  }

  .slide-enter,
  .slide-leave-to {
    overflow: hidden;
    max-height: 0;
  }
}
</style>

<docs>
### Example

```jsx
  <NetworkStatus
    :expanded="true"
    status="Block"
    node="node"
    lastBlock="last-block"
    :walletIdx="1"
  />
```
```jsx
  <NetworkStatus
    :expanded="true"
    status="Unknown"
    :walletIdx="1"
  />
```
```jsx
  <NetworkStatus
    :expanded="true"
    status="SyncProgress"
    node="node"
    lastBlock="last-block"
    :walletIdx="1"
  />
```
</docs>

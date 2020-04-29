<template>
  <div class="network-status" :class="{ expanded }">
    <div class="header" :class="{ expanded }" @click="showAll = !showAll">
      <div class="dot-status">
        <DotIndicator
          data-test="dot-indicator"
          :synced="synced"
          :url="`https://api.adorable.io/avatars/:${this.walletIdx}/`"
        />
      </div>
      <div class="wallet-info">
        <p data-test="wallet-name" v-if="expanded" class="current-wallet-name">
          Witnet wallet #{{ walletIdx }}
        </p>
        <div class="status-container">
          <div data-test="status" v-if="expanded" :class="['status', synced ? 'synced' : 'syncing']">
            {{ synced ? 'SYNCED' : `SYNCING (${progress}%)` }}
          </div>
          <DotsLoading data-test="loading-spinner" v-if="expanded && !synced" class="spinner" />
        </div>
      </div>
      <div v-if="expanded" class="icon">
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
      <div data-test="detail-info" v-if="showAll && expanded" class="detail-info">
        <p data-test="node" class="text">
          Connected to <span class="bold"> {{ address }} </span>
        </p>
        <p data-test="network" class="text">
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
import { timeAgo } from '@/utils'

export default {
  name: 'NetworkStatus',
  props: {
    expanded: Boolean,
    status: {
      synced: Boolean,
      timestamp: Date,
    },
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
  computed: {
    address() {
      return this.status.node && this.status.node.address
    },
    lastBlock() {
      return this.status.node && this.status.node.last_beacon.checkpoint
    },
    network() {
      return this.status.node && this.status.node.network
    },
    progress() {
      return this.status.progress
    },
    synced() {
      return this.status.synced
    },
    timestamp() {
      return this.status.timestamp
    },
  },
  data() {
    return {
      showAll: false,
      timeAgo: null,
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/app.global.scss';

.network-status {
  display: grid;
  grid-template-rows: minmax(100px, max-content);
  .header {
    cursor: pointer;
    display: grid;
    grid-template-columns: 70px;
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
          &.synced {
            color: $green-5;
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
.network-status {
  &.expanded {
    grid-template-columns: 350px;
  }
}
.header {
  &.expanded {
    grid-template-columns: 70px minmax(max-content, auto) 40px;
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

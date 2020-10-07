/* eslint-disable vue/require-prop-types */
<template>
  <div class="network-status">
    <div class="header" @click="showAll = !showAll">
      <div class="dot-status">
        <DotIndicator
          data-test="dot-indicator"
          :synced="synced"
          :url="`https://api.adorable.io/avatars/:${walletIdx}/`"
        />
      </div>
      <div class="wallet-info">
        <p data-test="wallet-name" class="current-wallet-name">
          Witnet wallet #{{ walletIdx }}
        </p>
        <div class="status-container">
          <div
            data-test="status"
            :class="['status', synced ? 'synced' : 'syncing']"
          >
            {{ synced ? 'SYNCED' : `SYNCING (${progress}%)` }}
          </div>
          <DotsLoading
            v-if="!synced"
            data-test="loading-spinner"
            class="spinner"
          />
        </div>
      </div>
      <div class="icon">
        <img
          v-if="showAll"
          data-test="short-up"
          class="sort"
          src="@/resources/svg/short-up.svg"
          alt="sort-up"
        />
        <img
          v-else
          data-test="short-down"
          class="sort"
          src="@/resources/svg/short-down.svg"
          alt="sort-down"
        />
      </div>
    </div>
    <transition name="slide">
      <div
        v-if="showAll && expanded"
        data-test="detail-info"
        class="detail-info"
      >
        <p data-test="node" class="text">
          Connected to <span class="bold">{{ address }}</span>
        </p>
        <p v-if="network" data-test="network" class="text">
          Tracking <span class="bold">{{ network }}</span> network
        </p>
        <p data-test="last-block" class="text">
          Last block is <span class="bold">#{{ lastBlock }}</span>
          <span v-if="timeAgo !== 0"> ({{ calculateTimeAgo(timeAgo) }})</span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import DotIndicator from '@/components/DotIndicator'
import DotsLoading from '@/components/DotsLoading.vue'
import { calculateTimeAgo } from '@/utils'

export default {
  name: 'NetworkStatus',
  components: {
    DotIndicator,
    DotsLoading,
  },
  props: {
    expanded: Boolean,
    // eslint-disable-next-line
    status: {
      synced: Boolean,
      timestamp: Date,
    },
    walletIdx: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      showAll: false,
      timeAgo: this.status ? this.status.timestamp : null,
    }
  },
  computed: {
    ...mapGetters(['network']),
    address() {
      return this.status.node && this.status.node.address
    },
    lastBlock() {
      return this.status.node && this.status.node.last_beacon.checkpoint
    },
    progress() {
      return this.status && this.status.progress
    },
    synced() {
      return this.status && this.status.synced
    },
    timestamp() {
      return this.status && this.status.timestamp
    },
  },
  watch: {
    status(status) {
      if (status) {
        this.timeAgo = this.status.timestamp
      }
    },
    expanded(expanded) {
      this.showAll = false
    },
  },
  methods: {
    calculateTimeAgo,
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/app.global.scss';

.network-status {
  display: grid;
  grid-template-columns: 400px;
  grid-template-rows: minmax(100px, max-content);

  .header {
    align-items: center;
    cursor: pointer;
    display: grid;
    font-size: $icon_status-font_size;
    grid-template-columns: 70px minmax(max-content, auto) 40px;
    justify-items: center;

    .wallet-info {
      justify-self: start;

      .current-wallet-name {
        font-weight: bold;
      }

      .status-container {
        display: flex;
        margin-top: 8px;

        .status {
          font-weight: bold;
          margin-right: 8px;

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
    margin-bottom: 20px;
    margin-left: 70px;
    min-width: max-content;

    .text {
      color: $alt-grey-3;
      font-size: 14px;
      margin-bottom: 8px;

      &:last-of-type {
        margin-bottom: 0;
      }

      .bold {
        color: $alt-grey-6;
        font-weight: bold;
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
    max-height: 0;
    overflow: hidden;
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

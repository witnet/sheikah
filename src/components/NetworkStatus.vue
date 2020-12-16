<template>
  <div class="network-status">
    <div class="header" @click="showAll = !showAll">
      <Avatar
        data-test="status-avatar"
        :border-color="currentState.color"
        :src="unlockedWallet.image"
      />
      <div class="wallet-info">
        <p data-test="wallet-name" class="current-wallet-name">
          {{ unlockedWallet.name }}
        </p>
        <div class="status-container">
          <div class="progress">
            <div data-test="status" :class="['status', currentState.color]">
              {{ currentState.label }}
            </div>

            <DotsLoading
              v-if="isLoadingVisible"
              data-test="loading-spinner"
              class="spinner"
            />
          </div>
          <p v-if="isSyncing" data-test="time-left" class="estimation">
            ETA&nbsp;
            <span
              v-if="estimatedTimeOfSync && estimatedTimeOfSync !== '00:00:00'"
              class=""
              >{{ estimatedTimeOfSync }}</span
            >
            <DotsLoading v-else data-test="loading-spinner" class="spinner" />
          </p>
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
        <el-button
          v-if="isResyncButtonVisible"
          type="primary"
          size="mini"
          class="resync"
          @click="$store.commit('showResyncConfirmation')"
        >
          <font-awesome-icon class="icon" icon="sync-alt" />
          Resync
        </el-button>

        <p v-if="isSyncing" data-test="last-block" class="text">
          <span class="bold">{{ lastBlock - lastSync }}</span> blocks left
        </p>
        <p v-if="isSyncing" data-test="last-block" class="text">
          Block <span class="bold">#{{ lastSync }}</span> of
          <span class="bold">#{{ lastBlock }}</span>
        </p>
        <p v-if="isSynced" data-test="node" class="text">
          Connected to <span class="bold">{{ address }}</span>
        </p>
        <p v-else data-test="node" class="text">
          Trying to connect to <span class="bold">{{ address }}</span>
        </p>
        <p v-if="network" data-test="network" class="text">
          Tracking <span class="bold">{{ network }}</span> network
        </p>
        <p v-if="isSynced" data-test="last-block" class="text">
          Last block <span class="bold">#{{ lastSync }}</span>
          <span v-if="timeAgo && timeAgo !== 0">
            ({{ calculateTimeAgo(timeAgo) }})</span
          >
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Avatar from '@/components/Avatar'
import DotsLoading from '@/components/DotsLoading.vue'
import { calculateTimeAgo } from '@/utils'
import { NETWORK_STATUS } from '@/constants'

export default {
  name: 'NetworkStatus',
  components: {
    Avatar,
    DotsLoading,
  },
  props: {
    expanded: Boolean,
  },
  data() {
    return {
      showAll: false,
      timeAgo: this.status ? this.lastBlockTimestamp : null,
    }
  },
  computed: {
    ...mapGetters(['network', 'unlockedWallet', 'estimatedTimeOfSync']),
    ...mapState({
      status: state => state.wallet.status,
      syncingError: state => state.wallet.status.syncError,
      address: state => state.wallet.status.address,
      lastBlock: state => state.wallet.status.lastBlock,
      lastSync: state => state.wallet.status.lastSync,
      progress: state => state.wallet.status.progress,
      lastBlockTimestamp: state => state.wallet.status.lastBlockTimestamp,
      isNodeSynced: state => state.wallet.status.isNodeSynced,
    }),
    currentState() {
      if (this.status.currentState === NETWORK_STATUS.NODE_DISCONNECTED) {
        return {
          label: NETWORK_STATUS.NODE_DISCONNECTED,
          color: 'red',
        }
      } else if (this.status.currentState === NETWORK_STATUS.SYNC_ERROR) {
        return {
          label: NETWORK_STATUS.SYNC_ERROR,
          color: 'red',
        }
      } else if (this.status.currentState === NETWORK_STATUS.SYNCED) {
        return {
          label: NETWORK_STATUS.SYNCED,
          color: 'green',
        }
      } else if (this.status.currentState === NETWORK_STATUS.SYNCING) {
        return {
          label: `${NETWORK_STATUS.SYNCING} ${this.progress.toFixed(2)}%`,
          color: 'yellow',
        }
      } else {
        return {
          label: NETWORK_STATUS.WAITING_FOR_NODE_TO_SYNC,
          color: 'yellow',
        }
      }
    },
    isLoadingVisible() {
      return (
        this.status.currentState === NETWORK_STATUS.SYNCING ||
        this.status.currentState === NETWORK_STATUS.WAITING_FOR_NODE_TO_SYNC
      )
    },
    isResyncButtonVisible() {
      return (
        this.status.currentState === NETWORK_STATUS.SYNCED ||
        (this.status.currentState === NETWORK_STATUS.SYNC_ERROR &&
          this.isNodeSynced)
      )
    },
    isSyncing() {
      return this.status.currentState === NETWORK_STATUS.SYNCING
    },
    isSynced() {
      return this.status.currentState === NETWORK_STATUS.SYNCED
    },
  },
  watch: {
    status(val) {
      if (val) {
        this.timeAgo = val.lastBlockTimestamp
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
        flex-direction: column;
        margin-top: 8px;

        .progress {
          display: flex;

          .status {
            font-weight: bold;
            margin-right: 8px;

            &.green {
              color: $green-5;
            }

            &.yellow {
              color: $yellow-4;
            }

            &.red {
              color: $red-3;
            }
          }
        }

        .estimation {
          color: $yellow-4;
          display: flex;
          font-size: 12px;
          font-weight: bold;
        }
      }

      .icon {
        .sort {
          width: 12px;
        }
      }
    }
  }

  .detail-info {
    margin-bottom: 20px;
    margin-left: 70px;
    min-width: max-content;

    .resync {
      margin-bottom: 10px;
      width: min-content;

      .icon {
        font-size: 14px;
      }
    }

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
  />
```
```jsx
  <NetworkStatus
    :expanded="true"
    status="Unknown"
  />
```
```jsx
  <NetworkStatus
    :expanded="true"
    status="SyncProgress"
    node="node"
    lastBlock="last-block"
  />
```
</docs>

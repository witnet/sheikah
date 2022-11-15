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
        <CustomIcon
          v-if="showAll"
          data-test="short-up"
          class-name="sort"
          name="up"
        />
        <CustomIcon
          v-else
          data-test="short-down"
          class-name="sort"
          name="down"
        />
      </div>
    </div>

    <transition name="slide">
      <div
        v-if="showAll && expanded"
        data-test="detail-info"
        class="detail-info"
      >
        <p
          v-if="walletDescription"
          class="text description bold"
          @click="$store.commit('showDescriptionModal')"
        >
          {{ cropString(walletDescription, 100) }}
        </p>

        <el-button
          v-if="isResyncButtonVisible"
          type="primary"
          size="mini"
          class="resync"
          @click="$store.commit('showResyncConfirmation')"
        >
          <font-awesome-icon class="icon" icon="sync-alt" />
          {{ $t('resync') }}
        </el-button>

        <p v-if="isSyncing" data-test="last-block" class="text">
          <span class="bold">{{ lastBlock - lastSync }}</span>
          {{ $t('blocks_left') }}
        </p>
        <p v-if="isSyncing" data-test="last-block" class="text">
          {{ $t('block') }} <span class="bold">#{{ lastSync }}</span>
          {{ $t('of') }}
          <span class="bold">#{{ lastBlock }}</span>
        </p>
        <p v-if="address && !isNodeDisconnected" data-test="node" class="text">
          {{ $t('connected_to') }} <span class="bold">{{ address }}</span>
        </p>
        <p v-else data-test="node" class="text">
          {{ $t('trying_to_connect') }}
          <span class="bold">{{ address }}</span>
        </p>
        <i18n-t
          v-if="network"
          keypath="tracking_network"
          tag="p"
          data-test="network"
          class="text"
        >
          <span class="bold">{{ network }}</span>
        </i18n-t>
        <p v-if="isSynced" data-test="last-block" class="text">
          {{ $t('last_block') }} <span class="bold">#{{ lastSync }}</span>
          <span v-if="timeAgo && timeAgo !== 0">
            ({{ calculateTimeAgo(timeAgo, locale) }})</span
          >
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Avatar from '@/components/Avatar.vue'
import DotsLoading from '@/components/DotsLoading.vue'
import CustomIcon from '@/components/CustomIcon.vue'
import { calculateTimeAgo, cropString } from '@/utils'
import { NETWORK_STATUS } from '@/constants'

export default {
  name: 'NetworkStatus',
  components: {
    Avatar,
    DotsLoading,
    CustomIcon,
  },
  props: {
    expanded: Boolean,
  },
  data() {
    return {
      showAll: false,
      timeAgo: this.status ? this.lastBlockTimestamp : null,
      isWalletDescriptionVisible: false,
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
      locale: state => state.wallet.locale,
      walletDescription: state => {
        return state.wallet.description
      },
    }),
    currentState() {
      if (this.status.currentState === NETWORK_STATUS.NODE_DISCONNECTED) {
        return {
          label: this.$t('node_disconnected'),
          color: 'red',
        }
      } else if (this.status.currentState === NETWORK_STATUS.SYNC_ERROR) {
        return {
          label: this.$t('sync_error'),
          color: 'red',
        }
      } else if (this.status.currentState === NETWORK_STATUS.SYNCED) {
        return {
          label: this.$t('synced'),
          color: 'green',
        }
      } else if (this.status.currentState === NETWORK_STATUS.SYNCING) {
        return {
          label: `${this.$t('syncing')} ${this.progress.toFixed(2)}%`,
          color: 'yellow',
        }
      } else {
        return {
          label: this.$t('waiting_for_node_to_sync'),
          color: 'yellow',
        }
      }
    },
    isNodeDisconnected() {
      return this.status.currentState === NETWORK_STATUS.NODE_DISCONNECTED
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
    cropString,
    showDescription() {
      this.isWalletDescriptionVisible = true
    },
    closeDescriptionModal() {
      this.isWalletDescriptionVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
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
              color: var(--network-status-label-synced);
            }

            &.yellow {
              color: var(--network-status-label-syncing);
            }

            &.red {
              color: var(--network-status-label-error);
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

    .description {
      max-width: 300px;
      overflow-wrap: break-word;

      &:hover {
        cursor: pointer;
      }
    }

    .text {
      color: var(--text-medium-emphasis);
      font-size: 14px;
      margin-bottom: 8px;

      &:last-of-type {
        margin-bottom: 0;
      }

      .bold {
        color: var(--text-high-emphasis);
        font-weight: bold;
      }
    }

    .bold {
      color: var(--text-high-emphasis);
      font-weight: bold;
    }
  }

  .slide-enter-active {
    transition-duration: 0.1s;
    transition-timing-function: ease-in;
  }

  .slide-leave-active {
    transition-duration: 0.1s;
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

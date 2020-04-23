<template>
  <div class="network-status" :class="{ expanded }">
    <div class="header" :class="{ expanded }" @click="showAll = !showAll">
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
import { timeAgo } from '../utils'

export default {
  name: 'NetworkStatus',
  props: {
    expanded: Boolean,
    status: String,
    node: String,
    network: String,
    lastBlock: String,
    walletIdx: [String, Number],
  },
  components: {
    DotIndicator,
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
    }
  },
  computed: {
    nodeStatus() {
      if (this.status === 'synced') {
        return 'status synced'
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
      .status {
        font-weight: bold;
        margin-top: 8px;
        &.synced {
          color: $green-5;
        }
        &.error {
          color: $red-5;
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
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.1s ease;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateY(-4%);
    transition: all 50ms ease-in 0s;
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

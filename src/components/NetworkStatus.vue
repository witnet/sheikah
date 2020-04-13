<template>
  <div class="network-status">
    <div class="header" @click="showAll = !showAll">
      <div class="dot-status">
        <DotIndicator :status="status" url="https://api.adorable.io/avatars/1/" />
      </div>
      <div class="wallet-info">
        <p v-if="expanded" class="current-wallet-name">
          Witnet wallet #Inx
        </p>
        <div v-if="expanded" :class="nodeStatus">{{ status.toUpperCase() }}</div>
      </div>
      <div v-if="expanded" class="icon">
        <img class="sort" v-if="showAll" src="@/resources/svg/short-up.svg" alt="sort-up" />
        <img class="sort" v-else src="@/resources/svg/short-down.svg" alt="sort-down" />
      </div>
    </div>
    <transition name="slide">
      <div v-if="showAll && expanded" class="detail-info">
        <p class="text">
          Connected to <span class="bold"> {{ node }} </span>
        </p>
        <p class="text">
          Tracking <span class="bold"> {{ network }} </span> network
        </p>
        <p class="text">
          Last block is <span class="bold"> {{ lastBlock }} </span> (less than a 1m ago)
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import DotIndicator from '@/components/DotIndicator'
export default {
  name: 'NetworkStatus',
  props: {
    expanded: Boolean,
    status: String,
    windowWidth: Number,
    node: String,
    network: String,
    lastBlock: String,
  },
  watch: {
    expanded(expanded) {
      this.showAll = false
    },
  },
  data() {
    return {
      showAll: false,
    }
  },
  computed: {
    nodeStatus() {
      if (this.status === 'synced') {
        return 'status synced'
      } else {
        return 'status error'
      }
    },
  },
  components: {
    DotIndicator,
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
</style>

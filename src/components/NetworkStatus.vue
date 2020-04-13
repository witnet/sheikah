<template>
  <div class="network-status">
    <div class="header">
      <div class="dot-status">
        <DotIndicator :status="status" url="https://api.adorable.io/avatars/1/" />
      </div>
      <div class="wallet-info">
        <p v-if="hover" class="current-wallet-name">
          Witnet wallet #Inx
        </p>
        <div v-if="hover" :class="setStatus(status)">{{ status.toUpperCase() }}</div>
      </div>
      <div v-if="hover" class="icon">
        <img
          class="sort"
          v-if="showAll"
          src="@/resources/svg/short-up.svg"
          @click="showAll = false"
          alt="sort-up"
        />
        <img class="sort" v-else src="@/resources/svg/short-down.svg" @click="showAll = true" alt="sort-down" />
      </div>
    </div>
    <div v-if="showAll && hover" class="detail-info">
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
  </div>
</template>

<script>
import DotIndicator from '@/components/DotIndicator'
export default {
  name: 'NetworkStatus',
  props: {
    hover: Boolean,
    status: String,
    windowWidth: Number,
    node: String,
    network: String,
    lastBlock: String,
  },
  watch: {
    hover(hover) {
      this.showAll = false
    },
  },
  data() {
    return {
      showAll: false,
    }
  },
  components: {
    DotIndicator,
  },
  methods: {
    setStatus(status) {
      if (status === 'synced') {
        return 'status synced'
      } else {
        return 'status error'
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/app.global.scss';

.network-status {
  .header {
    font-size: $icon_status-font_size;
    display: flex;
    align-items: center;
    .dot-status {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      margin: 8px 0px;
    }
    .wallet-info {
      min-width: 250px;
      .current-wallet-name {
        font-weight: bold;
        min-width: max-content;
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
      margin-right: 16px;
      height: 100%;
      width: 20px;
      cursor: pointer;
      .sort {
        width: 12px;
      }
    }
  }

  .detail-info {
    padding: 24px 24px 0px 70px;
    min-width: max-content;

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
}
</style>

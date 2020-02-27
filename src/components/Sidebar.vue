<template>
  <div
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="[hover ? 'sidebar' : 'sidebar collapsed-sidebar']"
  >
    <div :class="[hover ? 'brand' : 'brand collapsed-brand']">
      <router-link data-test="logo-to-home" class="logo" to="/wallet/transactions">
        <img v-if="hover" class="sheikah-img" src="@/resources/svg/sheikah.svg" />
        <img v-else class="sheikah-img" src="@/resources/svg/sheikah-small.svg" />
      </router-link>
    </div>
    <div class="current-wallet">
      <span
        :class="[
          hover ? 'current-wallet-name' : 'current-wallet-name collapsed-current-wallet-name',
        ]"
      >
        My Wallet
      </span>
    </div>
    <div class="link-list">
      <router-link data-test="to-transactions" class="link" to="/wallet/transactions">
        <font-awesome-icon class="icon" icon="wallet" />
        <span :class="[hover ? 'label' : 'label collapsed-label']">Wallet</span>
      </router-link>

      <router-link data-test="to-templates" class="link" to="/request/templates">
        <font-awesome-icon class="icon" icon="code" />
        <span :class="[hover ? 'label' : 'label collapsed-label']">Data request</span>
      </router-link>

      <router-link data-test="to-marketplace" class="link" to="/marketplace">
        <font-awesome-icon class="icon" icon="shopping-bag" />
        <span :class="[hover ? 'label' : 'label collapsed-label']">Marketplace</span>
      </router-link>

      <router-link data-test="to-community" class="link" to="/community">
        <font-awesome-icon class="icon" icon="users" />
        <span :class="[hover ? 'label' : 'label collapsed-label']">Community</span>
      </router-link>
    </div>
    <div :class="[hover ? 'settings' : 'settings collapsed-settings']">
      <Settings :settings="settings" color="dark" />
      <NetworkStatus :hover="hover" :status="status" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import NetworkStatus from '@/components/NetworkStatus.vue'
import Settings from '@/components/Settings.vue'

export default {
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  data() {
    return {
      hover: false,
      windowWidth: window.innerWidth,
      settings: [
        {
          label: 'Close session',
          action: () => {
            this.$store.dispatch('closeSession')
          },
        },
        {
          label: 'Quit app',
          action: () => window.close(),
        },
      ],
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
  components: {
    NetworkStatus,
    Settings,
  },
  computed: {
    ...mapState({
      status: state => state.wallet.networkStatus,
    }),
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/app.global.scss';

.sidebar {
  width: 20vw;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  flex-flow: column nowrap;
  height: 100vh;
  z-index: 5;
  font-family: 'Titillium Web';
}

.brand {
  padding: 24px;
  text-align: left;

  .logo {
    width: 100%;
  }

  .name {
    color: $sidebar-name-color;
    font-size: $sidebar-name-font_size;
    font-weight: 800;
  }

  .label {
    color: $sidebar-label-color;
    font-size: $sidebar-label-font_size;
    font-weight: bold;
  }
}

.current-wallet {
  background: $blue-6;
  color: $sidebar-current_wallet-color;
  display: flex;
  flex-flow: row wrap;
  font-weight: bold;
  padding: 24px;

  .current-wallet-name {
    text-overflow: ellipsis;
  }
}

.link-list {
  align-items: flex-start;
  display: flex;
  flex-flow: column nowrap;
  margin-top: 16px;
  width: 100%;

  .link {
    align-items: center;
    border-left: $sidebar-inactive-border;
    color: $sidebar-link-color;
    display: flex;
    flex-flow: row nowrap;
    font-size: $sidebar-link-font_size;
    font-weight: $sidebar-link-font_weight;
    padding: 25px 8px;
    text-decoration: none;
    width: 100%;
    text-align: left;
    &:hover {
      background-color: $blue-1;
      border-left: $sidebar-inactive-border-hover;
    }

    &.router-link-active {
      border-left: $sidebar-active-border;
      color: $sidebar-active-color;
    }

    .icon {
      margin-right: 24px;
      margin-left: 24px;
      width: 20px;
    }

    .label {
      width: 100%;
    }
  }

  .active {
    border-left: $sidebar-active-border;
    color: $sidebar-active-color;
    -webkit-transition: all 1s ease-in ease-out;
    -moz-transition: all 1s ease-in ease-out;
    -o-transition: all 1s ease-in ease-out;
    transition: all 1s ease-in ease-out;
  }
}

.settings {
  align-items: center;
  border-top: $sidebar-settings-border;
  display: flex;
  flex-flow: row nowrap;
  font-size: $icon-settings-font_size;
  justify-content: space-between;
  margin-top: auto;
  padding: 16px;

  .net-status {
    font-size: $icon_status-font_size;
    display: flex;
    align-items: center;

    .dot {
      height: 10px;
      width: 10px;
      background-color: $yellow;
      border-radius: 50%;
      display: inline-block;
    }

    .mainnet {
      color: $sidebar-mainnet-color;
      font-weight: $sidebar-mainnet-font_weight;
    }

    .synced {
      color: $sidebar-synced-color;
      font-weight: $sidebar-synced-font_weight;
      padding: 0.5em;
    }
  }
}

.collapsed-sidebar {
  transition: 200ms;
  height: 100vh;
  width: 90px;
}

.collapsed-brand {
  text-align: center;
}

.collapsed-label {
  display: none;
}

.collapsed-current-wallet-name {
  transform: translateX(-5px);
}

.collapsed-settings {
  justify-content: space-between;
  .mainnet,
  .synced {
    display: none;
  }
}
@media screen and (max-width: 1200px) {
  .sidebar {
    width: 90px;
  }

  .brand {
    text-align: center;
  }

  .label {
    display: none;
  }

  .current-wallet-name {
    transform: translateX(-5px);
  }

  .settings {
    justify-content: space-between;
    .mainnet,
    .synced {
      display: none;
    }
  }
}
</style>

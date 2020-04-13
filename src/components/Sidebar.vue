<template>
  <div
    @mouseover="expanded = true"
    @mouseleave="expanded = false"
    :class="['sidebar', expanded ? 'expanded' : 'collapsed-sidebar']"
  >
    <router-link
      data-test="logo-to-main"
      :class="['brand', expanded ? 'expanded' : 'collapsed-brand']"
      to="/wallet/transactions"
    >
      <img class="sheikah-logo" src="@/resources/svg/sheikah-small.svg" />
      <img v-if="expanded" class="sheikah-name" src="@/resources/svg/sheikah.svg" />
    </router-link>
    <div class="current-wallet">
      <NetworkStatus
        :windowWidth="windowWidth"
        :expanded="expanded"
        :status="status"
        :node="node"
        :network="network"
        :lastBlock="block"
      />
    </div>
    <div class="link-list">
      <router-link data-test="to-transactions" class="link" to="/wallet/transactions">
        <font-awesome-icon class="icon" icon="wallet" />
        <span v-show="expanded" class="label">Transactions</span>
      </router-link>

      <router-link data-test="to-templates" class="link" to="/request/templates">
        <font-awesome-icon class="icon" icon="code" />
        <span v-show="expanded" class="label">Data request</span>
      </router-link>

      <router-link data-test="to-marketplace" class="link" to="/marketplace">
        <font-awesome-icon class="icon" icon="shopping-bag" />
        <span v-show="expanded" class="label">Marketplace</span>
      </router-link>

      <router-link data-test="to-community" class="link" to="/community">
        <font-awesome-icon class="icon" icon="users" />
        <span v-show="expanded" class="label">Community</span>
      </router-link>
    </div>
    <div
      :class="['settings', expanded ? 'expanded' : 'collapsed-settings']"
      @click="closeSession()"
    >
      <div class="icon-container">
        <img class="exit-icon" src="@/resources/svg/exit-icon.svg" alt="exit-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NetworkStatus from '@/components/NetworkStatus.vue'

export default {
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  data() {
    return {
      expanded: false,
      windowWidth: window.innerWidth,
      node: '127.0.0.1:21338',
      network: 'T8',
      block: ' #9633',
      settings: [
        {
          label: 'Close session',
          action: () => {
            this.closeSession()
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
    ...mapActions({
      closeSession: 'closeSession',
    }),
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
  components: {
    NetworkStatus,
  },
  computed: {
    ...mapState({
      status: state => state.wallet.networkStatus,
      walletInfos: state => state.wallet.walletInfos,
    }),
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/app.global.scss';

.sidebar {
  display: grid;
  background-color: $white;
  grid-template-rows: 70px max-content auto 70px;
  transition: 300ms;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  z-index: 5;
  height: 100vh;
  font-family: 'Roboto';
}
.expanded {
  width: 100%;
  transition: width 0.2s ease;
  transition: all 100ms ease-in 0s;
}
.brand {
  width: 100%;
  display: grid;
  grid-template-columns: 70px auto;
  align-items: center;
  justify-items: center;

  .sheikah-name {
    margin-left: 8px;
    justify-self: start;
  }
}

.current-wallet {
  align-self: stretch;
  border-top: $sidebar-settings-border;
  border-bottom: $sidebar-settings-border;
}

.link-list {
  display: grid;
  grid-template-rows: 70px 70px 70px 70px;
  align-self: start;

  .link {
    text-align: left;
    padding: 24px 0px;
    border-left: $sidebar-inactive-border;
    color: $sidebar-link-color;
    font-size: $sidebar-link-font_size;
    font-weight: $sidebar-link-font_weight;
    text-decoration: none;

    &:hover {
      background-color: $alpha-purple;
      border-left: $sidebar-inactive-border-hover;
    }
    &.router-link-active {
      border-left: $sidebar-active-border;
      background-color: $alpha-purple;
    }
    .icon {
      width: 66px;
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
  border-top: $sidebar-settings-border;
  font-size: $icon-settings-font_size;
  display: grid;
  grid-template-columns: 70px auto;
  justify-items: center;
  align-items: center;

  .icon-container {
    .exit-icon {
      cursor: pointer;
      width: 20px;
    }
  }
}

.collapsed-sidebar {
  width: 70px;
  grid-template-columns: 70px;
}
.collapsed-settings {
  width: 70px;
}
.collapsed-brand {
  width: 70px;
}
</style>

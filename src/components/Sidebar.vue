<template>
  <div
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="[hover ? 'sidebar' : 'sidebar collapsed-sidebar']"
  >
    <div :class="[hover ? 'brand' : 'brand collapsed-brand']">
      <router-link data-test="logo-to-home" class="logo" to="/wallet/transactions">
        <div class="logo-container">
          <img class="sheikah-logo" src="@/resources/svg/sheikah-small.svg" />
        </div>
        <img v-if="hover" class="sheikah-name" src="@/resources/svg/sheikah.svg" />
      </router-link>
    </div>
    <div class="current-wallet">
      <NetworkStatus
        :windowWidth="windowWidth"
        :hover="hover"
        :status="status"
        :node="node"
        :network="network"
        :lastBlock="block"
      />
    </div>
    <div class="link-list">
      <router-link data-test="to-transactions" class="link" to="/wallet/transactions">
        <font-awesome-icon class="icon" icon="wallet" />
        <span :class="[hover ? 'label' : 'label collapsed-label']">Transactions</span>
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
    <div :class="[hover ? 'settings' : 'settings collapsed-settings']" @click="closeSession()">
      <div class="icon-container">
        <img class="exit-icon" src="@/resources/svg/exit-icon.svg" alt="exit-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NetworkStatus from '@/components/NetworkStatus.vue'

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
      node: '127.0.0.1:21338',
      block: '#9633',
      network: 'T8',
    }
  },
  methods: {
    closeSession() {
      this.$store.dispatch('closeSession')
    },
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
  transition: 300ms;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  flex-flow: column nowrap;
  height: 100vh;
  z-index: 5;
  font-family: 'Titillium Web';
  min-width: max-content;
}

.brand {
  margin: 24px 0px;
  text-align: left;
  min-height: 40px;
  .logo {
    width: 100%;
    display: flex;
    align-items: center;
    .logo-container {
      display: flex;
      justify-content: center;
      width: 70px;
    }
    .name {
      margin-left: 8px;
    }
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
  display: flex;
  padding: 24px 0px;
  border-top: $sidebar-settings-border;
  border-bottom: $sidebar-settings-border;
  align-items: center;
}

.link-list {
  align-items: flex-start;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  .link {
    align-items: center;
    border-left: $sidebar-inactive-border;
    color: $sidebar-link-color;
    display: flex;
    flex-flow: row nowrap;
    font-size: $sidebar-link-font_size;
    font-weight: $sidebar-link-font_weight;
    padding: 24px 0px;
    text-decoration: none;
    width: 100%;
    text-align: left;
    justify-content: center;

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
  flex-flow: row nowrap;
  font-size: $icon-settings-font_size;
  margin-top: auto;
  padding: 24px 0px;

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    .exit-icon {
      cursor: pointer;
      width: 20px;
    }
  }
}

.collapsed-sidebar {
  transition: 300ms;
  height: 100vh;
  min-width: 70px;
  max-width: 70px;
}
.collapsed-settings {
  justify-content: center;
}
.collapsed-brand {
  text-align: center;
  .logo {
    display: flex;
    justify-content: center;
  }
}

.collapsed-label {
  display: none;
}
</style>

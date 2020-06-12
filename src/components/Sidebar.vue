<template>
  <div class="sidebar-container">
    <div v-if="expanded" class="overlay" />
    <div
      :class="['sidebar', expanded ? 'expanded' : 'collapsed']"
      @mouseover="expandSidebar"
      @mouseleave="collapseSidebar"
    >
      <router-link
        data-test="logo-to-main"
        class="brand"
        to="/wallet/transactions"
      >
        <img class="sheikah-logo" src="@/resources/svg/sheikah-small.svg" />
        <img class="sheikah-name" src="@/resources/svg/sheikah.svg" />
      </router-link>
      <div class="current-wallet">
        <NetworkStatus
          :window-width="windowWidth"
          :wallet-idx="walletIdx"
          :expanded="expanded"
          :status="status"
        />
      </div>
      <div class="link-list">
        <router-link
          data-test="to-transactions"
          class="link"
          to="/wallet/transactions"
        >
          <font-awesome-icon class="icon" icon="wallet" />
          <span class="label">Transactions</span>
        </router-link>

        <router-link
          data-test="to-templates"
          class="link"
          to="/request/templates"
        >
          <font-awesome-icon class="icon" icon="code" />
          <span class="label">Data request</span>
        </router-link>

        <!-- Uncomment when marketplace is implemented -->
        <!-- <router-link data-test="to-marketplace" class="link" to="/marketplace">
          <font-awesome-icon class="icon" icon="shopping-bag" />
          <span v-if="expanded" class="label">Marketplace</span>
        </router-link> -->

        <router-link data-test="to-community" class="link" to="/community">
          <font-awesome-icon class="icon" icon="users" />
          <span class="label">Community</span>
        </router-link>
      </div>
      <div class="settings" @click="closeSession">
        <div class="icon-container">
          <img
            class="exit-icon"
            src="@/resources/svg/exit-icon.svg"
            alt="exit-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NetworkStatus from '@/components/NetworkStatus.vue'

export default {
  name: 'Sidebar',
  components: {
    NetworkStatus,
  },
  data() {
    return {
      expanded: false,
      windowWidth: window.innerWidth,
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
  computed: {
    ...mapState({
      walletIdx: state => state.wallet.walletIdx,
      status: state => state.wallet.status,
      walletInfos: state => state.wallet.walletInfos,
    }),
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  methods: {
    ...mapActions({
      closeSession: 'closeSession',
    }),
    expandSidebar() {
      this.expanded = true
    },
    collapseSidebar() {
      this.expanded = false
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/app.global.scss';

.sidebar-container {
  position: absolute;
}

.overlay {
  background-color: $grey-6;
  height: 100%;
  opacity: 0.5;
  position: fixed;
  -webkit-transition: all 0.4s ease-in ease-out;
  -o-transition: all 0.4s ease-in ease-out;
  -moz-transition: all 0.4s ease-in ease-out;
  transition: opacity 0.4s ease;
  width: 100%;
  z-index: 5;
}

.sidebar {
  background-color: $white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: grid;
  font-family: 'Roboto';
  grid-template-rows: 70px max-content auto 70px;
  min-height: 100vh;
  overflow: hidden;
  position: fixed;
  z-index: 5;
}

.expanded {
  -webkit-transition: all 0.4s ease-in ease-out;
  -o-transition: all 0.4s ease-in ease-out;
  -moz-transition: all 0.4s ease-in ease-out;
  transition: width 0.4s ease;
  width: 408px;
}

.brand {
  align-items: center;
  display: grid;
  grid-template-columns: 70px auto;
  justify-items: center;
  overflow: hidden;
  width: 100%;

  .sheikah-name {
    justify-self: start;
    margin-left: 8px;
  }
}

.current-wallet {
  align-self: stretch;
  border-bottom: $sidebar-settings-border;
  border-top: $sidebar-settings-border;
  overflow: hidden;
}

.link-list {
  align-self: start;
  display: grid;
  grid-template-rows: 70px 70px 70px 70px;
  overflow: hidden;

  .link {
    border-left: $sidebar-inactive-border;
    color: $sidebar-link-color;
    display: flex;
    flex-wrap: none;
    font-size: $sidebar-link-font_size;
    font-weight: $sidebar-link-font_weight;
    padding: 24px 0;
    text-align: left;
    text-decoration: none;

    &:hover {
      background-color: $alpha-purple;
      border-left: $sidebar-inactive-border-hover;
    }

    &.router-link-active {
      background-color: $alpha-purple;
      border-left: $sidebar-active-border;
    }

    .icon {
      width: 66px;
    }
  }
}

.settings {
  align-items: center;
  border-top: $sidebar-settings-border;
  display: grid;
  font-size: $icon-settings-font_size;
  grid-template-columns: 70px auto;
  justify-items: center;

  .icon-container {
    .exit-icon {
      cursor: pointer;
      width: 20px;
    }
  }
}

.collapsed {
  -webkit-transition: all 0.4s ease-in ease-out;
  -o-transition: all 0.4s ease-in ease-out;
  -moz-transition: all 0.4s ease-in ease-out;
  transition: width 0.4s ease;
  width: 70px;
}
</style>

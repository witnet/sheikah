<template>
  <div>
    <div class="sidebar">
      <div class="brand">
      <router-link class="logo" to="/wallet/transactions">
        <img class="sheikah-img" src='@/resources/svg/sheikah.svg' />
      </router-link>
      </div>
      <div class="current-wallet">
       <span class="current-wallet-name">My Wallet</span>
      </div>
      <div class="link-list">
        <router-link class="link" to="/wallet/transactions">
          <font-awesome-icon class="icon" icon="wallet" />
          <span class="label">Wallet</span>
        </router-link>

        <router-link class="link" to="/request/editor">
          <font-awesome-icon class="icon" icon="code" />
          <span class="label">Data request</span>
        </router-link>

        <router-link class="link" to="/marketplace">
          <font-awesome-icon class="icon" icon="shopping-bag" />
          <span class="label">Marketplace</span>
        </router-link>

        <router-link class="link" to="/community">
          <font-awesome-icon class="icon" icon="users" />
          <span class="label">Community</span>
        </router-link>
      </div>
      <div class="settings">
        <Settings :settings="settings"/>
        <NetworkStatus :status="status" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import NetworkStatus from '@/components/NetworkStatus.vue'
import Settings from '@/components/Settings.vue'

export default {
  data(){
    return {
      settings: [{
        label: 'Close session',
        action: ()=>{
          this.$store.dispatch('closeSession')
        }
      }]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
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

@media screen and (max-width: 1200px) {
  .sidebar {
    max-width: 90px;
  }

  .brand {
    clip-path: circle(60px at 0);
  }

  .label {
    display: none;
  }

  .current-wallet-name {
    transform: translateX(-5px);
  }

  .settings {
    
    .mainnet,
    .synced {
      display: none;
    }
  }
}

.sidebar {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  z-index: 5;
  width: 20vw;
  font-family: 'Titillium Web'
}

.brand {
  padding: 28px;

  .logo {
    width: $sidebar-logo-width;
  }

  .sheikah-img {
    clip-path: inset(0px 150px 0px 0px);
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
  padding: 20px;

  .current-wallet-name {
    text-overflow: ellipsis;
  }
}

.link-list {
  align-items: flex-start;
  display: flex;
  flex-flow: column nowrap;
  margin-top: 10px;
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

    &.router-link-active {
      border-left: $sidebar-active-border;
      color: $sidebar-active-color;
    }

    .icon {
      margin-right: 25px;
      margin-left: 20px;
      width: 20px;
    }

    .label {
      width: 100%;
    }
  }

  .active {
    border-left: $sidebar-active-border;
    color: $sidebar-active-color;
  }
}

.settings {
  align-items: center;
  border-top: $sidebar-settings-border;
  display: flex;
  flex-flow: row nowrap;
  font-size: $icon-settings-font_size;
  justify-content: space-around;
  margin-top: auto;
  padding: 15px 0;

  .settings-icon {
    color: $sidebar-settings-icon-color;
    cursor: pointer;
    font-size: $sidebar-settings-icon-size;
  }

  .net-status {
    font-size: $icon_status-font_size;
    display: flex;
    align-items: center;

    .dot {
      height: 10px;
      width: 10px;
      background-color: $yellow-5;
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
</style>

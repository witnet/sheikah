<template>
  <div>
    <div class="sidebar">
      <div class="brand">
      <router-link class="logo" to="/">
        <img class="sheikah-img" src='@/resources/svg/sheikah.svg' />
      </router-link>
      </div>
      <div class="current-wallet">
       <span class="current-wallet-name">My Wallet</span>
      </div>
      <div class="link-list">
        <router-link class="link" to="/wallet">
          <font-awesome-icon class="icon" icon="wallet" />
          <span class="label">Wallet</span>
        </router-link>

        <router-link class="link" to="/request">
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
        <font-awesome-icon icon="cog" />
        <div class="net-status">
          <span class="mainnet">PROTOTYPE</span>
          <span class="synced">SYNCED</span>
          <!-- <DotIndicator mood="warning"/> -->
          <span class="dot"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>
<style lang="scss">

@import '@/styles/theme.scss';
@import '@/styles/app.global.scss';

@media screen and (max-width: 1200px) {
  .sidebar {
    max-width: 75px;
  }
  .brand {
    clip-path: circle(60px at 0);
  }
  .label {
    opacity: 0;
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
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
    z-index: 5;
    width: 15vw;
    font-family: 'Titillium Web'
  }
  .brand {
    padding: 20px;
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
      padding: 15px 8px;
      text-decoration: none;
      width: 100%;
      text-align: left;
      &.router-link-active{
        border-left: $sidebar-active-border;
        color: $sidebar-active-color;
      }
      .icon {
        margin-right: 20px;
        margin-left: 10px;
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
    justify-content: space-between;
    margin-top: auto;
    padding: 15px;
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

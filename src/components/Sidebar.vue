<template>
  <div class="sidebar-container">
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
        <CustomIcon class-name="sheikah-logo" name="SheikahSmall" />
        <div class="sheikah-name">
          <CustomIcon class-name="name" name="Sheikah" />
          <span class="version">{{ version }}</span>
        </div>
      </router-link>
      <div class="current-wallet">
        <NetworkStatus
          :window-width="windowWidth"
          :expanded="expanded"
          @close="collapseSidebar"
        />
      </div>
      <div class="link-list">
        <router-link
          data-test="to-transactions"
          class="link"
          to="/wallet/transactions"
        >
          <font-awesome-icon class="icon" icon="wallet" />
          <span class="label capitalize">{{ $t('transactions') }}</span>
        </router-link>

        <router-link
          data-test="to-templates"
          class="link"
          to="/request/templates"
        >
          <font-awesome-icon class="icon" icon="code" />
          <span class="label capitalize">{{ $t('data_request') }}</span>
        </router-link>
      </div>
      <div class="settings">
        <div class="icon-container" @click="closeSession">
          <el-tooltip
            :content="$t('back_to_list')"
            placement="right"
            effect="light"
          >
            <CustomIcon class-name="exit-icon" name="ExitIcon" />
          </el-tooltip>
        </div>
        <div class="icon-container" @click="$router.push('/settings/general')">
          <font-awesome-icon icon="cog" class="icon" />
        </div>
      </div>
    </div>
    <ExportXprv v-if="isEncryptXprvVisible" @close="collapseSidebar" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ObserveVisibility } from 'vue-observe-visibility'
import NetworkStatus from '@/components/NetworkStatus.vue'
import ExportXprv from '@/components/ExportXprv.vue'
import CustomIcon from '@/components/CustomIcon.vue'

export default {
  name: 'Sidebar',
  components: {
    NetworkStatus,
    ExportXprv,
    CustomIcon,
  },
  directives: {
    ObserveVisibility,
  },
  data() {
    return {
      expanded: false,
      windowWidth: window.innerWidth,
      isEncryptXprvVisible: false,
      settingVisible: false,
    }
  },
  computed: {
    version() {
      // eslint-disable-next-line no-undef
      return `v${__APP_VERSION__}`
    },
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  methods: {
    ...mapActions({
      closeSession: 'closeSession',
      shutdown: 'shutdown',
    }),
    visibilityChanged(isVisible) {
      if (isVisible) {
        this.settingVisible = true
      } else {
        this.settingVisible = false
      }
    },
    exportXprv() {
      this.isEncryptXprvVisible = true
    },
    expandSidebar() {
      this.expanded = true
    },
    collapseSidebar() {
      this.isEncryptXprvVisible = false
      if (this.settingVisible) {
        this.expanded = true
      } else {
        this.expanded = false
      }
    },
    handleCommand(index) {
      this.settings[index].action()
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.sidebar-container {
  .sidebar {
    background-color: var(--sidebar-section-background);
    box-shadow: 0 0 20px rgb(0 0 0 / 10%);
    display: grid;
    font-family: 'Roboto';
    grid-template-rows: 70px max-content auto 70px;
    min-height: 100vh;
    overflow: hidden;
    position: fixed;
    z-index: 20;

    &.expanded {
      transition: all 0.4s ease-in ease-out;
      transition: width 0.4s ease;
      width: 408px;
    }

    &.collapsed {
      transition: all 0.4s ease-in ease-out;
      transition: width 0.4s ease;
      width: 70px;
    }

    .brand {
      align-items: center;
      display: grid;
      grid-template-columns: 70px auto;
      justify-items: center;
      overflow: hidden;
      text-decoration: none;
      width: 100%;

      .sheikah-name {
        align-items: flex-end;
        display: flex;
        justify-self: start;
        margin-left: 8px;
        min-width: 100px;

        .version {
          color: var(--text-medium-emphasis);
          font-size: 13px;
          font-weight: 600;
          margin-left: 8px;
        }
      }
    }

    .current-wallet {
      align-self: stretch;
      border-bottom: var(--sidebar-settings-border);
      border-top: var(--sidebar-settings-border);
      overflow: hidden;
    }

    .link-list {
      align-self: start;
      display: grid;
      grid-template-rows: 70px 70px 70px 70px;
      overflow: hidden;

      .link {
        border-left: var(--sidebar-section-border);
        color: var(--text-medium-emphasis);
        display: flex;
        flex-wrap: none;
        font-size: $sidebar-link-font_size;
        font-weight: $sidebar-link-font_weight;
        padding: 24px 0;
        text-align: left;
        text-decoration: none;

        &:hover {
          background-color: var(--sidebar-section-active-background);
          border-left: var(--sidebar-border-hover);
        }

        &.router-link-active {
          background-color: var(--sidebar-section-active-background);
          border-left: var(--sidebar-active-border);
        }

        .icon {
          width: 66px;
        }
      }
    }

    .settings {
      align-items: center;
      border-top: var(--sidebar-settings-border);
      display: grid;
      font-size: $icon-settings-font_size;
      grid-template-columns: 70px 70px auto;
      justify-items: center;

      .icon-container {
        cursor: pointer;
        display: flex;
        margin: -10px;
        padding: 10px;
      }

      .exit-icon {
        cursor: pointer;
        width: 20px;
      }

      .icon {
        color: var(--text-medium-emphasis);
        cursor: pointer;
        font-size: 20px;
      }
    }
  }
}
</style>

<template>
  <div class="settings-layout">
    <SettingsSidebar
      class="sidebar"
      :sections="sections"
      :active-section="activeRoute.route"
    />
    <div class="settings-content">
      <SettingsSection :settings="settings" />
      <div
        class="close"
        @mouseenter="hoverAction"
        @mouseleave="mouseLeaveAction"
        @click="close"
      >
        <CustomIcon class-name="cross" :name="btnUrl" />
      </div>
      {{ btnUrl }}
      <Version />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { SETTINGS_BY_SECTION } from '@/constants'
import CustomIcon from '@/components/CustomIcon.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import Version from '@/components/Version.vue'
import SettingsSection from '@/components/SettingsSection.vue'

export default {
  name: 'Settings',
  components: {
    SettingsSidebar,
    SettingsSection,
    CustomIcon,
    Version,
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const isSettingsRoute = !!vm.sections.find(section =>
        from.path.includes(section.route),
      )

      if (!isSettingsRoute) {
        vm.previousRoute = from.path
      }
    })
  },
  data() {
    return {
      previousRoute: '',
      btnUrl: 'CloseBtn',
    }
  },
  computed: {
    ...mapState({
      sessionId: state => state.wallet.sessionId,
    }),
    settings() {
      const sectionsDictionary = {
        GENERAL: SETTINGS_BY_SECTION.GENERAL,
        ADVANCED: SETTINGS_BY_SECTION.ADVANCED,
        NOTIFICATIONS: SETTINGS_BY_SECTION.NOTIFICATIONS,
        ABOUT: SETTINGS_BY_SECTION.ABOUT,
      }
      if (this.$route.name) {
        return sectionsDictionary[this.$route.name]
      } else {
        return []
      }
    },
    sections() {
      const walletSections = [this.$t('settings_advance')]

      const sections = [
        {
          name: this.$t('settings_general'),
          description: this.$t('settings_general_description'),
          route: '/settings/general',
        },
        {
          name: this.$t('settings_advance'),
          description: this.$t('settings_advance_description'),
          route: '/settings/advanced',
        },
        {
          name: this.$t('settings_alerts'),
          description: this.$t('settings_alerts_description'),
          route: '/settings/notifications',
        },
        {
          name: this.$t('settings_about'),
          description: this.$t('settings_about_description'),
          route: '/settings/about',
        },
      ]

      // Remove sections is no sessionId is found
      return this.sessionId
        ? sections
        : sections.filter(section => !walletSections.includes(section.name))
    },
    activeRoute() {
      return this.sections.find(section => section.route === this.$route.path)
    },
  },
  beforeUnmount() {
    this.closeModals()
  },
  methods: {
    ...mapMutations({
      closeModals: 'closeAllModals',
    }),
    close() {
      this.$router.push(this.previousRoute)
    },
    hoverAction() {
      this.btnUrl = 'CloseBtnLight'
    },
    mouseLeaveAction() {
      this.btnUrl = 'CloseBtn'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.settings-layout {
  background: var(--app-background-color);
  display: grid;
  grid-template-columns: 30vw 1fr;
}

.sidebar {
  grid-row-end: span 2;
}

.settings-content {
  display: grid;
  grid-column: 2;
  grid-template-columns: repeat(auto-fill, auto);
  min-height: 100vh;
  overflow: hidden;
  padding-top: 64px;
  position: relative;
  width: 50vw;
}

.close {
  border: 2px solid $grey-2;
  border-radius: 50%;
  cursor: pointer;
  height: 36px;
  padding: 8px;
  position: absolute;
  right: 0;
  top: 32px;

  &:hover {
    background-color: $grey-2;
  }

  .cross {
    width: 16px;
  }
}
</style>

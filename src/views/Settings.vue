<template>
<LayoutSidebar>
  <template v-slot:sidebar>
    <SettingsSidebar
      class="sidebar"
      :sections="sections"
      :active-section="activeRoute.route"
    />
  </template>
  <div class="content">
    <SettingsSection :settings="settings" />
  </div>
  <div
    class="close"
    @mouseenter="hoverAction"
    @mouseleave="mouseLeaveAction"
    @click="close"
  >
    <img class="cross" :src="btnUrl" />
  </div>
</LayoutSidebar>
</template>

<script>
import { mapState } from 'vuex'

import { SETTINGS_BY_SECTION } from '@/constants'
import SettingsSidebar from '@/components/SettingsSidebar'
import LayoutSidebar from '@/components/LayoutSidebar.vue'
import SettingsSection from '@/components/SettingsSection.vue'

export default {
  name: 'Settings',
  components: {
    SettingsSidebar,
    LayoutSidebar,
    SettingsSection
  },
  data() {
    return {
      previousRoute: '',
      btnUrl: require('@/resources/svg/close-btn.svg'),
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
      const walletSections = ['Advanced']

      const sections = [
        {
          name: 'General',
          description: 'Language, appearence ...',
          route: '/settings/general',
        },
        {
          name: 'Advanced',
          description: 'Node-Wallet connection ...',
          route: '/settings/advanced',
        },
        {
          name: 'Alerts',
          description: 'Notifications',
          route: '/settings/notifications',
        },
        {
          name: 'About',
          description: 'Follow Witnet Foundation',
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
  methods: {
    close() {
      this.$router.push(this.previousRoute)
    },
    hoverAction() {
      this.btnUrl = require('@/resources/svg/close-btn-light.svg')
    },
    mouseLeaveAction() {
      this.btnUrl = require('@/resources/svg/close-btn.svg')
    },
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
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.content {
  padding: 64px 0;
  width: 100%;
  width: 760px;
}

.close {
  border: 2px solid $grey-2;
  border-radius: 50%;
  cursor: pointer;
  height: 36px;
  padding: 8px;
  position: fixed;
  right: 56px;
  top: 32px;

  &:hover {
    background-color: $grey-2;
  }

  .cross {
    width: 16px;
  }
}
</style>

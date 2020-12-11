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

    <font-awesome-icon class="icon cross" icon="times" @click="close" />
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
    SettingsSection,
  },
  data() {
    console.log(this.$store)
    return {
      previousRoute: '',
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

      return sectionsDictionary[this.$route.name]
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
.content {
  padding: 64px 48px;
  width: 100%;
  width: 584px;
}

.cross {
  color: rgba(155, 81, 224, 0.8);
  cursor: pointer;
  font-size: 32px;
  position: fixed;
  right: 56px;
  top: 32px;

  &:hover {
    color: rgba(155, 81, 224);
  }
}
</style>

<template>
  <div class="console-container">
    <ConsoleTab
      v-on:change-tab="changeTab"
      :tabs="tabs"
      v-on:close="closeConsole"
      :showConsole="showConsole"
    />
    <Variables v-show="showVariables" />
    <Logs v-show="showLogs" />
  </div>
</template>

<script>
import Variables from '@/components/Variables.vue'
import Logs from '@/components/Logs.vue'
import ConsoleTab from '@/components/ConsoleTab.vue'
const VARIABLES = 'variables'
const LOGS = 'logs'

export default {
  name: 'Console',
  components: {
    Variables,
    ConsoleTab,
    Logs,
  },
  data() {
    return {
      currentTab: VARIABLES,
      tabs: [VARIABLES, LOGS],
      showConsole: true,
    }
  },
  computed: {
    showVariables: function() {
      if (this.currentTab === VARIABLES && this.showConsole) {
        return true
      } else {
        return false
      }
    },
    showLogs: function() {
      if (this.currentTab === LOGS && this.showConsole) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    changeTab(tab) {
      this.showConsole = true
      this.currentTab = tab
    },
    closeConsole() {
      this.showConsole = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.console-container {
  position: fixed;
  right: 0px;
  left: 20vw;
  display: flex;
  flex-direction: column;
  bottom: 0px;
  color: $grey-1;
}
@media screen and (max-width: 1200px) {
  .console-container {
    left: 90px;
  }
}
</style>

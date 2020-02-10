<template>
  <div class="console-container">
    <ConsoleTabs
      v-on:change-tab="changeTab"
      :current="currentTab"
      :tabs="tabs"
      v-on:close="closeConsole"
      :showConsole="showConsole"
    />
    <Variables v-show="showVariables" />
    <Logs v-show="showLogs" :logs="logs" />
  </div>
</template>

<script>
import Variables from '@/components/Variables.vue'
import Logs from '@/components/Logs.vue'
import ConsoleTabs from '@/components/ConsoleTabs.vue'
const VARIABLES = 'variables'
const LOGS = 'logs'

export default {
  name: 'Console',
  components: {
    Variables,
    ConsoleTabs,
    Logs,
  },
  props: {
    logs: Array,
  },
  data() {
    return {
      currentTab: VARIABLES,
      tabs: [VARIABLES, LOGS],
      showConsole: false,
    }
  },
  watch: {
    logs(val, old) {
      if (val.length !== val.old) {
        this.changeTab(LOGS)
        this.openConsole()
      }
    },
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
    openConsole() {
      this.showConsole = true
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

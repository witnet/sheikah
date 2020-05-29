<template>
  <div class="console-container">
    <ConsoleTabs
      :current="currentTab"
      :tabs="tabs"
      :show-console="showConsole"
      @change-tab="changeTab"
      @close="closeConsole"
    />
    <Logs v-show="showLogs" :logs="logs" />
  </div>
</template>

<script>
import Logs from '@/components/Logs.vue'
import ConsoleTabs from '@/components/ConsoleTabs.vue'
const VARIABLES = 'variables'
const LOGS = 'logs'

export default {
  name: 'Console',
  components: {
    ConsoleTabs,
    Logs,
  },
  props: {
    logs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentTab: VARIABLES,
      tabs: [LOGS],
      showConsole: false,
    }
  },
  computed: {
    showLogs: function() {
      if (this.currentTab === LOGS && this.showConsole) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    logs(val, old) {
      if (val.length !== val.old) {
        this.changeTab(LOGS)
        this.openConsole()
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
  color: $alt-grey-1;
  position: sticky;
}
</style>

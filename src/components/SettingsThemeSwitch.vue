<template>
  <el-switch
    v-model="toggle"
    class="notification"
    data-test="action-try"
    active-color="#b47de8"
    :active-text="activeTheme"
    :inactive-text="inactiveTheme"
  ></el-switch>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'NotificationsSettings',
  data() {
    return {
      activeTheme: 'Dark',
      inactiveTheme: 'Light',
    }
  },
  computed: {
    ...mapState({
      darkMode: state => state.wallet.darkMode,
    }),
    toggle: {
      set() {
        this.toggleTheme()
      },
      get() {
        return this.darkMode
      },
    },
  },
  watch: {
    darkMode() {
      this.getTheme()
    },
  },
  methods: {
    ...mapMutations({
      toggleTheme: 'toggleTheme',
    }),
    ...mapActions({
      getTheme: 'getTheme',
    }),
  },
}
</script>

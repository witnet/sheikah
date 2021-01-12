<template>
  <el-switch
    v-model="activeTheme"
    class="notification"
    data-test="action-try"
    :active-text="THEMES.DARK"
    :inactive-text="THEMES.LIGHT"
  ></el-switch>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { THEMES } from '@/constants'

export default {
  name: 'ThemeSettings',
  data() {
    return {
      THEMES,
    }
  },
  computed: {
    ...mapState({
      theme: state => state.wallet.theme,
    }),
    activeTheme: {
      set() {
        this.toggleTheme()
      },
      get() {
        return this.theme === THEMES.DARK
      },
    },
  },
  watch: {
    theme() {
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

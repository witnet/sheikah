<template>
  <img :src="url" :class="className" />
</template>

<script>
import { mapState } from 'vuex'
import { THEMES, CUSTOM_ICON_NAMES } from '@/constants'

export default {
  name: 'ThemeSettings',
  props: {
    className: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
      validator(value) {
        return value ? CUSTOM_ICON_NAMES.includes(value) : true
      },
    },
  },
  data() {
    return {
      THEMES,
    }
  },
  computed: {
    ...mapState({
      theme: state => state.wallet.theme,
    }),
    url() {
      console.log('---->', this.name)
      // @/resources/svg/sheikah-icon.svg
      // /home/tommy/development/witnet/sheikah/src/resources/svg/sheikah-icon.svg
      // TODO: fixme
      // if (this.theme === this.THEMES.DARK) {
      //   return require(`@/resources/svg/${this.name}-dark.svg`)
      // } else {
      //   return require(`@/resources/svg/${this.name}.svg`)
      // }
    },
  },
}
</script>

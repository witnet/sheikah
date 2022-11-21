<template>
  <component :class="className" :is="url" />
</template>

<script>
import { mapState } from 'vuex'

import { THEMES, CUSTOM_ICON_NAMES } from '@/constants'
import AddOperator from '@/components/svg/AddOperator.vue'
import Add from '@/components/svg/Add.vue'
import CloseBtn from '@/components/svg/CloseBtn.vue'
import CloseBtnLight from '@/components/svg/CloseBtnLight.vue'
import Close from '@/components/svg/Close.vue'
import DeleteBtn from '@/components/svg/DeleteBtn.vue'
import Disconnected from '@/components/svg/Disconnected.vue'
import Down from '@/components/svg/Down.vue'
import ExitIcon from '@/components/svg/ExitIcon.vue'
import LongArrow from '@/components/svg/LongArrow.vue'
import Negative from '@/components/svg/Negative.vue'
import Open from '@/components/svg/Open.vue'
import OperatorArrow from '@/components/svg/OperatorArrow.vue'
import OptionsMarketplace from '@/components/svg/OptionsMarketplace.vue'
import Options from '@/components/svg/Options.vue'
import Positive from '@/components/svg/Positive.vue'
import SheikahIcon from '@/components/svg/SheikahIcon.vue'
import SheikahSmall from '@/components/svg/SheikahSmall.vue'
import Sheikah from '@/components/svg/Sheikah.vue'
import SortDown from '@/components/svg/SortDown.vue'
import SortUp from '@/components/svg/SortUp.vue'
import Up from '@/components/svg/Up.vue'

  import Telegram from '@/components/svg/Telegram.vue'
  import Discord from '@/components/svg/Discord.vue'
  import Reddit from '@/components/svg/Reddit.vue'
  import Medium from '@/components/svg/Medium.vue'
  import Email from '@/components/svg/Email.vue'
  import Github from '@/components/svg/Github.vue'

export default {
  name: 'ThemeSettings',
  components: {
  AddOperator,
  Add,
  CloseBtn,
  CloseBtnLight,
  Close,
  DeleteBtn,
  Disconnected,
  Down,
  ExitIcon,
  LongArrow,
  Negative,
  Open,
  OperatorArrow,
  OptionsMarketplace,
  Options,
  Positive,
  SheikahIcon,
  SheikahSmall,
  Sheikah,
  SortDown,
  SortUp,
  Up,
  Telegram,
  Discord,
  Reddit,
    Medium,
    Email,
    Github
  },
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
      if (this.theme === this.THEMES.DARK) {
        return `${this.name}Dark`
      } else {
        return `${this.name}`
      }
    },
  },
}
</script>

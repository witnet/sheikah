<template>
  <component :class="className" :is="url" />
</template>

<script>
import { mapState } from 'vuex'

import { THEMES, CUSTOM_ICON_NAMES } from '@/constants'

import Add from '@/components/svg/Add.vue'
import AddOperator from '@/components/svg/AddOperator.vue'
import AddOperatorDark from '@/components/svg/AddOperatorDark.vue'
import Close from '@/components/svg/Close.vue'
import CloseBtn from '@/components/svg/CloseBtn.vue'
import CloseBtnDark from '@/components/svg/CloseBtnDark.vue'
import CloseBtnLight from '@/components/svg/CloseBtnLight.vue'
import CloseBtnLightDark from '@/components/svg/CloseBtnLightDark.vue'
import DeleteBtn from '@/components/svg/DeleteBtn.vue'
import DeleteBtnDark from '@/components/svg/DeleteBtnDark.vue'
import Disconnected from '@/components/svg/Disconnected.vue'
import Discord from '@/components/svg/Discord.vue'
import Down from '@/components/svg/Down.vue'
import Email from '@/components/svg/Email.vue'
import ExitIcon from '@/components/svg/ExitIcon.vue'
import Github from '@/components/svg/Github.vue'
import LongArrow from '@/components/svg/LongArrow.vue'
import Medium from '@/components/svg/Medium.vue'
import Negative from '@/components/svg/Negative.vue'
import Open from '@/components/svg/Open.vue'
import OperatorArrow from '@/components/svg/OperatorArrow.vue'
import Options from '@/components/svg/Options.vue'
import OptionsMarketplace from '@/components/svg/OptionsMarketplace.vue'
import Positive from '@/components/svg/Positive.vue'
import Reddit from '@/components/svg/Reddit.vue'
import Sheikah from '@/components/svg/Sheikah.vue'
import SheikahIcon from '@/components/svg/SheikahIcon.vue'
import SheikahSmall from '@/components/svg/SheikahSmall.vue'
import SortDown from '@/components/svg/SortDown.vue'
import SortUp from '@/components/svg/SortUp.vue'
import Telegram from '@/components/svg/Telegram.vue'
import Up from '@/components/svg/Up.vue'
import UpDark from '@/components/svg/UpDark.vue'
import SortUpDark from '@/components/svg/SortUpDark.vue'
import OpenDark from '@/components/svg/OpenDark.vue'
import OperatorArrowDark from '@/components/svg/OperatorArrowDark.vue'
import OptionsDark from '@/components/svg/OptionsDark.vue'
import SheikahDark from '@/components/svg/SheikahDark.vue'
import SheikahSmallDark from '@/components/svg/SheikahSmallDark.vue'
import SortDownDark from '@/components/svg/SortDownDark.vue'
import LongArrowDark from '@/components/svg/LongArrowDark.vue'
import DownDark from '@/components/svg/DownDark.vue'
import ExitIconDark from '@/components/svg/ExitIconDark.vue'
import Twitter from '@/components/svg/Twitter.vue'

export default {
  name: 'ThemeSettings',
  components: {
    DeleteBtnDark,
    Add,
    AddOperator,
    AddOperatorDark,
    Close,
    CloseBtn,
    CloseBtnDark,
    CloseBtnLight,
    CloseBtnLightDark,
    DeleteBtn,
    Disconnected,
    Discord,
    Down,
    Email,
    ExitIcon,
    Github,
    LongArrow,
    Medium,
    Negative,
    Open,
    OperatorArrow,
    Options,
    OptionsMarketplace,
    Positive,
    Reddit,
    Sheikah,
    SheikahIcon,
    SheikahSmall,
    SortDown,
    SortUp,
    Telegram,
    Up,
    UpDark,
    SortUpDark,
    OpenDark,
    OperatorArrowDark,
    OptionsDark,
    SheikahDark,
    SheikahSmallDark,
    SortDownDark,
    LongArrowDark,
    DownDark,
    ExitIconDark,
    Twitter,
    // TwitterDark
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
      let url
      if (this.theme === this.THEMES.DARK) {
        url = `${this.name}Dark`.trim()
      } else {
        url = `${this.name}`.trim()
      }
      return url
    },
  },
}
</script>

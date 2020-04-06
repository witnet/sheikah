<template>
  <NavigationCard data-test="download-file" title="It's done!" :disabledNextButton="false">
    <p class="text">
      You have completed the Witnet token claim process successfully on the Sheikah side, but please
      <span class="bold">REMEMBER TO SEND THE CLAIM FILE TO THIS ADDRESS:</span>
    </p>
    <a class="e-mail" href="mailto:genesis@witnet.foundation">
      genesis@witnet.foundation
    </a>
    <p class="download-again">
      If you lost your claim file, do not panic!
      <span class="underline" @click="exportFile">Click here to download</span> it again
    </p>
    <p class="text">
      There is nothing to do on Sheikah until the genesis event takes place. In the meanwhile, you
      are invited to join other community members in our
      <a href="https://discord.gg/X4uurfP" target="_blank" class="underline"> Discord </a>
      and <a href="https://t.me/witnetio" target="_blank" class="underline"> Telegram</a>.
    </p>
    <div slot="alt-footer" class="countdown-background">
      <p class="countdown-header">TIME TO GENESIS EVENT</p>
      <div class="countdown">
        <div class="column">
          <p class="digit">{{ days }}</p>
          <p class="text">DAYS</p>
        </div>
        <div class="column">
          <p class="digit">{{ hours }}</p>
          <p class="text">HOURS</p>
        </div>
        <div class="column">
          <p class="digit">{{ minutes }}</p>
          <p class="text">MINUTES</p>
        </div>
        <div class="column">
          <p class="digit">{{ seconds }}</p>
          <p class="text">SECONDS</p>
        </div>
      </div>
    </div>
    <a
      v-show="dataStr"
      ref="file"
      :href="exportFileLink"
      download="claiming-information.json"
      style="display:none"
    />
  </NavigationCard>
</template>

<script>
import { mapState } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  components: {
    NavigationCard,
  },
  beforeCreate() {
    this.$store.dispatch('getExportFile')
  },
  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000),
    }
  },
  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000)
    }, 1000)
  },
  methods: {
    exportFile() {
      this.$refs.file.click()
    },
    standardizeDigits(value) {
      if (value < 0) {
        return '00'
      }
      if (value.toString().length <= 1) {
        return `0${value}`
      }
      return value
    },
  },
  computed: {
    ...mapState({
      date: state => {
        return state.wallet.checkTokenGenerationEventDate
      },
      exportFileLink: state => {
        return state.wallet.exportFileLink
      },
    }),
    dateInMilliseconds() {
      return Math.trunc(Date.parse(this.date) / 1000)
    },
    seconds() {
      const seconds = (this.dateInMilliseconds - this.now) % 60
      return this.standardizeDigits(seconds)
    },
    minutes() {
      const minutes = Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60
      return this.standardizeDigits(minutes)
    },
    hours() {
      const hours = Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24
      return this.standardizeDigits(hours)
    },
    days() {
      const days = Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24)
      return this.standardizeDigits(days)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
.countdown-background {
  padding-top: 24px;
  border-top: 1px solid $grey-1;
  background: $grey-0;
  .countdown-header {
    color: $font-color-light;
    text-align: center;
  }
}
.countdown {
  display: flex;
  justify-content: center;
  .column {
    display: flex;
    flex-direction: column;
    margin: 20px;
    .text {
      color: $font-color-light;
      margin-top: 24px;
      margin-bottom: 16px;
      text-align: center;
    }

    .digit {
      font-size: 50px;
      margin: 10px;
      text-align: center;
    }
  }
}
.text {
  margin-bottom: 8px;
}
.e-mail {
  font-size: 20px;
  margin: 24px 0px 8px 0px;
  text-align: center;
  color: $purple-6;
}
.download-again {
  margin-bottom: 24px;
  text-align: center;
  font-style: italic;
  color: $grey-3;
}
.underline {
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
}
.bold {
  font-weight: bold;
  margin-bottom: 16px;
}
</style>

<template>
  <NavigationCard data-test="download-file" title="Download file">
    <p class="text">
      You have completed the Witnet token claim process successfully on the Sheikah side, but please
      <span class="bold">REMEMBER TO SEND THE CLAIM FILE TO THIS ADDRESS:</span>
    </p>
    <p class="e-mail">
      genesis@witnet.foundation
    </p>
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
          <p class="text">Days</p>
        </div>
        <div class="column">
          <p class="digit">{{ hours }}</p>
          <p class="text">Hours</p>
        </div>
        <div class="column">
          <p class="digit">{{ minutes }}</p>
          <p class="text">Minutes</p>
        </div>
        <div class="column">
          <p class="digit">{{ seconds }}</p>
          <p class="text">Seconds</p>
        </div>
      </div>
    </div>
    <a
      v-show="dataStr"
      :href="dataStr"
      ref="file"
      download="claiming-information.json"
      style="display:none"
    />
  </NavigationCard>
</template>

<script>
import { mapState } from 'vuex'
import { createExportClaimingFile, openInExternalApp } from '@/utils'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  components: {
    NavigationCard,
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
    openExternalLink: async url => {
      await openInExternalApp(url)
    },
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
    }),
    dataStr() {
      return this.claimingFileInfo
        ? `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(
              createExportClaimingFile(
                this.claimingFileInfo.info,
                this.claimingAddresses,
                this.disclaimers
              )
            )
          )}`
        : ''
    },
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
  margin-top: 24px;
  border-top: 1px solid $font-color-light;
  background: $grey-0;
  .countdown-header {
    margin-top: 16px;
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
    font-weight: 700px;
    .text {
      color: $font-color-light;
      margin-top: 24px;
      font-size: 20px;
      margin-bottom: 16px;
      text-align: center;
    }

    .digit {
      color: $font-color-light;
      font-size: 50px;
      font-weight: 700px;
      margin: 10px;
      text-align: center;
    }
  }
}
.text {
  margin-bottom: 8px;
}
.e-mail {
  margin-top: 24px;
  text-align: center;
  color: $blue-6;
}
.download-again {
  margin-bottom: 24px;
  text-align: center;
  font-style: italic;
  color: $grey-3;
}
.underline {
  color: $font-color-light;
  text-decoration: underline;
  cursor: pointer;
}
.bold {
  font-weight: bold;
  margin-bottom: 16px;
}
</style>

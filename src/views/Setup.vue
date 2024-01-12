<template>
  <div class="container">
    <div class="center">
      <div class="header">
        <div class="filling-icon">
          <font-awesome-icon
            v-if="
              setupMessage === 'Updating wallet backend' ||
              setupMessage === 'wallet up to date'
            "
            class="icon"
            icon="wallet"
          />
          <font-awesome-icon
            v-if="setupMessage === 'Running wallet'"
            class="icon"
            icon="cogs"
          />
          <font-awesome-icon
            v-if="setupMessage === 'loaded'"
            class="icon"
            icon="check"
          />
          <div class="banner" />
        </div>
        <div>
          <p class="progress-title">{{ $t('preparing_sheikah') }}</p>
          <p class="progress-subtitle">
            {{ format(percentage) }}
            <DotsLoading
              v-if="!synced && theme === THEMES.DARK"
              color="#d6d6d6"
              data-test="loading-spinner"
              class="spinner"
            />
            <DotsLoading
              v-if="!synced && theme === THEMES.LIGHT"
              color="#444258"
              data-test="loading-spinner"
              class="spinner"
            />
          </p>
        </div>
      </div>
      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="percentage"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { THEMES } from '@/constants'
import DotsLoading from '@/components/DotsLoading.vue'

export default {
  name: 'WalletNotFound',
  components: {
    DotsLoading,
  },
  data() {
    return {
      THEMES,
    }
  },
  computed: {
    ...mapState({
      setupMessage: state => state.uiInteractions.setupMessage,
      progress: state => state.uiInteractions.setupProgress,
      theme: state => state.wallet.theme,
    }),
    percentage() {
      if (this.setupMessage === 'Updating wallet backend') {
        return Math.round(this.progress * 0.8)
      } else if (this.setupMessage === 'wallet up to date') {
        return 80
      } else if (this.setupMessage === 'Running wallet') {
        return 90
      } else if (this.setupMessage === 'loaded') {
        return 100
      } else {
        return 0
      }
    },
  },
  beforeUnmount() {
    this.cleanMessage()
  },
  methods: {
    ...mapMutations({
      cleanMessage: 'cleanMessage',
    }),
    format(percentage) {
      if (percentage <= 80) {
        return this.$t('updating_wallet')
      } else if (percentage <= 90) {
        return this.$t('running_wallet')
      } else if (percentage > 90) {
        return this.$t('connecting_to_wallet')
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.container {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  .center {
    min-width: 500px;

    .header {
      align-items: center;
      column-gap: 32px;
      display: grid;
      grid-template-columns: 100px 1fr;
      justify-items: left;
      margin-bottom: 24px;

      .filling-icon {
        align-items: center;
        display: flex;
        justify-content: center;

        .icon {
          color: var(--app-background-color);
          font-size: 50px;
          position: absolute;
          z-index: 100;
        }
      }

      .progress-title {
        color: var(--text-medium-emphasis);
        font-size: 24px;
        line-height: 1.3;
      }

      .progress-subtitle {
        color: var(--text-medium-emphasis);
        display: flex;
        margin-top: 8px;
      }
    }
  }
}

.banner {
  background: var(--progress-icon);
  border: 4px solid var(--progress-icon);
  border-radius: 50%;
  height: 100px;
  overflow: hidden;
  position: relative;
  width: 100px;
}
</style>

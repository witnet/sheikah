<template>
  <div class="container">
    <div class="center">
      <div class="header">
        <div class="filling-icon">
          <font-awesome-icon
            v-if="isWalletUpdating || isWalletUpToDate"
            class="icon"
            icon="wallet"
          />
          <font-awesome-icon
            v-if="isWalletRunning || !setupMessage"
            class="icon"
            icon="cogs"
          />
          <font-awesome-icon v-if="isWalletLoaded" class="icon" icon="check" />
          <div class="banner" />
        </div>
        <div>
          <p class="progress-title">{{ $t('preparing_sheikah') }}</p>
          <p class="progress-subtitle">
            {{ format(percentage) }}
            <DotsLoading
              v-if="isThemeDark"
              color="#d6d6d6"
              data-test="loading-spinner"
              class="spinner"
            />
            <DotsLoading
              v-if="isThemeLight"
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

<script setup lang="ts">
import { THEMES } from '@/constants'
import DotsLoading from '@/components/DotsLoading.vue'
import { checkDisconnection } from '@/services/checkDisconnection'
import { SetupMessages } from '@/types'
import { useStore } from 'vuex'
import { watch, computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const store = useStore()
const router = useRouter()
const { t } = useI18n()

const { setupMessage, setupProgress } = toRefs(store.state.uiInteractions)
const { theme } = toRefs(store.state.wallet)

const isWalletRunning = computed(
  () => setupMessage.value === SetupMessages.runningWallet,
)
const isWalletLoaded = computed(
  () => setupMessage.value === SetupMessages.loaded,
)
const isWalletUpToDate = computed(
  () => setupMessage.value === SetupMessages.walletUpToDate,
)
const isWalletUpdating = computed(
  () => setupMessage.value === SetupMessages.updatingWalletBackend,
)
const isThemeLight = computed(
  () => store.state.uiInteractions.theme === THEMES.LIGHT,
)
const isThemeDark = computed(() => theme.value === THEMES.DARK)
const percentage = computed(() => {
  if (isWalletUpdating.value) {
    return Math.round(setupProgress.value * 0.8)
  } else if (isWalletUpToDate.value) {
    return 80
  } else if (isWalletRunning.value) {
    return 90
  } else if (isWalletLoaded.value) {
    return 100
  } else {
    return 0
  }
})
watch(percentage, val => {
  return val === 100 ? checkDisconnection(router, store) : null
})

function format(percentage: number) {
  if (percentage <= 80) {
    return t('updating_wallet')
  } else if (percentage <= 90) {
    return t('running_wallet')
  } else if (percentage > 90) {
    return t('connecting_to_wallet')
  }
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

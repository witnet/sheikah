<template>
  <el-config-provider
    namespace="el"
    :locale="LANGUAGES[$i18n.locale as LocaleCodes].elementLocale"
  >
    <div id="app">
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
    <Notification />
    <ResyncConfirmation v-if="isResyncConfirmationVisible" />
    <LogoutModal v-if="sessionExpired" />
    <DescriptionModal v-if="isWalletDescriptionVisible" />
    <RenameConfirmation v-if="isRenameWalletConfirmationVisible" />
    <DeleteWalletConfirmation v-if="isDeleteWalletConfirmationVisible" />
    <ExportXprvModal v-if="isExportXprvQrVisible" />
  </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { ElConfigProvider } from 'element-plus'
import Notification from '@/components/Notification.vue'
import LogoutModal from '@/components/LogoutModal.vue'
import DescriptionModal from '@/components/DescriptionModal.vue'
import RenameConfirmation from '@/components/RenameConfirmation.vue'
import DeleteWalletConfirmation from '@/components/DeleteWalletConfirmation.vue'
import { ref, watch, onMounted, onBeforeUnmount, type Ref, toRefs } from 'vue'
import { LANGUAGES } from '@/constants'
import { useRoute, useRouter } from 'vue-router'
import { type LocaleCodes } from '@/types'
import { useIdle } from '@vueuse/core'
import { listenIpcMainEvents } from '@/services/handleIpcEvents'

const loading = ref(true)
const transitionName: Ref<string> = ref('no-transition')
const route = useRoute()
const router = useRouter()
let polling: null | ReturnType<typeof setInterval>

const store = useStore()
const { idle } = useIdle(5 * 60 * 1000) // 5 min
const { sessionWillExpireSoon } = toRefs(store.state.wallet)

watch(sessionWillExpireSoon, willExpire => {
  if (willExpire && !idle.value) {
    store.dispatch('refreshSession')
  }
})
watch(route, (to, from) => {
  loading.value = false
  if (to.path.includes('/settings') || from.path.includes('/settings')) {
    transitionName.value = 'zoom'
  } else {
    transitionName.value = 'no-transition'
  }
})
onMounted(() => {
  pollData()
  store.dispatch('getTheme')
  store.dispatch('getNotifications')
  store.dispatch('getUnit')
  store.commit('setInitialLocale')
  // Disable back and forward from keyboard and mouse buttons
  window.onpopstate = function (event) {
    event.stopImmediatePropagation()
  }
  listenIpcMainEvents({ store, router })
})
onBeforeUnmount(() => {
  if (polling) {
    clearInterval(polling)
  }
})
const pollData = () => {
  polling = setInterval(() => {
    store.commit('checkNetworkStatus')
  }, 3000)
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
@import '@/styles/app.global.scss';

.zoom-enter-active {
  animation: zoom 0.2s;
}

.zoom-leave-active {
  animation: zoom 0.2s reverse;
}

@keyframes zoom {
  0% {
    opacity: 0;
    transform: scale3d(0.9, 0.9, 0.9);
  }

  50% {
    opacity: 0.5;
    transform: scale3d(1, 1, 1);
  }

  100% {
    opacity: 1;
    transform: none;
  }
}

.app {
  min-height: 100vh;
  min-width: 100vw;
}
</style>

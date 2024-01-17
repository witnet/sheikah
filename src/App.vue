<template>
  <el-config-provider
    namespace="el"
    :locale="LANGUAGES[$i18n.locale as LocaleCodes].elementLocale"
  >
    <div id="app">
      <!-- TODO: use transition -->
      <!-- <transition :name="transitionName"> -->
      <router-view />
    <!-- </transition> -->
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
// import { mapMutations, mapActions, mapState } from 'vuex'
import { useStore } from 'vuex'
import { ElConfigProvider } from 'element-plus'
import Notification from '@/components/Notification.vue'
import LogoutModal from '@/components/LogoutModal.vue'
import DescriptionModal from '@/components/DescriptionModal.vue'
import RenameConfirmation from '@/components/RenameConfirmation.vue'
import DeleteWalletConfirmation from '@/components/DeleteWalletConfirmation.vue'
import { ref, watch, onMounted, onBeforeUnmount, type Ref, toRefs } from 'vue'
import { LANGUAGES } from '@/constants'
import { useRoute } from 'vue-router'
// import { useI18n } from 'vue-i18n'
import { type LocaleCodes } from '@/types'
// import { localStorageWrapper } from '@/main'

const loading = ref(true)
const polling = ref()
const transitionName: Ref<null | string> = ref(null)
const route = useRoute()
// const { locale } = useI18n()

const store = useStore()
console.log('aaaaas start!!!')
console.log(store)

const { sessionWillExpireSoon, isIdle } = toRefs(store.state.wallet)

watch(sessionWillExpireSoon, willExpire => {
  if (willExpire && !isIdle.value) {
    store.commit('refreshSession')
  }
})
watch(route, (to, from) => {
  loading.value = false
  if (to.path.includes('/settings') || from.path.includes('/settings')) {
    transitionName.value = 'zoom'
  } else {
    transitionName.value = null
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
})
onBeforeUnmount(() => {
  clearInterval(polling.value)
})
const pollData = () => {
  polling.value = setInterval(() => {
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

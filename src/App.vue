<template>
  <el-config-provider namespace="el">
    <div id="app">
      <!-- TODO: use transition -->
      <!-- <transition :name="transitionName"> -->
        <router-view />
      <!-- </transition> -->
      <Notification />
      <ResyncConfirmation />
      <LogoutModal />
      <DescriptionModal />
      <RenameConfirmation />
      <DeleteWalletConfirmation />
    </div>
  </el-config-provider>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import Notification from '@/components/Notification.vue'
import LogoutModal from '@/components/LogoutModal.vue'
import DescriptionModal from '@/components/DescriptionModal.vue'
import RenameConfirmation from '@/components/RenameConfirmation.vue'
import DeleteWalletConfirmation from '@/components/DeleteWalletConfirmation.vue'

export default {
  name: 'App',
  components: {
    Notification,
    LogoutModal,
    DescriptionModal,
    RenameConfirmation,
    DeleteWalletConfirmation,
    ResyncConfirmation: () => import('@/components/ResyncConfirmation.vue'),
  },
  data() {
    return {
      loading: true,
      polling: null,
      transitionName: null,
    }
  },
  computed: {
    ...mapState({
      sessionWillExpireSoon: state => state.wallet.sessionWillExpireSoon,
      isIdle: state => state.idleVue.isIdle,
    }),
  },
  watch: {
    sessionWillExpireSoon(willExpire) {
      if (willExpire && !this.isIdle) {
        this.refreshSession()
      }
    },
    $route: function (to, from) {
      this.loading = false
      if (to.path.includes('/settings') || from.path.includes('/settings')) {
        this.transitionName = 'zoom'
      } else {
        this.transitionName = null
      }
    },
  },
  async created() {
    this.pollData()
    this.getTheme()
    this.getNotifications()
    this.getUnit()
    this.getLocale({ i18n: this.$i18n })
    // Disable back and forward from keyboard and mouse buttons
    window.onpopstate = function (event) {
      event.stopImmediatePropagation()
    }
  },
  beforeUnmount() {
    clearInterval(this.polling)
  },
  methods: {
    ...mapMutations({
      checkNetworkStatus: 'checkNetworkStatus',
      deleteSession: 'deleteSession',
    }),
    ...mapActions({
      refreshSession: 'refreshSession',
      getWalletInfos: 'getWalletInfos',
      getNotifications: 'getNotifications',
      getTheme: 'getTheme',
      getUnit: 'getUnit',
      getLocale: 'getLocale',
    }),
    pollData() {
      this.polling = setInterval(() => {
        this.checkNetworkStatus()
      }, 3000)
    },
  },
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

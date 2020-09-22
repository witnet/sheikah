<template>
  <transition name="slide">
    <div class="notification">
      <p class="text">There is an available update</p>
      <div class="buttons">
        <el-button
          type="text"
          class="notify"
          @click="openInExternalApp(sheikahWebsite)"
          >Download update</el-button
        >
        <el-button type="text" class="notify" @click="clearUpdateNotification"
          >Later</el-button
        >
      </div>
    </div>
  </transition>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapState, mapMutations } from 'vuex'
import { openInExternalApp } from '@/utils'
import { EXTERNAL_URL } from '@/constants'
export default {
  name: 'UpdateNotification',
  computed: {
    ...mapState({
      message: state => state.uiInteractions.updateNotificationMessage,
    }),
    sheikahWebsite() {
      return EXTERNAL_URL.SHEIKAH_WEBSITE
    },
  },
  methods: {
    openInExternalApp,
    ...mapMutations({
      clearUpdateNotification: 'clearUpdateNotification',
    }),
    restartApp() {
      console.log('click')
      ipcRenderer.send('restart_app')
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.slide-enter-active {
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  opacity: 1;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.notification {
  background-color: $alt-grey-5;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding: 16px 16px;
  position: fixed;
  width: 100%;
  z-index: 20;

  .text {
    color: $white;
    font-size: 14px;
    margin-right: 16px;
  }
}
</style>

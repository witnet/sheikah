<template>
  <transition name="slide">
    <div class="notification">
      <p class="text">{{ updateNotificationMessage }}</p>
      <div class="buttons">
        <el-button type="text" class="notify" @click="handleClick">{{
          btnMessage
        }}</el-button>
        <el-button
          v-if="isRestartMsg"
          type="text"
          class="notify"
          @click="clearUpdateNotification"
          >Later</el-button
        >
      </div>
    </div>
  </transition>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapState, mapMutations } from 'vuex'
import { RE_START_MSG } from '@/constants'
export default {
  name: 'Tag',
  computed: {
    ...mapState({
      updateNotification: state => state.uiInteractions.updateNotification,
      updateNotificationMessage: state =>
        state.uiInteractions.updateNotificationMessage,
    }),
    btnMessage() {
      return this.isRestartMsg ? 'Restart' : 'Close'
    },
    isRestartMsg() {
      return this.updateNotificationMessage === RE_START_MSG
    },
  },
  methods: {
    ...mapMutations({
      clearUpdateNotification: 'clearUpdateNotification',
      toggleUpdateNotification: 'toggleUpdateNotification',
    }),
    restartApp() {
      console.log('click')
      ipcRenderer.send('restart_app')
    },
    handleClick() {
      this.isRestartMsg ? this.restartApp() : this.clearUpdateNotification()
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

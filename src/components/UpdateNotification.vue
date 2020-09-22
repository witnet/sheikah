<template>
  <transition name="slide">
    <div v-if="updateNotification" class="container">
      <p class="text">{{ updateNotificationMessage }}</p>
      <div class="btn-container">
        <el-button type="text" class="notify" @click="handleClick">{{
          btnMessage
        }}</el-button>
        <el-button
          v-if="isRestartMsg"
          type="text"
          class="notify"
          @click="clearUpdateNotification"
          >Close</el-button
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

.container {
  align-items: center;
  background-color: $alt-grey-5;
  border-radius: 4px;
  bottom: 40px;
  display: flex;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  right: 0;
  width: max-content;

  .text {
    color: $white;
    font-size: 14px;
    padding: 8px 16px;
    width: 400px;
  }

  .btn-container {
    padding: 8px 16px;
  }
}
</style>

<template>
  <transition name="slide">
    <div v-if="toggle" class="notification">
      <p class="message">
        <font-awesome-icon class="icon" :icon="icon" :style="{ color }" />
        {{ message }}
      </p>
    </div>
  </transition>
</template>

<script>
/**
 * Notification component that appears when called
 */
export default {
  name: 'Notification',
  data() {
    return {
      toggle: false,
      message: '',
      // number of active triggered notifications
      counter: 0,
      color: '',
      icon: '',
    }
  },
  mounted() {
    // TODO: https://vuejs.org/api/application.html#app-config-globalproperties
    // Vue.prototype.$notify = this.show
  },
  methods: {
    show(payload) {
      this.message = payload.message
      this.color = payload.color
      this.icon = payload.icon
      this.toggle = true
      this.counter += 1

      setTimeout(() => {
        this.$emit('vanish')
        this.counter -= 1
        this.toggle = this.counter !== 0
      }, 4000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

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
  border-radius: 4px;
  bottom: 40px;
  display: flex;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  right: 0;
  width: max-content;

  .message {
    color: $white;
    font-size: 14px;
    padding: 4px 8px;

    .icon {
      color: $green-5;
      margin-right: 8px;
    }
  }
}
</style>

<template>
  <transition name="slide">
    <div v-if="toggle" class="notification">
      <p class="message">{{ message }}</p>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'

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
    }
  },
  mounted() {
    Vue.prototype.$notify = this.show
  },
  methods: {
    show(message) {
      this.message = message
      this.toggle = true
      this.counter += 1

      setTimeout(() => {
        console.log('inside settimeout')
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
  }
}
</style>

<docs>
### Example

```jsx
  <Notification />
```
</docs>

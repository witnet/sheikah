<template>
  <transition name="slide">
    <div v-if="toggle" class="notification">
      <p class="message">{{ message }}</p>
    </div>
  </transition>
</template>

<script>
/**
 * Button that helps generate Addresses.
 */
export default {
  name: 'Notification',
  props: {
    message: {
      required: true,
      type: String,
    },
    toggle: {
      required: true,
      type: Boolean,
    },
  },
  created() {
    setTimeout(() => {
      this.$emit('vanish')
    }, 4000)
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.slide-enter-active {
  transition-duration: 1s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 1s;
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

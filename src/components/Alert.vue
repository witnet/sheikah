<template>
  <div
    v-if="message"
    data-test="alert"
    class="alert"
    :class="[type, { closed }]"
  >
    <div v-if="message" class="message">
      <p class="text">{{ message }}</p>
      <font-awesome-icon class="icon cross" icon="times" @click="close" />
    </div>
    <div v-if="description" class="description">
      <p class="text">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: function(value) {
        return ['success', 'error', 'info', 'warning'].includes(value)
      },
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      closed: false,
    }
  },
  methods: {
    close() {
      this.closed = true
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.alert {
  border-radius: 4px;
  padding: 8px 16px;
  transition: opacity 0.2s;
  width: 100%;

  .message {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .cross {
      color: $alt-grey-5;
      cursor: pointer;
      font-size: 12px;
    }

    .text {
      font-size: 14px;
      font-weight: bold;
    }
  }

  .description {
    .text {
      font-size: 13px;
    }
  }

  &.closed {
    display: none;
  }

  &.error {
    background-color: $red-0;

    .text {
      color: $red-2;
    }
  }

  &.success {
    background-color: $green-0;

    .text {
      color: $green-5;
    }
  }

  &.info {
    background-color: $grey-1;

    .text {
      color: $alt-grey-5;
    }
  }

  &.warning {
    background-color: $orange-0;

    .text {
      color: $orange-2;
    }
  }
}
</style>

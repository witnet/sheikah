<template>
  <div class="alert" :class="[type, { closed }]">
    <div class="message">
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
      required: false,
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
.alert {
  width: 100%;
  padding: 8px 16px;
  transition: opacity 0.2s;
  border-radius: 4px;

  .message {
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;

    .cross {
      color: #616161;
      font-size: 12px;
      cursor: pointer;
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
    background-color: #fef0f0;

    .text {
      color: #f56c6c;
    }
  }

  &.success {
    background-color: #f0f9eb;

    .text {
      color: #67c23a;
    }
  }

  &.info {
    background-color: #f4f4f5;

    .text {
      color: #909399;
    }
  }

  &.warning {
    background-color: #fdf6ec;

    .text {
      color: #e6a23c;
    }
  }
}
</style>

<template>
  <FrameOutside @click="onClose" @focus="onClose">
    <div class="title" @click="allowOpen">
      <div
        v-show="!showInput"
        ref="editable"
        data-test="edit-var"
        @click="allowEdit"
      >
        {{ value }}
      </div>
      <el-input
        data-test="edit-var-input"
        :class="[error]"
        class="editVar"
        :placeholder="placeholder"
      />
      <font-awesome-icon v-show="!showInput" class="edit-btn" icon="edit" />
    </div>
  </FrameOutside>
</template>

<script>
import FrameOutside from '@/components/FrameOutside'
export default {
  name: 'EditableText',
  components: {
    FrameOutside,
  },
  props: {
    error: Boolean,
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
    blockOpen: Boolean,
  },
  data() {
    return {
      showInput: false,
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(inputValue) {
        this.$emit('input', inputValue)
      },
    },
  },
  watch: {
    inputValue(value) {
      this.$emit('input', value)
    },
  },
  methods: {
    allowEdit() {
      if (this.blockOpen && !this.showInput) {
        this.showInput = false
      } else {
        this.showInput = !this.showInput
      }
    },
    allowOpen() {
      if (this.blockOpen && !this.showInput) {
        this.showInput = false
      } else {
        this.showInput = true
      }
    },
    onClose() {
      if (this.error) {
        this.showInput = true
        this.showError = true
      } else {
        if (this.showInput) {
          this.$emit('close', this.inputValue)
        }
        this.showInput = false
        this.showError = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.title {
  align-items: center;
  color: $alt-grey-1;
  display: flex;
  font-size: 16px;
  justify-content: center;

  .editVar {
    width: 80px;

    &.error {
      border-bottom: 1px solid $red-5;
      color: $red-5;
    }
  }

  .edit-btn {
    margin-left: 8px;
    opacity: 0;
  }

  &:hover {
    .edit-btn {
      color: $alt-grey-1;
      font-size: 16px;
      opacity: 1;
      padding-left: 8px;
    }
  }
}
</style>

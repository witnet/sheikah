<template>
  <FrameOutside @click="onClose" @focus="onClose">
    <div class="title" @click="allowOpen">
      <div data-test="edit-var" ref="editable" v-show="!showInput" @click="allowEdit">
        {{ value }}
      </div>
      <el-input
        size="mini"
        data-test="edit-var-input"
        v-show="showInput"
        :class="[error]"
        class="editVar"
        v-model="inputValue"
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
    placeholder: String,
    value: {
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
  watch: {
    inputValue(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.title {
  font-size: 16px;
  color: $alt-grey-1;
  display: flex;
  align-items: center;
  justify-content: center;
  .editVar {
    width: 80px;
    &.error {
      color: $red-5;
      border-bottom: 1px solid $red-5;
    }
  }
  .edit-btn {
    margin-left: 8px;
    opacity: 0;
  }
  &:hover {
    .edit-btn {
      padding-left: 8px;
      opacity: 1;
      font-size: 16px;
      color: $alt-grey-1;
    }
  }
}
</style>

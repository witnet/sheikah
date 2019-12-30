<template>
  <FrameOutside @click="onClose" @focus="onClose">
    <div class="title" @click="allowOpen">
      <div ref="editable" v-show="!showInput" @click="allowEdit">
        {{ value }}
      </div>
      <input
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
  color: $grey-1;
  display: flex;
  align-items: center;
  .editVar {
    background-color: transparent;
    font-size: 1em;
    width: 80px;
    border: none;
    color: $grey-1;
    border-bottom: 1px solid $grey-1;
    &.error {
      color: $red-1;
      border-bottom: 1px solid $red-1;
    }
  }
  .edit-btn {
    display: none;
  }
  &:hover {
    .edit-btn {
      padding-left: 8px;
      display: block;
      font-size: 16px;
      color: $grey-1;
    }
  }
}
</style>

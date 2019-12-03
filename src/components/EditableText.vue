<template>
  <div class="title" @click="showInput = true">
    <div ref="editable" v-show="!showInput" @click="showInput = !showInput">
      {{ name }}
    </div>
    <input
      v-show="showInput"
      class="editVar"
      v-model="inputValue"
      :placeholder="placeholder"
      v-closable="{ exclude: ['editable'], handler: 'onClose' }"
    />
    <font-awesome-icon v-show="!showInput" class="edit-btn" icon="edit" />
  </div>
</template>

<script>
export default {
  name: 'EditableText',
  props: {
    name: String,
    placeholder: String,
    value: {
      required: true,
    },
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
    onClose() {
      this.showInput = false
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
  color: #c5c2c2;
  display: flex;
  align-items: center;
  .editVar {
    background-color: transparent;
    font-size: 1em;
    width: 80px;
    border: none;
    color: #c5c2c2;
    border-bottom: 1px solid #c5c2c2;
  }
  .edit-btn {
    display: none;
  }
  &:hover {
    .edit-btn {
      padding-left: 8px;
      display: block;
      font-size: 16px;
      color: #c5c2c2;
    }
  }
}
</style>

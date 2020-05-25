<template>
  <div class="container">
    <input
      ref="passInput"
      v-model="passwordValue"
      data-test="password"
      type="password"
      class="input"
      :placeholder="label"
      name="password"
      @keydown.enter.esc.prevent="toogleGoNextItem"
    />
    <label for="password" class="label">{{ label }}</label>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PasswordInput',
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
  },
  computed: {
    passwordValue: {
      get() {
        return this.value
      },
      set(passwordValue) {
        this.$emit('input', passwordValue)
      },
    },
  },
  watch: {
    passwordValue(passwordValue) {
      this.clearError({ error: this.error })
      this.$emit('input', passwordValue)
    },
  },
  methods: {
    ...mapMutations({
      clearError: 'clearError',
    }),
    toogleGoNextItem() {
      this.$emit('go-next')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.container {
  margin: 0;
  padding: 8px 0 0;
  position: relative;
}

.label {
  color: $alt-grey-3;
  display: block;
  font-size: 1rem;
  position: absolute;
  top: 0;
  transition: 0.2s;
}

.input {
  background: transparent;
  border: 0;
  border-bottom: 1px solid $alt-grey-5;
  color: $alt-grey-5;
  font-size: 16px;
  font-weight: 700;
  outline: 0;
  padding: 16px 0;
  transition: border-color 0.2s;
  width: 300px;
  z-index: 1000;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .label {
    cursor: text;
    top: 20px;
  }

  &:hover {
    cursor: text;
  }
}

.input:focus {
  border-bottom: 1.7px solid $alt-grey-3;
  border-image: linear-gradient(to right, $purple-4);
  border-image-slice: 1;
  border-width: 2px;
  font-weight: 700;

  ~ .label {
    color: $purple-4;
    display: block;
    font-size: 1rem;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    top: 0;
    transition: 0.2s;
  }
}
</style>

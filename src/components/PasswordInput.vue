<template>
  <div class="container">
    <input
      data-test="password"
      @keydown.enter.esc.prevent="toogleGoNextItem"
      ref="passInput"
      type="password"
      class="input"
      :placeholder="label"
      name="password"
      v-model="passwordValue"
    />
    <label for="password" class="label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: {
    value: String,
    label: String,
    error: String,
  },
  methods: {
    toogleGoNextItem() {
      this.$emit('go-next')
    },
    clearError(errorName) {
      this.$store.commit('clearError', { error: errorName })
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
      this.clearError(this.error)
      this.$emit('input', passwordValue)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
.container {
  position: relative;
  padding: 8px 0 0;
  margin: 0;
}

.input {
  z-index: 1000;
  font-size: 16px;
  width: 300px;
  border: 0;
  border-bottom: 1px solid $alt-grey-5;
  outline: 0;
  padding: 16px 0;
  color: $alt-grey-5;
  font-weight: 700;
  background: transparent;
  transition: border-color 0.2s;

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

.label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $alt-grey-3;
}

.input:focus {
  ~ .label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $purple-4;
    font-weight: 700;
    font-size: 16px;
  }
  border-bottom: 1.7px solid $alt-grey-3;
  font-weight: 700;
  border-width: 2px;
  border-image: linear-gradient(to right, $purple-4);
  border-image-slice: 1;
}
</style>

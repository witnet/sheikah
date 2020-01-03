<template>
  <div class="container">
    <input
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
    password: String,
    label: String,
  },
  computed: {
    passwordValue: {
      get() {
        console.log('3', this.password)
        return this.password
      },
      set(passwordValue) {
        this.$emit('password', passwordValue)
      },
    },
  },
  watch: {
    passwordValue(passwordValue) {
      this.$emit('password', passwordValue)
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
  font-size: 16px;
  width: 300px;
  border: 0;
  border-bottom: 1.5px solid $grey-3;
  outline: 0;
  padding: 8px 0;
  color: $grey-5;
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
  color: $grey-4;
}

.input:focus {
  ~ .label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $blue-6;
    font-weight: 700;
    font-size: 16px;
  }
  padding-bottom: 6px;
  border-bottom: 1.7px solid $grey-4;
  font-weight: 700;
  border-width: 2px;
  border-image: linear-gradient(to right, $blue-6);
  border-image-slice: 1;
}
</style>

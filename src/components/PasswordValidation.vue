<template>
  <div>
    <p class="paragraph">
      <span class="bold">{{ opening }}</span> {{ text }}
    </p>
    <div class="form-row">
      <p class="label">{{ $t('create_password') }}</p>
      <el-input
        v-model="password"
        v-focus
        class="input-password"
        data-test="password"
        :placeholder="$t('input_password')"
        show-password
      />
    </div>
    <div ref="confirm" class="form-row password">
      <p class="label">{{ $t('confirm_password') }}</p>
      <el-input
        ref="password"
        v-model="repeatedPassword"
        class="input-password"
        data-test="repeated-password"
        :placeholder="$t('confirm_password')"
        show-password
        @keydown.enter="validate"
      />
    </div>
    <div v-if="error" data-test="password-error-alert" class="error">
      {{ error.message }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PasswordValidation',
  props: {
    /**
     * Opening line of the description text which should be bold
     */
    opening: {
      required: true,
      type: String,
    },
    /**
     * Description text
     */
    text: {
      required: true,
      type: String,
    },
    /**
     * Validation error
     */
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      password: '',
      repeatedPassword: '',
    }
  },
  computed: {
    ...mapState({
      validatedPassword: state => state.wallet.validatedPassword,
    }),
  },
  watch: {
    password() {
      if (this.error) {
        this.clearError({ error: this.error.name })
      }
      this.$emit('input-password', this.password, this.repeatedPassword)
    },
    error(error) {
      if (error) {
        this.$emit('disable-next-button')
      }
    },
    repeatedPassword() {
      if (this.error) {
        this.clearError({ error: this.error.name })
      }
      this.$emit('input-password', this.password, this.repeatedPassword)
    },
  },
  beforeUnmount() {
    if (this.error) {
      this.clearError({ error: this.error.name })
    }
  },
  methods: {
    ...mapMutations({
      validatePassword: 'validatePassword',
      clearError: 'clearError',
    }),
    clearInput() {
      this.password = ''
      this.repeatedPassword = ''
    },
    validate() {
      this.$emit('validate')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/scroll.scss';

.error {
  color: $red-2;
  font-size: 14px;
  min-width: 270px;
  position: relative;
  margin-top: 16px;
}

.paragraph {
  margin-bottom: 24px;
  word-break: break-word;
}

.form-row {
  align-self: center;
  column-gap: 8px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-bottom: 8px;

  .input-password {
    align-self: center;
  }

  .label {
    align-self: center;
  }

  &.form-row:last-of-type {
    margin: 0;
  }
}

.bold {
  font-weight: bold;
}
</style>

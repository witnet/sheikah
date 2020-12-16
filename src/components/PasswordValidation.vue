<template>
  <div>
    <p class="paragraph">
      <span class="bold">{{ opening }}</span> {{ text }}
    </p>
    <div class="form-row password">
      <p>Create a password</p>
      <el-input
        v-model="password"
        v-focus
        class="password"
        data-test="password"
        placeholder="Please input password"
        show-password
      />
    </div>
    <div ref="confirm" class="form-row password">
      <p>Confirm your password</p>
      <div class="col">
        <el-input
          ref="password"
          v-model="repeatedPassword"
          class="password"
          data-test="repeated-password"
          placeholder="Confirm password"
          show-password
          @keydown.enter.native="validate"
        />
        <div v-if="error" data-test="password-error-alert" class="error">
          {{ error.message }}
        </div>
      </div>
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
  methods: {
    ...mapMutations({
      validatePassword: 'validatePassword',
      clearError: 'clearError',
    }),
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
  margin-top: 8px;
  min-width: 270px;
  position: absolute;
}

.paragraph {
  margin-bottom: 24px;
  word-break: break-word;
}

.form-row {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 24px;
  max-width: 500px;

  &.password {
    display: flex;
    justify-content: space-between;
    max-width: 550px;
  }

  &.form-row:last-of-type {
    margin: 0;
  }

  .password {
    width: 350px;
  }
}

.bold {
  font-weight: bold;
}
</style>

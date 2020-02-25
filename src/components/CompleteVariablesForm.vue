<template>
  <div data-test="variables-dr-form" class="variables-container">
    <div class="title">Add custom values for the template variables</div>
    <div v-for="(variable, index) in variables" :key="index" class="variable">
      <p class="label variable-value">$</p>
      <div class="variable-value">
        {{ keys[index] }}
      </div>
      <Input
        data-test="variable-value-input"
        class="variable-value"
        :value="variable.value"
        @input="val => updateVariable(index, variable.key, val)"
      />
      <div class="error" v-show="errors[index]">
        (This key is repeated. Change the variable name before continue editing)
      </div>
    </div>
    <div class="submit">
      <el-button
        @keydown.enter.esc.prevent="nextStep"
        data-test="complete-variables-submit"
        @click="nextStep"
        type="primary"
      >
        Continue
      </el-button>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input'
import Button from './Button'
import { UPDATE_VARIABLES } from '@/store/mutation-types'

export default {
  name: 'Variables',
  components: {
    Input,
    Button,
  },
  data() {
    return {
      errors: [],
      isOpen: [],
      keys: this.$store.getters.variablesKeys,
    }
  },
  methods: {
    nextStep() {
      this.$emit('go-to-next-step')
    },
    updateKey(index, key) {
      this.$set(this.keys, index, key)
      if (this.isRepeated(key) && !this.isRepeatedIndex(key, index)) {
        this.$set(this.errors, index, true)
      } else {
        this.$set(this.errors, index, false)
      }
    },
    handleCloseEvent(index, key, value) {
      this.$store.commit(UPDATE_VARIABLES, {
        index,
        key,
        value,
      })
    },
    updateVariable(index, key, value) {
      this.$store.commit(UPDATE_VARIABLES, {
        index,
        key,
        value,
      })
    },
    isRepeatedIndex(key, index) {
      const isSameindex = elm => elm.key === key
      return this.variables.findIndex(isSameindex) === index
    },
    isRepeated(key) {
      return !!this.variables.find(variable => variable.key === key)
    },
  },
  computed: {
    error() {
      return this.errorIndex !== -1
    },
    variablesKeys() {
      return this.$store.getters.variablesKeys
    },
    variables() {
      return this.$store.state.rad.currentTemplate.variables
    },
    errorIndex() {
      return this.errors.findIndex(error => !!error)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.variables-container {
  overflow-y: auto;
  .title {
    color: $grey-4;
    font-size: 18px;
    margin-bottom: 40px;
  }
  .variable {
    display: block;
    display: flex;
    justify-items: left;
    .variable-value {
      display: flex;
      font-size: 16px;
      align-items: center;
      color: $grey-4;
      margin: 10px;
      width: 80px;
      height: 30px;
      &.label {
        color: $blue-6;
        width: 40px;
        font-weight: bold;
      }
    }
  }
  .delete {
    display: flex;
    align-items: center;
    padding-left: 16px;
    font-size: 12px;
    &:hover {
      cursor: pointer;
    }
  }
  .error {
    display: flex;
    align-items: center;
    padding-left: 16px;
    color: $red-1;
  }
  .submit {
    width: 100%;
    text-align: right;
    padding-top: 40px;
  }
}
</style>

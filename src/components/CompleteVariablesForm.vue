<template>
  <div data-test="variables-dr-form" class="variables-container">
    <div v-for="(variable, index) in variables" :key="index" class="variable">
      <p class="label variable-value">$</p>
      <div class="variable-value">
        {{ keys[index] }}
      </div>
      <Input
        data-test="variable-value-input"
        class="variable-value"
        :value="variable.value"
        @input="val => updateVariable({ index, key: variable.key, value: val })"
      />
      <div v-show="errors[index]" class="error">
        (This key is repeated. Change the variable name before continue editing)
      </div>
    </div>
    <div class="submit">
      <el-button @click="goBack">Cancel</el-button>
      <el-button
        data-test="complete-variables-submit"
        type="primary"
        @keydown.enter.esc.prevent="nextStep"
        @click="nextStep"
      >
        Continue
      </el-button>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input'
import { UPDATE_VARIABLES } from '@/store/mutation-types'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Variables',
  components: {
    Input,
  },
  data() {
    return {
      errors: [],
      isOpen: [],
      keys: this.$store.getters.variablesKeys,
    }
  },
  computed: {
    ...mapState({
      variables: state => state.rad.currentTemplate.variables,
    }),
    ...mapGetters({
      variablesKeys: 'variablesKeys',
    }),
    error() {
      return this.errorIndex !== -1
    },
    errorIndex() {
      return this.errors.findIndex(error => !!error)
    },
  },
  methods: {
    ...mapMutations({
      updateVariables: UPDATE_VARIABLES,
    }),
    goBack() {
      this.$emit('go-back')
    },
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
    isRepeatedIndex(key, index) {
      const isSameindex = elm => elm.key === key
      return this.variables.findIndex(isSameindex) === index
    },
    isRepeated(key) {
      return !!this.variables.find(variable => variable.key === key)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.variables-container {
  overflow-y: auto;

  .variable {
    display: block;
    display: flex;
    justify-items: left;

    .variable-value {
      align-items: center;
      color: $alt-grey-3;
      display: flex;
      font-size: 16px;
      height: 30px;
      margin: 10px;
      width: 80px;

      &.label {
        color: $purple-4;
        font-weight: bold;
        width: 40px;
      }
    }
  }

  .delete {
    align-items: center;
    display: flex;
    font-size: 12px;
    padding-left: 16px;

    &:hover {
      cursor: pointer;
    }
  }

  .error {
    align-items: center;
    color: $red-5;
    display: flex;
    padding-left: 16px;
  }

  .submit {
    padding-top: 40px;
    text-align: right;
    width: 100%;
  }
}
</style>

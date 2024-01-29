<template>
  <div data-test="variables-dr-form" class="variables-container">
    <div v-for="(variable, index) in variables" :key="index" class="variable">
      <p class="label variable-value">$</p>
      <div class="variable-value">
        {{ keys[index] }}
      </div>
      <el-input
        data-test="variable-value-input"
        class="variable-value"
        :placeholder="variable.value"
        :model-value="variable.value"
        @update:model-value="
          val =>
            updateVariables({
              index,
              key: variable.key,
              value: val,
              description: variable.description,
              type: variable.type,
            })
        "
      />
      <div v-show="errors[index]" class="error">
        ({{ $t('repeated_variable_key') }})
      </div>
    </div>
    <div class="submit">
      <el-button @click="goBack">{{ $t('cancel') }}</el-button>
      <el-button
        data-test="complete-variables-submit"
        type="primary"
        @keydown.enter.esc.prevent="nextStep"
        @click="nextStep"
      >
        {{ $t('continue') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { UPDATE_VARIABLES } from '@/store/mutation-types'

export default {
  name: 'CompleteVariablesForm',
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
      this.keys[index] = key
      if (this.isRepeated(key) && !this.isRepeatedIndex(key, index)) {
        this.erros[index] = true
      } else {
        this.errors[index] = true
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
  padding-right: 24px;

  .variable {
    align-items: center;
    column-gap: 16px;
    display: block;
    display: grid;
    grid-template-columns: max-content max-content 1fr;
    margin: 16px 0;

    .variable-value {
      color: var(--text-medium-emphasis);
      font-size: 16px;
      overflow: hidden;

      &.label {
        color: var(--primary-color);
        font-weight: bold;
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
    color: $red-2;
    display: flex;
    padding-left: 16px;
  }

  .submit {
    margin-top: 32px;
    text-align: right;
    width: 100%;
  }
}
</style>

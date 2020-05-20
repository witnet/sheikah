<template>
  <div class="variables-container">
    <div v-for="(variable, index) in variables" :key="index" class="variable">
      <p class="label">$</p>
      <EditableText
        class="variable-value"
        :value="keys[index]"
        :error="errors[index]"
        :block-open="error"
        @close="key => updateVariables({ index, key, value: variable.value })"
        @input="key => updateKey(index, key)"
      />
      <el-input
        class="variable-value input"
        data-test="edit-var-value-input"
        :placeholder="variable.value"
        :value="variable.value"
        @input="
          val => updateVariables({ index, key: variable.key, value: val })
        "
      />
      <div v-show="errors[index]" class="error">
        (This key is repeated. Change the variable name before continue editing)
      </div>
      <div data-test="delete-var-btn" class="delete" @click="deleteVariable({ index })">
        <img src="@/resources/svg/close-btn.svg" />
      </div>
    </div>
    <div class="img-container">
      <img
        class="add-operator"
        src="@/resources/svg/add-operator.svg"
        @click="createVariable"
      />
      <p class="add-operator-text">Click to create another variable</p>
    </div>
  </div>
</template>

<script>
import {
  UPDATE_VARIABLES,
  CREATE_VARIABLE,
  DELETE_VARIABLE,
} from '@/store/mutation-types'
import EditableText from '@/components/EditableText'
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'Variables',
  components: {
    EditableText,
  },
  data() {
    return {
      errors: [],
      isOpen: [],
      keys: this.$store.getters.variablesKeys,
    }
  },
  computed: {
    ...mapGetters({
      variablesKeys: 'variablesKeys',
    }),
    ...mapState({
      variables: state => state.rad.currentTemplate.variables,
    }),
    error() {
      return this.errorIndex !== -1
    },
    errorIndex() {
      return this.errors.findIndex(error => !!error)
    },
  },
  watch: {
    variables() {
      this.keys = this.variablesKeys
    },
  },
  methods: {
    ...mapMutations({
      deleteVariable: DELETE_VARIABLE,
      createVariable: CREATE_VARIABLE,
      updateVariables: UPDATE_VARIABLES,
    }),
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
  color: $alt-grey-2;
  display: grid;
  row-gap: 16px;
  width: 100%;

  .variable {
    border: 1px solid $grey-2;
    display: block;
    display: flex;
    justify-items: left;
    padding: 24px;
    padding-left: 16px;
    position: relative;

    .label {
      color: $alt-grey-2;
      margin: 8px;
      padding-right: 5px;
    }

    .variable-value {
      display: flex;
      height: 20px;
      margin: 8px;

      &.input {
        width: 80px;
      }
    }
  }

  .delete {
    cursor: pointer;
    position: absolute;
    right: 8px;
    top: 8px;
  }

  .error {
    align-items: center;
    color: $red-5;
    display: flex;
    padding-left: 16px;
  }

  .img-container {
    cursor: pointer;
    display: flex;
    width: max-content;

    .add-operator-text {
      color: $grey-4;
      font-size: 12px;
      font-weight: medium;
      margin-left: 16px;
    }
  }
}
</style>

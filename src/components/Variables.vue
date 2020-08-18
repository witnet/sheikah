<template>
  <div class="variables-container">
    <div v-for="(variable, index) in variables" :key="index" class="variable">
      <label class="label" data-test="name-label">Name</label>
      <div class="variable-key">
        <p class="variable-icon">$</p>
        <el-input
          v-focus:[focusHandler(index,key)]
          class="key"
          data-test="edit-var-input"
          :value="keys[index]"
          :placeholder="keys[index]"
          @input="
            key =>
              updateKey({
                index,
                key,
                value: variable.value,
                description: variable.description,
                type: variable.type,
                variableField: key,
              })
          "
        />
        <div v-show="errors[index]" class="error" data-test="error">
          This key is repeated. Change the variable name before continue editing
        </div>
        <label class="label" data-test="type-label">Data type</label>
        <Select
          v-focus:[focusHandler(index,type)]
          data-test="select-type"
          :value="{ primaryText: variable.type }"
          :options="dataTypeOptions"
          @input="
            val =>
              updateVariables({
                index,
                key: variable.key,
                value: variable.value,
                description: variable.description,
                type: val.primaryText,
                variableField: type,
              })
          "
        />
      </div>
      <label class="label" data-test="value-label">Default value</label>
      <el-input
        v-focus:[focusHandler(index,value)]
        class="variable-value"
        data-test="edit-var-value-input"
        placeholder="The default String that this variable will take if an user does not override it"
        :value="variable.value"
        @input="
          val =>
            updateVariables({
              index,
              key: variable.key,
              value: val,
              description: variable.description,
              type: variable.type,
              variableField: value,
            })
        "
      />
      <label class="label" data-test="description-label">Description</label>
      <el-input
        v-focus:[focusHandler(index,description)]
        class="variable-value"
        data-test="edit-var-description-input"
        placeholder="Helps users of this template understand what this variable is used for"
        :value="variable.description"
        @input="
          val =>
            updateVariables({
              index,
              key: variable.key,
              value: variable.value,
              description: val,
              type: variable.type,
              variableField: description,
            })
        "
      />
      <el-tooltip content="Delete variable" placement="right" effect="light">
        <div
          class="delete"
          data-test="delete-var-btn"
          @click="deleteVariable({ index })"
        >
          <img src="@/resources/svg/close-btn.svg" />
        </div>
      </el-tooltip>
    </div>
    <div class="img-container" @click="createVariable">
      <img
        class="add-operator"
        data-test="add-variable"
        src="@/resources/svg/add-operator.svg"
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
import { mapGetters, mapState, mapMutations } from 'vuex'
import Select from '@/components/Select'

export default {
  name: 'Variables',
  components: {
    Select,
  },
  data() {
    return {
      errors: [],
      keys: this.$store.getters.variablesKeys,
      key: 'key',
      description: 'description',
      value: 'value',
      type: 'type',
    }
  },
  computed: {
    ...mapGetters({
      variablesKeys: 'variablesKeys',
    }),
    ...mapState({
      currentFocus: state => state.rad.currentFocus,
      variables: state => state.rad.currentTemplate.variables,
    }),
    error() {
      return this.errorIndex !== -1
    },
    errorIndex() {
      return this.errors.findIndex(error => !!error)
    },
    dataTypeOptions() {
      return [
        { primaryText: 'String' },
        { primaryText: 'Boolean' },
        { primaryText: 'Number' },
      ]
    },
  },
  watch: {
    variablesKeys() {
      this.keys = this.variablesKeys
    },
  },
  beforeDestroy() {
    this.$store.commit('clearCurrentFocus')
  },
  methods: {
    ...mapMutations({
      deleteVariable: DELETE_VARIABLE,
      createVariable: CREATE_VARIABLE,
      updateVariables: UPDATE_VARIABLES,
    }),
    focusHandler(index, field) {
      if (field === 'key') {
        return (
          this.currentFocus === index || this.currentFocus === `key_${index}`
        )
      } else if (field === 'value') {
        return this.currentFocus === `value_${index}`
      } else if (field === 'description') {
        return this.currentFocus === `description_${index}`
      } else if (field === 'type') {
        return this.currentFocus === `type_${index}`
      } else {
        return false
      }
    },
    standardizeDataType(type) {
      return this.dataTypeOptions.find(type => type.primaryText === type)
    },
    updateKey({ index, key, value, description, type }) {
      this.$set(this.keys, index, key)
      if (this.isRepeated(key) && !this.isRepeatedIndex(key, index)) {
        this.$set(this.errors, index, true)
      } else {
        this.$set(this.errors, index, false)
        this.updateVariables({
          index,
          key,
          value,
          description,
          type,
          variableField: 'key',
        })
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
  align-items: flex-start;
  color: $alt-grey-2;
  display: grid;
  row-gap: 16px;

  .variable {
    border: 1px solid $grey-2;
    display: grid;
    grid-template-columns: max-content 1fr;
    padding: 24px;
    padding-left: 16px;
    padding-left: 8px;
    position: relative;
    row-gap: 16px;

    .label {
      color: $grey-5;
      font-size: 14px;
      margin: 8px;
      padding-right: 5px;
    }

    .variable-value {
      align-items: center;
      display: flex;
    }

    .variable-key {
      column-gap: 16px;
      display: grid;
      grid-template-columns: max-content max-content max-content 1fr;
      height: min-content;
      margin-right: 100px;
      position: relative;

      .variable-icon {
        color: $grey-4;
        font-weight: lighter;
        left: 8px;
        position: absolute;
        top: 8px;
        z-index: 1;
      }

      .error {
        color: $red-3;
        font-size: 13px;
        margin: 8px 0;
      }
    }
  }

  .delete {
    cursor: pointer;
    position: absolute;
    right: 8px;
    top: 8px;
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

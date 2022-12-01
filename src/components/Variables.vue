<template>
  <div class="variables-container">
    <div v-for="(variable, index) in variables" :key="index" class="variable">
      <label class="label" data-test="name-label">{{ $t('name') }}</label>
      <div class="variable-key">
        <p class="variable-icon">$</p>
        <el-input
          v-focus:[focusHandler(index,key)]
          class="key-input"
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
          {{ $t('repeated_variable_key') }}
        </div>
        <label class="label" data-test="type-label">{{
          $t('data_type')
        }}</label>
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
      <label class="label" data-test="value-label">{{
        $t('default_value')
      }}</label>
      <el-input
        v-focus:[focusHandler(index,value)]
        class="variable-value"
        data-test="edit-var-value-input"
        :placeholder="$t('default_value_placeholder')"
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
      <label class="label" data-test="description-label">{{
        $t('description')
      }}</label>
      <el-input
        v-focus:[focusHandler(index,description)]
        class="variable-value"
        data-test="edit-var-description-input"
        :placeholder="$t('variables_description_placeholder')"
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
      <el-tooltip
        :content="$t('delete_variable_tooltip')"
        placement="right"
        effect="light"
      >
        <div
          class="delete"
          data-test="delete-var-btn"
          @click="deleteVariable({ index })"
        >
          <CustomIcon name="close-btn" />
        </div>
      </el-tooltip>
    </div>
    <div class="img-container" @click="createVariable">
      <CustomIcon data-test="add-variable" name="add-operator" />
      <p class="add-operator-text">{{ $t('add_variable') }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import {
  UPDATE_VARIABLES,
  CREATE_VARIABLE,
  DELETE_VARIABLE,
} from '@/store/mutation-types'
import CustomIcon from '@/components/CustomIcon.vue'
import Select from '@/components/Select.vue'

export default {
  name: 'Variables',
  components: {
    Select,
    CustomIcon,
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
      color: var(--text-medium-emphasis);
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
        color: var(--text-medium-emphasis);
        font-weight: lighter;
        left: 8px;
        position: absolute;
        top: 8px;
        z-index: 1;
      }

      .error {
        color: $red-2;
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
      color: var(--text-medium-emphasis);
      font-size: 12px;
      font-weight: medium;
      margin-left: 16px;
    }
  }
}
</style>

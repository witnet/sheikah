<template>
  <div class="variables-container">
    <div v-for="(variable, index) in variables" :key="index" class="variable">
      <p class="label">$</p>
      <EditableText
        class="variable-value"
        :value="keys[index]"
        :error="errors[index]"
        :blockOpen="error"
        v-on:close="key => updateVariables({ index, key, value: variable.value })"
        @input="key => updateKey(index, key)"
      />
      <el-input
        class="variable-value input"
        size="mini"
        data-test="edit-var-value-input"
        :placeholder="variable.value"
        :value="variable.value"
        @input="val => updateVariables({ index, key: variable.key, value: val })"
      />
      <div class="error" v-show="errors[index]">
        (This key is repeated. Change the variable name before continue editing)
      </div>
      <div data-test="delete-var-btn" @click="deleteVariable({ index })" class="delete">
        <font-awesome-icon icon="times-circle" class="delete-btn" />
      </div>
    </div>
    <div class="img-container">
      <img
        data-test="add-var-btn"
        @click="createVariable"
        class="add-btn"
        src="@/resources/svg/add.svg"
      />
    </div>
  </div>
</template>

<script>
import { UPDATE_VARIABLES, CREATE_VARIABLE, DELETE_VARIABLE } from '@/store/mutation-types'
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
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.variables-container {
  width: 100%;
  padding-top: 32px;
  height: 20vh;
  overflow-y: auto;
  background-color: $black;
  color: $alt-grey-2;
  .variable {
    padding-left: 16px;
    display: block;
    display: flex;
    justify-items: left;
    .label {
      color: $alt-grey-2;
      padding-right: 5px;
      margin: 8px;
    }
    .variable-value {
      background-color: $black;
      display: flex;
      align-items: center;
      margin: 8px;
      height: 20px;
      &.input {
        width: 80px;
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
    color: $red-5;
  }
  .img-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    .add-btn {
      width: 35px;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>

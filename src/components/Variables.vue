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
        size="mini"
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
      <div
        data-test="delete-var-btn"
        class="delete"
        @click="deleteVariable({ index })"
      >
        <font-awesome-icon icon="times-circle" class="delete-btn" />
      </div>
    </div>
    <div class="img-container">
      <img
        data-test="add-var-btn"
        class="add-btn"
        src="@/resources/svg/add.svg"
        @click="createVariable"
      />
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
  background-color: $black;
  color: $alt-grey-2;
  height: 20vh;
  overflow-y: auto;
  padding-top: 32px;
  width: 100%;

  .variable {
    display: block;
    display: flex;
    justify-items: left;
    padding-left: 16px;

    .label {
      color: $alt-grey-2;
      margin: 8px;
      padding-right: 5px;
    }

    .variable-value {
      align-items: center;
      background-color: $black;
      display: flex;
      height: 20px;
      margin: 8px;

      &.input {
        width: 80px;
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

  .img-container {
    bottom: 20px;
    position: fixed;
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

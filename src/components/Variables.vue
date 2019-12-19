<template>
  <div class="variables-container">
    <div v-for="(variable, index) in variables" :key="index" class="variable">
      <p class="label">$</p>
      <EditableText
        class="variable-value"
        :value="keys[index]"
        :error="errors[index]"
        :blockOpen="error"
        v-on:close="key => handleCloseEvent(index, key, variable.value)"
        @input="key => updateKey(index, key)"
      />
      <Input
        class="variable-value"
        :value="variable.value"
        @input="val => updateVariable(index, variable.key, val)"
      />
      <div class="error" v-show="errors[index]">
        (This key is repeated. Change the variable name before continue editing)
      </div>
      <div @click="deleteVariable(index)" class="delete">
        <font-awesome-icon class="edit-btn" icon="times" />
      </div>
    </div>
    <div class="img-container">
      <img @click="createVariable" class="add-btn" src="@/resources/svg/add.svg" />
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input'
import { UPDATE_VARIABLES, CREATE_VARIABLE } from '@/store/mutation-types'
import EditableText from '@/components/EditableText'

export default {
  name: 'Variables',
  components: {
    Input,
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
    deleteVariable(index) {
      this.$store.commit('deleteVariable', { index })
    },
    createVariable: function() {
      this.$store.commit(CREATE_VARIABLE)
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
  height: 20vh;
  overflow-y: scroll;
  background-color: $black;
  color: #c5c2c2;
  .variable {
    padding-left: 50px;
    display: block;
    display: flex;
    justify-items: left;
    .label {
      color: #c5c2c2;
      padding-right: 5px;
      margin: 8px;
    }
    .variable-value {
      background-color: $black;
      margin: 10px;
      width: 80px;
      height: 20px;
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

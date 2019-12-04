<template>
  <div class="variables-container">
    <div v-for="(variable, index) in variables" :key="variable.name" class="variable">
      <p class="label">$</p>
      {{ keys }}
      <EditableText
        class="variable-value"
        :value="keys[index]"
        :error="errors[index]"
        :blockOpen="error"
        v-on:close="
          key => {
            handleCloseEvent(index, key, variable.value)
          }
        "
        @input="
          key => {
            updateKey(index, key)
          }
        "
      />
      <Input
        class="variable-value"
        :value="variable.value"
        @input="
          val => {
            updateVariable(index, variable.key, val)
          }
        "
      />
    </div>
    <div class="img-container">
      <img @click="() => createVariable()" class="add-btn" src="@/resources/svg/add.svg" />
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
      keys: this.$store.state.rad.currentTemplate.variables.map(x => x.key),
    }
  },
  methods: {
    updateKey(index, key) {
      // this.keys[index] = key
      this.$set(this.keys, index, key)
      if (this.isRepeated(key)) {
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
      this.keys[index] = key
      if (this.isRepeated(key)) {
        this.$set(this.errors, index, true)
      } else {
        this.$set(this.errors, index, false)
      }
    },
    createVariable: function() {
      this.$store.commit(CREATE_VARIABLE)
    },
    isRepeated(key) {
      return !!this.variables.find(variable => variable.key === key)
    },
  },
  computed: {
    error() {
      return this.errorIndex !== -1
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
      this.keys = this.$store.state.rad.currentTemplate.variables.map(x => x.key)
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
  text-align: center;
  text-justify: center;
  .variable {
    padding-left: 50px;
    display: block;
    display: flex;
    justify-items: left;
    .label {
      color: #c5c2c2;
      padding-right: 5px;
      margin: 10px;
    }
    .variable-value {
      background-color: $black;
      margin: 10px;
      width: 80px;
      height: 20px;
    }
  }
  .var-repeated {
    color: red;
  }
  .img-container {
    text-align: left;
    .add-btn {
      margin-left: 32vw;
      width: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>

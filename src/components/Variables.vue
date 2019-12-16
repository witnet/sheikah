<template>
  <div class="variables-container">
    <div class="btn-container">
      <button class="close-btn">Close</button>
    </div>
    <div v-for="(variable, index) in variables" :key="variable.name" class="variable">
      <p class="label">$</p>
      <Input
        class="variable-value"
        :value="variable.key"
        @input="key => updateVariable(index, key, variable.value)"
      />
      <p class="label">value:</p>
      <Input
        class="variable-value"
        :value="variable.value"
        @input="val => updateVariable(index, variable.key, val)"
      />
    </div>
    <div class="img-container">
      <img @click="createVariable" class="add-btn" src="@/resources/svg/add.svg" />
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input'
import { UPDATE_VARIABLES, CREATE_VARIABLE } from '@/store/mutation-types'

export default {
  name: 'Variables',
  components: {
    Input,
  },
  methods: {
    updateVariable(index, key, value) {
      this.key = key
      this.value = value
      this.$store.commit(UPDATE_VARIABLES, {
        index,
        key,
        value,
      })
    },
    createVariable() {
      this.$store.commit(CREATE_VARIABLE)
    },
  },
  computed: {
    variables() {
      return this.$store.state.rad.currentTemplate.variables
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.variables-container {
  position: fixed;
  bottom: 0px;
  width: 93vw;
  height: 25vh;
  overflow-y: scroll;
  padding: 10px;
  background-color: black;
  color: #c5c2c2;
  text-align: center;
  text-justify: center;
  .btn-container {
    text-align: right;
    padding: 10px;
    position: fixed;
    right: 10px;
    .close-btn {
      background-color: transparent;
      border: none;
      color: #c5c2c2;
      &:hover {
        cursor: pointer;
      }
    }
  }
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
      background-color: black;
      margin: 10px;
      width: 80px;
      height: 20px;
    }
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

<template>
  <div class="variables-container">
    <div v-for="(variable, index) in variables" :key="variable.name" class="variable">
      <p class="label">$</p>
      <EditableText
        class="variable-value"
        :value="variable.key"
        :name="variable.key"
        @input="
          key => {
            updateVariable(index, key, variable.value)
          }
        "
      />
      <!-- <Input
        class="variable-value"
        :value="variable.key"
        @input="
          key => {
            updateVariable(index, key, variable.value)
          }
        "
      /> -->
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

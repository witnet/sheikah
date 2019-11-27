<template>
  <div class="variables-container">
    {{ currentTemplateVar }}
    <div v-for="(variable, index) in variables" :key="variable.name" class="variable">
      <Input
        class="variable-value"
        :placeholder="'$var_1'"
        :value="'$var_1'"
        @input="
          key => {
            updateVariable(index, '$' + key, variable.value)
          }
        "
      />
      <Input
        class="variable-value"
        :placeholder="'value'"
        :value="'value'"
        @input="
          val => {
            updateVariable(index, variable.key, val)
          }
        "
      />
    </div>
    <img @click="createVariable" class="add-btn" src="@/resources/svg/add.svg" />
  </div>
</template>

<script>
import Input from '@/components/Input'

export default {
  name: 'Variables',
  components: {
    Input,
  },
  methods: {
    updateVariable(index, key, value) {
      this.$store.commit('updateVariables', {
        index,
        key,
        value,
        id: Object.keys(this.variablesSet)[0],
      })
      console.log('updateVariables from component---key::::', index)
      console.log('updateVariables from component---key::::', key)
      console.log('updateVariables from component---value::::', value)
    },
    createVariable: function() {
      this.$store.commit('createVariable', { id: Object.keys(this.variablesSet)[0] })
      console.log(Object.keys(this.variablesSet))
    },
  },
  computed: {
    variablesSet() {
      console.log('yayyyy')
      console.log('------->', this.$store.state.rad.currentVariables)
      return this.$store.state.rad.currentVariables
    },
    variables() {
      console.log('variables', this.variablesSet)
      return this.variablesSet[Object.keys(this.variablesSet)]
    },
    currentTemplateVar() {
      console.log('currenttemplate VAAARS')
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
  bottom: 40px;
  width: 250px;
  padding: 10px;
  background-color: black;
  color: white;
  text-align: center;
  text-justify: center;
  .variable {
    display: inline-block;
    .variable-value {
      background-color: black;
      margin: 10px;
      width: 80px;
      height: 20px;
    }
  }
  .add-btn {
    width: 20px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>

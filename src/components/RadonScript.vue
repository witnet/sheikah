<template>
  <div>
      <div v-for="(operator, index) in script" :key="operator.toString() + index">
        <RadonOperator
          :radOperator="operator"
          :path="{...path, scriptIndex: index }"
          :updateArgumentInput="updateArgumentInput"
          :selectHashFunction="selectHashFunction"
          :updateFilterArgument="updateFilterArgument"
          :updateOperatorCodeSelect="updateOperatorCodeSelect"
          :updateOperatorFilterArgument="updateOperatorFilterArgument"
          :updateOperatorReduceArgument="updateOperatorReduceArgument"
        />
      </div>
      <button @click="event => pushOperator(path)">Add operator</button>
  </div>
</template>

<script>
import RadonOperator from '@/components/RadonOperator'

export default {
  name: 'RadonScript',
  components: { RadonOperator },
  props: {
    path: Object,
    script: Array,
    selectHashFunction: Function,
    updateArgumentInput: Function,
    updateFilterArgument: Function,
    updateOperatorCodeSelect: Function,
    updateOperatorFilterArgument: Function,
    updateOperatorReduceArgument: Function,
    pushOperator: Function,
  },
  data () {
    console.log(this.$props)
    return {}
  },
  methods: { },
}
</script>

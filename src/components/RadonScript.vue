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

    <button @click="event => pushOperator(path)" class="circle plus"></button>
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
    return {}
  },
  methods: { },
}
</script>

<style scoped>

.circle {
    outline: none;
    border: 2px solid grey;
    box-shadow: none;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    position: relative;
    margin: 20px 0;
    display: inline-block;
    vertical-align: middle;
    background: transparent;
}

.circle:before,
.circle:after {
    content:'';position:absolute;top:0;left:0;right:0;bottom:0;
}
.circle.plus:before,
.circle.plus:after {
  cursor: pointer;
  background: grey;
}
.circle.plus:before{
    width: 2px;
    margin: 3px auto;
}
.circle.plus:after{
    margin: auto 3px;
    height: 2px;
    box-shadow: none;
}

</style>

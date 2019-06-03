<template>
 <div class="operator">
    <p>Input Type: {{ inputType }}</p>
    <span>Method: </span>
    <select
      v-model="operatorCode"
      @change="event => updateOperatorCodeSelect(path, event.target.value)"
    >
      <option v-for="operatorOption in operatorOptions" :value="operatorOption" :key="operatorOption">
        {{ RadonOperatorInfos[operatorOption].name }}
      </option>
    </select>
    <div class="arguments" v-for="(argValues, index) in RadonOperatorInfos[operatorCode].arguments" :key="argValues.toString() + index"  >

      <div v-if="isTypeOf([RadonTypes.Boolean, RadonTypes.Int, RadonTypes.Float, RadonTypes.String], argValues.kind)">
        <label :htmlFor="argValues.name">
          {{argValues.name}}:
        </label>
        <input
          :name="argValues.name"
          :value="operator[index + 1]"
          @change="event => updateArgumentInput(path, event.target.value, operator, index + 1)"
        />
      </div>

      <div v-else-if="isTypeOf(RadonTypes.Map, argValues.kind)">
        <label :htmlFor="argValues.name">
          {{ argValues.name }}:
          </label>
        <input
          :name="argValues.name"
          :value="operator[index + 1]"
          @change="event => updateArgumentInput(path, event.target.value, operator, index + 1)"
        />
      </div>

      <div v-else-if="isTypeOf(RadonTypes.HashFunction, argValues.kind)">
          <span>{{argValues.name}}</span>
          <select
            :value="operator[index + 1]"
            @change="event => selectHashFunction(path, event.target.value, operator, index + 1)"
          >
            <option v-for="hashCode in hashFunctionCodes" :key="hashCode[0]" :value="hashCode[0]">
              {{ hashCode[1] }}
            </option>
          </select>
      </div>

      <div v-else-if="isTypeOf(RadonTypes.FilterFunction, argValues.kind)">
        <span>{{ argValues.name }}</span>
        <select
          :value="operator[index + 1][0]"
          @change="event => updateOperatorFilterArgument(path, event.target.value, operator, index + 1)"
        >
          <option v-for="(filterCode, index) in filteringFunctionCodes" :key="filteringFunctionCodes[index][1]" :value="filteringFunctionCodes[index][0]">
            {{ filterCode[1] }}
          </option>
        </select>

        <div>
          <span>Value:</span>
          <input
            :value="operator[index + 1][1]"
            @change="event => updateFilterArgument(path, event.target.value, operator, index + 1)"
          />
        </div>

      </div>

      <div v-else-if="isTypeOf(RadonTypes.ReduceFunction, argValues.kind)">

        <span>{{ argValues.name }}</span>
        {{ operator[index+1] }}
        <select
          :value="operator[index + 1]"
          @change="event => updateOperatorReduceArgument(path, event.target.value, operator, index + 1)"
        >
        <option v-for="reducingCode in reducingFunctionCodes" :key="reducingCode[1]" :value="reducingCode[0]">
          {{ reducingCode[1] }}
        </option>
        </select>
      </div>

      <div v-else-if="isTypeOf(RadonTypes.MapFunction, argValues.kind)">
        <label :htmlFor="argValues.name">{{ argValues.name }}*:</label>
        <input
          :name="argValues.name"
          :value="operator[index + 1]"
          @change="event => props.updateArgumentInput(props.path, event.target.value, operator, index + 1)"
        />
      </div>

    </div>
    <p>Output Type: {{ outputType }}</p>
  </div>
</template>

<script>
import {
  TYPES as RadonTypes,
  TYPESYSTEM as RadonTypeSystem,
  OPERATOR_INFOS as RadonOperatorInfos,
  FilteringFunctionCodes,
  ReducingFunctionCodes,
  HashFunctionCodes,
} from '@/radon'

const DEFAULT_INPUT_TYPE = 0x03

export default {
  name: 'RadonOperator',
  props: {
    radOperator: [Array, Number],
    path: Object,
    selectHashFunction: Function,
    updateArgumentInput: Function,
    updateFilterArgument: Function,
    updateOperatorCodeSelect: Function,
    updateOperatorFilterArgument: Function,
    updateOperatorReduceArgument: Function,
  },
  data () {
    const operatorCode = Array.isArray(this.radOperator) ? this.radOperator[0] : this.radOperator
    const foundType = operatorCode ? this.getTypeFromOperatorCode(operatorCode) : DEFAULT_INPUT_TYPE
    const inputType = RadonTypes[foundType]
    const operator = Array.isArray(this.radOperator) ? this.radOperator : [this.radOperator]
    const outputType = RadonTypes[RadonTypeSystem[foundType][operatorCode]]
    const operatorOptions = Object.keys(RadonTypeSystem[RadonTypes[inputType]])
    return {
      inputType,
      operator,
      operatorCode,
      operatorOptions,
      outputType,
    }
  },
  computed: {
    hashFunctionCodes: function () {
      return Object.entries(HashFunctionCodes)
        .slice(0, Object.entries(HashFunctionCodes).length / 2)
    },
    filteringFunctionCodes: function () {
      return Object.entries(FilteringFunctionCodes)
        .slice(0, Object.entries(FilteringFunctionCodes).length / 2)
    },
    reducingFunctionCodes: function () {
      return Object.entries(ReducingFunctionCodes)
        .slice(0, Object.entries(ReducingFunctionCodes).length / 2)
    },
    RadonOperatorInfos: function () {
      return RadonOperatorInfos
    },
    RadonTypes: function () {
      return RadonTypes
    },
  },

  methods: {
    isTypeOf (types, candidate) {
      return Array.isArray(types)
        ? types.includes(candidate)
        : types === candidate
    },
    getTypeFromOperatorCode: function (operatorCode) {
      const result = Object.entries(RadonTypeSystem)
        .reduce((acc, array) => {
          const hasSameType = Object.keys(array[1]).find(code => {
            return parseInt(code) === operatorCode
          })
          if (hasSameType) {
            acc = array[0]
          }
          return acc
        }, '')
      return result
    },
  },
}
</script>

<style>
.operator {
  border: 1px solid black;
}
</style>

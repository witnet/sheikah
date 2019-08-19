<template>
  <div>
    <div :class="createClass([`${inputType}-type`])">
      {{ inputType }}
    </div>
    <div :class="createClass([`${inputType}-operator`, 'operator'])">
      <select
        :class="createClass([`${inputType}-operator-select`])"
        v-model="operatorCode"
        @change="event => updateOperatorCodeSelect(event.target.value)"
      >
        <option
          v-for="operatorOption in operatorOptions"
          :value="operatorOption"
          :key="operatorOption"
        >
          {{ RadonOperatorInfos[operatorOption].name }}
        </option>
      </select>
      <div
        class="arguments"
        v-for="(argValues, index) in RadonOperatorInfos[operatorCode].arguments"
        :key="argValues.toString() + index"
      >
        <div
          v-if="
            isTypeOf(
              [RadonTypes.Boolean, RadonTypes.Int, RadonTypes.Float, RadonTypes.String],
              argValues.kind
            )
          "
        >
          <input
            :class="createClass([`${inputType}-argument`])"
            :placeholder="argValues.name"
            :name="argValues.name"
            :value="operator[index + 1]"
            @change="event => updateArgumentInput(event.target.value, index + 1)"
          />
        </div>

        <div v-else-if="isTypeOf(RadonTypes.Map, argValues.kind)">
          <input
            :class="createClass([`${inputType}-argument`])"
            :placeholder="argValues.name"
            :name="argValues.name"
            :value="operator[index + 1]"
            @change="event => updateArgumentInput(event.target.value, index + 1)"
          />
        </div>

        <div v-else-if="isTypeOf(RadonTypes.HashFunction, argValues.kind)">
          <select
            :class="createClass([`${inputType}-argument`])"
            :value="operator[index + 1]"
            @change="event => selectHashFunction(event.target.value, index + 1)"
          >
            <option v-for="hashCode in hashFunctionCodes" :key="hashCode[0]" :value="hashCode[0]">
              {{ hashCode[1] }}
            </option>
          </select>
        </div>

        <div v-else-if="isTypeOf(RadonTypes.FilterFunction, argValues.kind)">
          <select
            :class="createClass([`${inputType}-argument`])"
            :value="operator[index + 1][0]"
            @change="event => updateOperatorFilterArgument(event.target.value, index + 1)"
          >
            <option
              v-for="(filterCode, index) in filteringFunctionCodes"
              :key="filteringFunctionCodes[index][1]"
              :value="filteringFunctionCodes[index][0]"
            >
              {{ filterCode[1] }}
            </option>
          </select>

          <div>
            <input
              :class="createClass([`${inputType}-argument`])"
              placeholder="value"
              :value="operator[index + 1][1]"
              @change="event => updateFilterArgument(event.target.value, index + 1)"
            />
          </div>
        </div>

        <div v-else-if="isTypeOf(RadonTypes.ReduceFunction, argValues.kind)">
          <select
            :class="createClass([`${inputType}-argument`])"
            :value="operator[index + 1]"
            @change="event => updateOperatorReduceArgument(event.target.value, index + 1)"
          >
            <option
              v-for="reducingCode in reducingFunctionCodes"
              :key="reducingCode[1]"
              :value="reducingCode[0]"
            >
              {{ reducingCode[1] }}
            </option>
          </select>
        </div>

        <div v-else-if="isTypeOf(RadonTypes.MapFunction, argValues.kind)">
          <input
            :class="createClass([`${inputType}-argument`])"
            :placeholder="argValues.name"
            :name="argValues.name"
            :value="operator[index + 1]"
            @change="event => props.updateArgumentInput(event.target.value, index + 1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTypeFromOperatorCode } from '@/radon/utils'
import {
  FilteringFunctionCodes,
  HashFunctionCodes,
  OPERATOR_INFOS as RadonOperatorInfos,
  TYPESYSTEM as RadonTypeSystem,
  TYPES as RadonTypes,
  ReducingFunctionCodes,
} from '@/radon'

const DEFAULT_INPUT_TYPE = 0x03

export default {
  name: 'RadonOperator',
  props: {
    radOperator: [Array, Number],
    path: Object,
  },
  data() {
    const operatorCode = Array.isArray(this.radOperator) ? this.radOperator[0] : this.radOperator
    const inputTypeCode = operatorCode ? getTypeFromOperatorCode(operatorCode) : DEFAULT_INPUT_TYPE
    const inputType = RadonTypes[inputTypeCode]
    const operator = Array.isArray(this.radOperator) ? this.radOperator : [this.radOperator]
    const outputType = RadonTypes[RadonTypeSystem[inputTypeCode][operatorCode]]
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
    hashFunctionCodes: function() {
      return Object.entries(HashFunctionCodes).slice(
        0,
        Object.entries(HashFunctionCodes).length / 2
      )
    },
    filteringFunctionCodes: function() {
      return Object.entries(FilteringFunctionCodes).slice(
        0,
        Object.entries(FilteringFunctionCodes).length / 2
      )
    },
    reducingFunctionCodes: function() {
      return Object.entries(ReducingFunctionCodes).slice(
        0,
        Object.entries(ReducingFunctionCodes).length / 2
      )
    },
    RadonOperatorInfos: function() {
      return RadonOperatorInfos
    },
    RadonTypes: function() {
      return RadonTypes
    },
  },

  methods: {
    isTypeOf(types, candidate) {
      return Array.isArray(types) ? types.includes(candidate) : types === candidate
    },
    createClass(classes) {
      return classes.join(' ').toLowerCase()
    },
    updateOperatorCodeSelect(operatorCode) {
      this.$store.commit('updateOperatorCodeSelect', { path: this.path, operatorCode })
    },
    updateArgumentInput(input, argIndex) {
      this.$store.commit('updateArgumentInput', {
        path: this.path,
        input,
        operator: this.operator,
        argIndex,
      })
    },
    selectHashFunction(hashFunctionCode, argIndex) {
      this.$store.commit('selectHashFunction', {
        path: this.path,
        hashFunctionCode,
        operator: this.operator,
        argIndex,
      })
    },
    updateOperatorFilterArgument(filterFunctionCode, argIndex) {
      this.$store.commit('updateOperatorFilterArgument', {
        path: this.path,
        filterFunctionCode,
        operator: this.operator,
        argIndex,
      })
    },
    updateFilterArgument(filterArgument, argIndex) {
      this.$store.commit('updateFilterArgument', {
        path: this.path,
        filterArgument,
        operator: this.operator,
        argIndex,
      })
    },
    updateOperatorReduceArgument(reduceArgument, argIndex) {
      this.$store.commit('updateOperatorReduceArgument', {
        path: this.path,
        reduceArgument,
        operator: this.operator,
        argIndex,
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/fonts.scss';

*:focus {
  outline: none;
}

[class*='argument'] {
  width: 100%;
  border-radius: 5px;
  padding: 5px;
}

[class*='select'] {
  width: 100%;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: $font-size-12;
  font-weight: 800;
}

[class*='type'] {
  margin: 10px 0;
  width: fit-content;
  padding: 5px 10px;
  font-size: $font-size-12;
  font-weight: 800;
  border-radius: 5px;
}

[class*='operator'] {
  border-radius: 5px;
}

@mixin color($color) {
  &-operator {
    border: 1px solid $color;
  }

  &-operator-select,
  &-type {
    color: white;
    background-color: $color;
  }

  &-argument,
  &-argument::placeholder {
    border: 1px solid $color;
    color: $color;
  }
}

.string {
  @include color($blue-6);
}

.mixed {
  @include color($orange-6);
}

.boolean {
  @include color($red-6);
}

.int {
  @include color($purple-6);
}

.float {
  @include color($green-6);
}

.array {
  @include color($yellow-6);
}

.map {
  @include color($magenta-6);
}

.null {
  @include color($grey-6);
}

.result {
  @include color($volcano-6);
}
</style>

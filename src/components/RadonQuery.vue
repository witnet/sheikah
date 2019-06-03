<template>
  <div class>
    <div>
      <p>Retrieve:</p>
      <textarea
        class="textarea"
        :value="JSON.stringify(retrieve)"
        v-on:keyup.enter="e => updateStage(e, 'retrieve')"
      />
      <p>Aggregate</p>
      <textarea
        class="textarea"
        :value="JSON.stringify(aggregate)"
        v-on:keyup.enter="e => updateStage(e, 'aggregate')"
      />
      <p>Consensus</p>
      <textarea
        class="textarea"
        :value="JSON.stringify(consensus)"
        v-on:keyup.enter="e => updateStage(e, 'consensus')"
      />
    </div>

    <div class>
      <h1>Request</h1>
    </div>
    <div class="row">
      <div v-for="(source, index) in retrieve" class="source" :key="source.kind+index">
        <label>source: {{ index }}</label>
        <input placeholder="url" type="text" v-model="source.url">
        <div>
          <p>Kind:</p>
          <p>{{ source.kind }}</p>
          <div>
            <RadonScript
              v-show="!error.retrieve"
              :path="{stage: 'retrieve', retrieveIndex: index}"
              :script="source.script"
              :updateArgumentInput="updateArgumentInput"
              :selectHashFunction="selectHashFunction"
              :updateFilterArgument="updateFilterArgument"
              :updateOperatorCodeSelect="updateOperatorCodeSelect"
              :updateOperatorFilterArgument="updateOperatorFilterArgument"
              :updateOperatorReduceArgument="updateOperatorReduceArgument"
              :pushOperator="pushOperator"
            />
            <p class="error" v-show="error.retrieve">There is an error in the retrieve stage</p>
          </div>
        </div>
      </div>
      <div class>
        <button v-on:click="pushRetrieve">add source</button>
      </div>
    </div>
    <br>
    <div class>
      <div class>
        <h1>Aggregate</h1>
      </div>
      <div class>
        <div>
          <RadonScript
            v-show="!error.aggregate"
            :path="{stage: 'aggregate'}"
            :script="aggregate.script"
            :updateArgumentInput="updateArgumentInput"
            :selectHashFunction="selectHashFunction"
            :updateFilterArgument="updateFilterArgument"
            :updateOperatorCodeSelect="updateOperatorCodeSelect"
            :updateOperatorFilterArgument="updateOperatorFilterArgument"
            :updateOperatorReduceArgument="updateOperatorReduceArgument"
            :pushOperator="pushOperator"
          />
          <p class="error" v-show="error.aggregate">There is an error in the aggregate stage</p>
        </div>
      </div>
    </div>
    <br>
    <div class>
      <div class>
        <h1>Consensus</h1>
      </div>
      <div class>
        <RadonScript
          v-show="!error.consensus"
          :path="{stage: 'consensus'}"
          :script="consensus.script"
          :updateArgumentInput="updateArgumentInput"
          :selectHashFunction="selectHashFunction"
          :updateFilterArgument="updateFilterArgument"
          :updateOperatorCodeSelect="updateOperatorCodeSelect"
          :updateOperatorFilterArgument="updateOperatorFilterArgument"
          :updateOperatorReduceArgument="updateOperatorReduceArgument"
          :pushOperator="pushOperator"
        />
        <p class="error" v-show="error.consensus">There is an error in the consensus stage</p>
      </div>
    </div>
    <div class>
      <div class>
        <h1>Deliver</h1>
      </div>
      <div class>
        <input placeholder="url">
      </div>
    </div>
  </div>
</template>

<script>

import { match } from '@/utils'
import RadonScript from '@/components/RadonScript.vue'
import {
  TYPES as RadonTypes,
  OPERATOR_INFOS as RadonOperatorInfos,
  TYPESYSTEM as RadonTypeSystem,
  HashFunctionCodes,
  ReducingFunctionCodes,
} from '@/radon'

export default {
  name: 'RadonQuery',
  components: {
    RadonScript,
  },
  props: {
    radRequest: Object,
  },
  data () {
    return {
      retrieve: [
        {
          url: '',
          kind: 'HTTP_GET',
          script: [[0x51, [0x00, 1]]],
        },
      ],
      aggregate: {
        script: [0x43, 0x74, [0x61, 'weather'], 0x74, [0x61, 'temp'], 0x72],
      },
      consensus: {
        script: [0x43, 0x74, [0x61, 'weather'], 0x74, [0x61, 'temp'], 0x72],
      },
      error: {
        retrieve: false,
        aggregate: false,
        consensus: false,
      },
    }
  },
  methods: {
    getOutput: function (operatorCode) {
      return Object.entries(RadonTypeSystem).reduce((acc, array) => {
        if (Object.keys(array[1]).find(key => parseInt(key) === operatorCode)) {
          acc = RadonTypes[RadonTypeSystem[array[0]][operatorCode]]
        }
        return acc
      }, '')
    },
    updateStage: function (event, stage) {
      try {
        const result = JSON.parse(event.target.value)
        this[stage] = result
        this.error[stage] = false
      } catch (err) {
        this.error[stage] = true
      }
    },

    getLastOperator: function (request, stage, retrieveIndex) {
      const script = retrieveIndex
        ? this[stage][retrieveIndex].script
        : this[stage].script

      return script[script.length - 1]
    },
    getOperatorCode: function (operator) {
      return Array.isArray(operator) ? operator[0] : operator
    },
    pushOperator: function (path) {
      const { retrieve, aggregate, consensus } = this
      const lastOperator = this.getLastOperator(
        { retrieve, aggregate, consensus },
        path.stage,
        path.retrieveIndex,
      )
      const operatorCode = this.getOperatorCode(lastOperator)
      // const lastOperatorStringType = this.getOutput(operatorCode)
      const operatorsObject =
        RadonTypeSystem[RadonTypes[this.getOutput(operatorCode)]]
      const newOperatorCode = parseInt(Object.entries(operatorsObject)[0][0])
      const newOperatorInfo = RadonOperatorInfos[newOperatorCode]

      // add operator arguments by argument type

      const numberOfOperatorArguments = newOperatorInfo.arguments.length

      if (numberOfOperatorArguments === 0) {
        Number.isInteger(parseInt(path.retrieveIndex))
          ? this[path.stage][path.retrieveIndex].script.push(newOperatorCode)
          : this[path.stage].script.push(newOperatorCode)
      } else {
        // const newOperator = [newOperatorCode, newOperatorInfo.arugments.map(argument => )]
        Number.isInteger(parseInt(path.retrieveIndex))
          ? this[path.stage][path.retrieveIndex].script.push([newOperatorCode])
          : this[path.stage].script.push(newOperatorCode)
      }
    },
    pushRetrieve: function () {
      this.retrieve.push({
        url: '',
        kind: 'HTTP_GET',
        script: [],
      })
    },
    updateArgumentInput: function (path, input, operator, argIndex) {
      operator[argIndex] = input
      if (path.retrieveIndex) {
        this[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
        this[`${path.stage}`] = [...this[`${path.stage}`]]
      } else {
        this[`${path.stage}`][path.scriptIndex] = operator
        this[`${path.stage}`] = { ...this[`${path.stage}`] }
      }
    },
    selectHashFunction: function (path, hashFunctionCode, operator, argIndex) {
      operator[argIndex] = hashFunctionCode
      if (path.retrieveIndex) {
        this[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
        this[`${path.stage}`] = [...this[`${path.stage}`]]
      } else {
        this[`${path.stage}`][path.scriptIndex] = operator
        this[`${path.stage}`] = { ...this[`${path.stage}`] }
      }
    },
    updateOperatorReduceArgument: function (
      path,
      reduceArgument,
      operator,
      argIndex,
    ) {
      operator[argIndex] = [operator[argIndex][0], reduceArgument]
      if (path.retrieveIndex) {
        this[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
        this[`${path.stage}`] = [...this[`${path.stage}`]]
      } else {
        this[`${path.stage}`][path.scriptIndex] = operator
        this[`${path.stage}`] = { ...this[`${path.stage}`] }
      }
    },
    updateFilterArgument: function (path, filterArgument, operator, argIndex) {
      operator[argIndex] = [operator[argIndex][0], filterArgument]
      if (path.retrieveIndex) {
        this[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
        this[`${path.stage}`] = [...this[`${path.stage}`]]
      } else {
        this[`${path.stage}`][path.scriptIndex] = operator
        this[`${path.stage}`] = { ...this[`${path.stage}`] }
      }
    },
    updateOperatorFilterArgument: function (
      path,
      filterFunctionCode,
      operator,
      argIndex,
    ) {
      operator[argIndex] = [filterFunctionCode, '']
      if (path.retrieveIndex) {
        this[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
      } else {
        this[`${path.stage}`][path.scriptIndex] = operator
      }
    },
    updateOperatorCodeSelect: function (path, operatorCode) {
      let args = RadonOperatorInfos[operatorCode].arguments.map(argument => {
        return match(argument.kind, [
          {
            options: [
              RadonTypes.Boolean,
              RadonTypes.Int,
              RadonTypes.Float,
              RadonTypes.String,
              RadonTypes.FilterFunction,
            ],
            result: [argument.kind, ''],
          },
          {
            options: [
              RadonTypes.Map,
              RadonTypes.Mixed,
              RadonTypes.Array,
              RadonTypes.Null,
              RadonTypes.Result,
              RadonTypes.Self,
              RadonTypes.MapFunction,
            ],
            result: [],
          },
          {
            options: [RadonTypes.HashFunction],
            result: parseInt(
              parseInt(HashFunctionCodes[HashFunctionCodes[0]]).toString(16),
            ),
          },
          {
            options: [RadonTypes.ReduceFunction],
            result: parseInt(
              parseInt(
                ReducingFunctionCodes[ReducingFunctionCodes[0]],
              ).toString(16),
            ),
          },
        ])
      })
      if (path.stage === 'retrieve') {
        this[`${path.stage}`][path.retrieveIndex].script[path.scriptIndex] = [
          parseInt(operatorCode),
          ...args,
        ]
        if (!this.validateRadScript('')) {
          this[`${path.stage}`][path.retrieveIndex].script.splice(
            path.scriptIndex + 1,
            this[`${path.stage}`][path.retrieveIndex].script.length,
          )
        }
        this[`${path.stage}`] = { ...this[`${path.stage}`] }
      } else {
        this[`${path.stage}`].script[path.scriptIndex] = [
          parseInt(operatorCode),
          ...args,
        ]
        if (!this.validateRadScript('')) {
          this[`${path.stage}`].script.splice(
            path.scriptIndex + 1,
            this[`${path.stage}`].script.length,
          )
        }
        this[`${path.stage}`] = { ...this[`${path.stage}`] }
      }
    },
    validateRadScript: function () {
      return false
    },
  },
}
</script>

<style>
.error {
  color: lightcoral;
}
.row {
  display: flex;
  margin: 10px;
}

.source {
  margin-right: 24px;
}

.column {
  display: flex;
  flex-flow: column nowrap;
  margin: 20px;
}
.textarea {
  width: 400px;
}
</style>

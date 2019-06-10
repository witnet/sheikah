<template>
  <div class="query">
    <div class="stage">
      <div class="sources">
        <div v-for="(source, index) in retrieve" class="source" :key="source.kind+index">
          <div class="header">
            <div class="tag">
              <p class="text">SOURCE</p>
              <p class="text">#{{ index }}</p>
            </div>
            <div class="content">
              <select class="select">
                <option value="HTTPS_GET">HTTPS GET</option>
              </select>
              <input class="input" placeholder="url" type="text" v-model="source.url">
            </div>
          </div>
          <div>
            <RadonScript
              class="script"
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
        <div>
          <Button class="add-source" type="dashed" :onClick="pushRetrieve">+ ADD SOURCE</button>
        </div>
      </div>
      <p class="name">Retrieval</p>
    </div>

    <div class="stage">
          <RadonScript
            class="script"
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
      <p class="name">Aggregation</p>
    </div>
    <div class="stage">
      <RadonScript
        class="script"
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
      <p class="name">Consensus</p>
    </div>
    <div class="stage">
      <input class="deliver" placeholder="url">
        <p class="name">Deliver</p>
      <div class>
      </div>
    </div>
    <div>
    <p v-if="dataRequestResult">The result of the data request is: {{ dataRequestResult }}</p>
    <p v-if="dataRequestError">There was an error trying data request {{ dataRequestError }}</p>
      <p>Retrieval</p>
      <textarea
        class="textarea"
        :value="JSON.stringify(retrieve)"
        v-on:keyup.enter="e => updateStage(e, 'retrieve')"
      />
      <p>Aggregation</p>
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

      <button @click="tryDataRequest">Try data request</button>
    </div>

  </div>
</template>

<script>
import RadonScript from '@/components/RadonScript.vue'
import Button from '@/components/Button.vue'

import { getOutput } from '@/radon/utils'
import { match } from '@/utils'
import {
  TYPES as RadonTypes,
  OPERATOR_INFOS as RadonOperatorInfos,
  TYPESYSTEM as RadonTypeSystem,
  HashFunctionCodes,
  ReducingFunctionCodes,
  FilteringFunctionCodes,
} from '@/radon'

export default {
  name: 'RadonQuery',
  components: {
    RadonScript,
    Button,
  },
  props: {
    radRequest: Object,
  },
  data () {
    return {
      dataRequestResult: this.$store.state.dataRequestResult,
      dataRequestError: this.$store.state.dataRequestError,
      retrieve: this.$store.state.radRequest.retrieve,
      aggregate: this.$store.state.radRequest.aggregate,
      consensus: this.$store.state.radRequest.consensus,
      error: {
        retrieve: false,
        aggregate: false,
        consensus: false,
      },
    }
  },
  methods: {
    tryDataRequest: function () {
      this.$store.dispatch('tryDataRequest')
    },
    getOutput: function (operatorCode) {
      const result = Object.entries(RadonTypeSystem).reduce((acc, array) => {
        if (Object.keys(array[1]).find(key => parseInt(key) === operatorCode)) {
          acc = RadonTypes[RadonTypeSystem[array[0]][operatorCode]]
        }
        return acc
      }, '')
      return result
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
      const script = Number.isInteger(retrieveIndex)
        ? this[stage][retrieveIndex].script
        : this[stage].script
      return script[script.length - 1]
    },
    getOperatorCode: function (operator) {
      return Array.isArray(operator) ? operator[0] : operator
    },
    pushOperator: function (path) {
      if (path.stage === 'retrieve' && this.retrieve[path.retrieveIndex].script.length === 0) {
        this.retrieve[path.retrieveIndex].script.push(67)
      } else {
        const currentScript = Number.isInteger(parseInt(path.retrieveIndex))
          ? this[path.stage][path.retrieveIndex].script
          : this[path.stage].script
        const scriptTypes = currentScript.map(getOutput)
        if (scriptTypes[0] === 'Self') {
          console.log(`ERROR pushing a new operator in stage ${path.stage} in stageIndex ${path.retrieveIndex}`)
        } else {
        // TODO: check if first operator in aggregate phase is Self and then search the type in retrieval stage
          const cleanScriptTypes = scriptTypes.map((item, index, array) => {
            if (item === 'Self') {
              return array[index - 1]
            } else {
              return item
            }
          })

          const outputType = cleanScriptTypes[cleanScriptTypes.length - 1]
          const operatorsObject =
          RadonTypeSystem[RadonTypes[outputType]]
          const newOperatorCode = parseInt(Object.entries(operatorsObject)[0][0])
          const newOperatorInfo = RadonOperatorInfos[newOperatorCode]

          const numberOfOperatorArguments = newOperatorInfo.arguments.length

          if (numberOfOperatorArguments === 0) {
            Number.isInteger(parseInt(path.retrieveIndex))
              ? this[path.stage][path.retrieveIndex].script.push(newOperatorCode)
              : this[path.stage].script.push(newOperatorCode)
          } else {
            Number.isInteger(parseInt(path.retrieveIndex))
              ? this[path.stage][path.retrieveIndex].script.push([newOperatorCode])
              : this[path.stage].script.push(newOperatorCode)
          }
        }
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
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        this[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
        this[`${path.stage}`] = [...this[`${path.stage}`]]
      } else {
        this[`${path.stage}`][path.scriptIndex] = operator
        this[`${path.stage}`] = { ...this[`${path.stage}`] }
      }
    },
    selectHashFunction: function (path, hashFunctionCode, operator, argIndex) {
      operator[argIndex] = hashFunctionCode
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
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
      operator[argIndex] = reduceArgument
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        this[`${path.stage}`][path.retrieveIndex].script[path.scriptIndex] = operator
        this[`${path.stage}`] = [...this[`${path.stage}`]]
      } else {
        this[`${path.stage}`].script[path.scriptIndex] = operator
        this[`${path.stage}`] = { ...this[`${path.stage}`] }
      }
    },
    updateFilterArgument: function (path, filterArgument, operator, argIndex) {
      operator[argIndex] = [operator[argIndex][0], filterArgument]
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
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
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
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
            ],
            result: true,
          },
          {
            options: [
              RadonTypes.Int,
            ],
            result: 0,
          },
          {
            options: [
              RadonTypes.Float,
            ],
            result: 0.0,
          },
          {
            options: [
              RadonTypes.String,
            ],
            result: '',
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
            options: [RadonTypes.FilterFunction],
            result: [0, 0],
          },
          {
            options: [RadonTypes.HashFunction],
            result: 0,
          },
          {
            options: [RadonTypes.ReduceFunction],
            result: 0,
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
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/fonts.scss';
.script {
  width: 300px;
}
.deliver {
  width: 300px;
  margin: 20px 0;
  height: 30px;
}
*:focus {
  outline: none;
}

.query {
  padding: 24px;
}

.stage {
  display: flex;
  min-height: 100px;
  border-bottom: 2px dashed lightgrey;
  justify-content: space-between;
}

.name {
  font-size: $font-size-30;
  font-weight: 200;
  color: lightgrey;
  margin: 10px 0;
}

.add-source {
  font-size: $font-size-12;
  color: grey;
  border-color: grey;
  padding: 0 5px;
  height: 26px;
  line-height: 0%;
  font-weight: 800;

  &:hover {
    color: lightgray;
    border-color: lightgrey;
  }
}

.source {
  margin: 0 10px 10px 0;
}

.header {
  width: 300px;
  border: 1px solid grey;
  border-radius: 2%;

  .tag {
    border: 1px solid grey;
    display: flex;
    justify-content: space-between;
    background: grey;
    padding: 0 5px;

    .text {
      color:white;
      font-weight: 800;
      margin: 0;
      padding: 0;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 10px;

    .select {
      cursor: pointer;
      width: 100px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 400;
      height: 32px;
      line-height: 1.5;
      padding: 0 15px;
      text-align: center;
      background-color:white;
      color: grey;
      margin-bottom: 10px;
    }

    .input {
      border-radius: 4px;
      font-size: 14px;
      font-weight: 400;
      height: 32px;
      line-height: 1.5;
      padding: 0 15px;
      background-color:white;
      color: grey;
      border: 1px solid grey;
    }
  }
}

.error {
  color: lightcoral;
}

.sources {
  display: flex;
  margin: 10px;
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

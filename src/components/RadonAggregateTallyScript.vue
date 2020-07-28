<template>
  <div class="radon-script">
    <div class="top">
      <div class="script-header">
        <p class="url" data-test="header">
          {{ header }}
        </p>
      </div>
      <div class="operator-bottom">
        <div class="icon-container">
          <img
            v-if="emptyScript"
            class="row sheikah-icon"
            src="@/resources/svg/long-arrow.svg"
          />
          <img
            v-else
            class="row sheikah-icon"
            src="@/resources/svg/operator-arrow.svg"
          />
          <div
            v-if="emptyScript"
            class="add-operator-container"
            @click="addOperator"
          >
            <img class="add-operator" src="@/resources/svg/add-operator.svg" />
            <p class="add-operator-text">Click to add an operator</p>
          </div>
        </div>
        <OperatorOutput
          v-if="outputLabel"
          class="output"
          :label="outputLabel"
          :filter="false"
          :output="firstOutput"
          :error="firstError"
        />
      </div>
    </div>
    <ScriptInfo class="first description" :index="0" :info="headerScriptInfo" />
    <div v-if="type === 'filters'" class="operators">
      <div
        v-for="(operator, index) in filters"
        :key="operator.toString() + index"
        class="operator-container"
      >
        <RadonOperator
          class="operator"
          data-test="filter-operator"
          :operator="operator"
          :script-id="operator.scriptId"
          :source-index="sourceIndex"
          :show-output-type="index !== filters.length - 1"
          :operatorOutput="partialResults ? partialResults[index + 1] : null"
          :error="radonError"
          @delete-operator="removeOperator(operator.scriptId, operator.id)"
          @add-operator="addOperator"
        />
        <ScriptInfo
          class="description"
          :index="index + 1"
          :info="operator.selected.description"
        />
      </div>
    </div>
    <div v-else class="operators">
      <div class="operator-container">
        <RadonOperator
          class="operator"
          data-test="reducer-operator"
          :operator="reducer"
          :script-id="reducer.scriptId"
          :source-index="sourceIndex"
          :show-output-type="true"
          :operatorOutput="
            partialResults ? partialResults[partialResults.length - 1] : null
          "
          :error="radonError"
          :hideDelete="true"
          @add-operator="addOperator"
        />
        <ScriptInfo
          class="description"
          :index="1"
          :info="reducer.selected.description"
        />
      </div>
    </div>
    <div class="script-footer">
      <p class="text" data-test="footer">
        {{ footer }}
      </p>
    </div>
    <ScriptInfo
      v-if="type === 'filters'"
      class="last description"
      :index="filters.length + 1"
      :info="footerScriptInfo"
    />
    <ScriptInfo
      v-else
      class="last description"
      :index="2"
      :info="footerScriptInfo"
    />
  </div>
</template>

<script>
import { PUSH_OPERATOR, DELETE_OPERATOR } from '@/store/mutation-types'
import ScriptInfo from '@/components/ScriptInfo'
import { standardizeOperatorName, selectInnerError } from '@/utils'
import OperatorOutput from '@/components/OperatorOutput.vue'
import RadonOperator from '@/components/RadonOperator'
import { mapMutations } from 'vuex'

export default {
  name: 'RadonAggregateTallyScript',
  components: { RadonOperator, ScriptInfo, OperatorOutput },
  props: {
    partialResults: {
      type: Array,
      default: null,
    },
    sourceIndex: {
      default: null,
      type: Number,
    },
    script: {
      default: null,
      type: [Object, Array],
    },
    scriptId: {
      default: null,
      type: Number,
    },
    type: {
      default: '',
      type: String,
    },
    header: {
      required: true,
      default: '',
      type: String,
    },
    footer: {
      required: true,
      default: '',
      type: String,
    },
    headerScriptInfo: {
      required: true,
      default: '',
      type: String,
    },
    finalResult: {
      type: Object,
      default: () => {},
    },
    footerScriptInfo: {
      required: true,
      default: '',
      type: String,
    },
  },
  computed: {
    emptyScript() {
      return this.type === 'filters'
        ? this.filters.length < 1
        : this.reducer.length < 1
    },
    filters() {
      return this.script.filters
    },
    reducer() {
      return this.script.reducer
    },
    radonError() {
      if (this.finalResult) {
        return this.finalResult.RadonError ? this.finalResult.RadonError : null
      } else {
        return null
      }
    },
    firstOutput() {
      return this.partialResults ? this.partialResults[0] : null
    },
    firstError() {
      return this.firstOutput &&
        this.firstOutput.RadonArray.find(error => error.RadonError)
        ? this.firstOutput.RadonArray.map(error =>
            selectInnerError(error.RadonError),
          ).toString()
        : null
    },
    outputLabel() {
      if (this.firstError) {
        return 'error'
      } else if (this.firstOutput) {
        const innerOutput = Object.keys(this.firstOutput)[0]
        return standardizeOperatorName(innerOutput)
      } else {
        return null
      }
    },
  },
  methods: {
    ...mapMutations({
      pushOperator: PUSH_OPERATOR,
      deleteOperator: DELETE_OPERATOR,
      clearDataRequestResult: 'clearDataRequestResult',
    }),
    removeOperator(scriptId, operatorId) {
      this.deleteOperator({ scriptId, operatorId })
    },
    addOperator() {
      // TODO: get scriptId in a more consistent way
      this.pushOperator({
        scriptId: this.script[0] ? this.script[0].scriptId : this.scriptId,
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.radon-script {
  display: grid;
  grid-template-columns: minmax(400px, 1fr) 300px;
  grid-template-rows: min-content;
}

.operators {
  grid-column-end: -1;
  grid-column-start: 1;

  .operator-container {
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-rows: min-content;

    .operator {
      margin: 0 16px;
    }
  }
}

.description {
  border-left: 1px solid $yellow-3;
  border-right: 1px solid $yellow-3;

  &.last {
    border-bottom: 1px solid $yellow-3;
  }

  &.first {
    border-top: 1px solid $yellow-3;
  }
}

.top {
  margin: 16px 16px 0 16px;

  .operator-bottom {
    align-items: flex-start;
    display: flex;

    .icon-container {
      margin-left: 16px;
    }

    .output {
      margin-top: 16px;
    }
  }

  .script-header {
    align-items: center;
    border: $operator-dashed-border;
    display: flex;

    .url {
      color: $grey-3;
      font-size: 14px;
      font-weight: medium;
      margin: 16px;

      .protocol {
        font-size: 12px;
      }
    }
  }
}

.script-footer {
  border: $operator-dashed-border;
  display: flex;
  height: min-content;
  margin: 0 16px 16px 16px;

  .text {
    color: $grey-3;
    font-size: 14px;
    font-weight: medium;
    margin: 16px;
  }
}

.icon-container {
  margin-left: 16px;
  position: relative;

  .add-operator-container {
    bottom: 24px;
    cursor: pointer;
    display: flex;
    left: -4px;
    position: absolute;
    width: max-content;

    .add-operator-text {
      color: $grey-4;
      font-size: 12px;
      font-weight: medium;
      margin-left: 16px;
    }
  }
}

.button-container {
  margin-top: 16px;
  text-align: center;

  .add-operators-btn {
    background-color: $purple-4;
    border-radius: 5px;
    color: $white;
    cursor: pointer;
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: bold;
    margin: 32px;
    padding: 8px;
    width: 150px;

    &:active,
    &:focus {
      outline: none;
    }
  }
}
</style>

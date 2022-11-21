<template>
  <div class="radon-script">
    <div class="top">
      <div class="script-header">
        <p class="url">
          {{ url }} <span class="protocol">({{ protocol }})</span>
        </p>
      </div>
      <div v-if="protocol !== 'RNG'" class="operator-bottom">
        <div class="icon-container">
          <CustomIcon
            v-if="emptyScript"
            class-name="row sheikah-icon"
            name="LongArrow"
          />
          <CustomIcon
            v-else
            class-name="row sheikah-icon"
            name="OperatorArrow"
          />
          <div
            v-if="emptyScript"
            class="add-operator-container"
            @click="addOperator"
          >
            <CustomIcon
              class-name="add-operator"
              data-test="add-operator"
              name="AddOperator"
            />
            <p class="add-operator-text">{{ $t('add_operator') }}</p>
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
    <!-- FIXME: Update text when the aggregation and tally stages are ready to merge -->
    <ScriptInfo
      class="first description"
      :index="0"
      :info="$t('script_header', { variable: url })"
    />
    <div class="operators">
      <div
        v-for="(operator, index) in script"
        :key="operator.toString() + index"
        class="operator-container"
      >
        <RadonOperator
          data-test="radon-operator"
          class="operator"
          :operator="operator"
          :stage="stage"
          :script-id="scriptId"
          :source-index="sourceIndex"
          :show-output-type="index !== script.length - 1"
          :operator-output="partialResults ? partialResults[index + 1] : null"
          :subscript-partial-results="subscriptPartialResults"
          :error="radonError"
          @add-operator="addOperator"
          @delete-operator="removeOperator(operator.scriptId, operator.id)"
        />
        <ScriptInfo
          class="description"
          :index="index + 1"
          :info="operator.selected.description"
        />
      </div>
    </div>
    <div class="script-footer">
      <p class="text">
        {{ $t('return_script') }}
      </p>
    </div>
    <!-- FIXME: Update text when the aggregation and tally stages are ready to merge -->
    <ScriptInfo
      class="last description"
      :index="script.length + 1"
      :info="$t('script_footer')"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { PUSH_OPERATOR, DELETE_OPERATOR } from '@/store/mutation-types'
import { standardizeOperatorName } from '@/utils'
import OperatorOutput from '@/components/OperatorOutput.vue'
import ScriptInfo from '@/components/ScriptInfo.vue'
import RadonOperator from '@/components/RadonOperator.vue'
import CustomIcon from '@/components/CustomIcon.vue'

export default {
  name: 'RadonScript',
  components: { RadonOperator, ScriptInfo, OperatorOutput, CustomIcon },
  props: {
    stage: {
      type: String,
      default: '',
    },
    sourceIndex: {
      type: Number,
      default: null,
    },
    script: {
      type: Array,
      required: true,
    },
    partialResults: {
      type: [Array, Object],
      default: null,
    },
    subscriptPartialResults: {
      type: [Array, Object],
      default: null,
    },
    finalResult: {
      type: Object,
      default: () => {},
    },
    scriptId: {
      type: Number,
      default: null,
    },
    protocol: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },
  computed: {
    emptyScript() {
      return this.script.length < 1
    },
    scriptInfo() {
      return [
        {
          description:
            'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
        },
      ]
    },
    radonError() {
      return this.finalResult && this.finalResult.RadonError
        ? this.finalResult.RadonError
        : null
    },
    firstOutput() {
      return this.partialResults ? this.partialResults[0] : null
    },
    firstError() {
      return this.firstOutput && this.firstOutput.RadonError
        ? this.firstOutput.RadonError
        : null
    },
    outputLabel() {
      if (this.firstOutput) {
        const innerOutput = Object.keys(this.firstOutput)[0]
        return standardizeOperatorName(innerOutput)
      } else if (this.firstError) {
        return 'error'
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
  border-left: var(--script-operators-info-border);
  border-right: var(--script-operators-info-border);

  &.last {
    border-bottom: var(--script-operators-info-border);
  }

  &.first {
    border-top: var(--script-operators-info-border);
  }
}

.top {
  margin: 16px 16px 0;

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
    border: var(--operators-dashed-border);
    display: flex;
    position: relative;

    .url {
      color: var(--text-low-emphasis);
      font-size: 14px;
      font-weight: medium;
      max-width: 100%;
      overflow-wrap: break-word;
      padding: 16px;

      .protocol {
        font-size: 12px;
      }
    }
  }
}

.script-footer {
  border: var(--operators-dashed-border);
  display: flex;
  height: min-content;
  margin: 0 16px 16px;

  .text {
    color: var(--text-medium-emphasis);
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
      color: var(--text-medium-emphasis);
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

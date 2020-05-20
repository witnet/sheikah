<template>
  <div class="radon-script">
    <div class="top">
      <div class="script-header">
        <p class="url">
          {{ url }} <span class="protocol">({{ protocol }})</span>
        </p>
      </div>
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
        <div v-if="emptyScript" class="add-operator-container">
          <img
            class="add-operator"
            src="@/resources/svg/add-operator.svg"
            @click="addOperator"
          />
          <p class="add-operator-text">Click to add an operator</p>
        </div>
      </div>
    </div>
    <!-- FIXME: Update text when the aggregation and tally stages are ready to merge -->
    <ScriptInfo
      class="first description"
      :index="0"
      :info="scriptInfo[0].description"
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
          @add-operator="addOperator"
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
        Return and past into aggregator
      </p>
    </div>
    <!-- FIXME: Update text when the aggregation and tally stages are ready to merge -->
    <ScriptInfo
      class="last description"
      :index="scriptInfo.length - 1"
      :info="scriptInfo[scriptInfo.length - 1].description"
    />
  </div>
</template>

<script>
import { PUSH_OPERATOR } from '@/store/mutation-types'
import ScriptInfo from '@/components/ScriptInfo'
import RadonOperator from '@/components/RadonOperator'
import { mapMutations } from 'vuex'

export default {
  name: 'RadonScript',
  components: { RadonOperator, ScriptInfo },
  props: {
    stage: {
      type: String,
      default: '',
    },
    sourceIndex: {
      type: Number,
      required: true,
    },
    script: {
      type: Array,
      required: true,
    },
    scriptId: {
      type: Number,
      required: true,
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
      // FIXME: Update text when the aggregation and tally stages are ready to merge
      const operatorsInfo = []
      this.script.forEach(info => {
        operatorsInfo.push({
          description:
            'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
        })
      })
      const first = {
        description:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      }
      const last = {
        description:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      }
      const firstAdded = [first].concat(operatorsInfo)
      const lastAdded = firstAdded.concat([last])
      return lastAdded
    },
  },
  methods: {
    ...mapMutations({
      pushOperator: PUSH_OPERATOR,
    }),
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
  grid-template-columns: minmax(430px, 1fr) 300px;
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

  .icon-container {
    margin-left: 16px;
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

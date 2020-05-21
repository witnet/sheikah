<template>
  <div class="radon-script">
    <div class="script-header">
      <p class="url" data-test="header">
        {{ header }}
      </p>
    </div>
    <div class="icon-container">
      <img class="row sheikah-icon" src="@/resources/svg/operator-arrow.svg" />
    </div>
    <div v-if="type === 'filters'">
      <div v-for="(operator, index) in filters" :key="operator.toString() + index">
        <RadonOperator
          data-test="filter-operator"
          :operator="operator"
          :script-id="scriptId"
          :source-index="sourceIndex"
          :show-output-type="index !== filters.length - 1"
          @add-operator="addOperator"
        />
      </div>
    </div>
    <div v-else>
      <RadonOperator
        data-test="reducer-operator"
        :operator="reducer"
        :script-id="scriptId"
        :source-index="sourceIndex"
        :show-output-type="true"
        @add-operator="addOperator"
      />
    </div>
    <div class="script-footer">
      <p class="text" data-test="footer">
        {{ footer }}
      </p>
    </div>
  </div>
</template>

<script>
import { PUSH_OPERATOR } from '@/store/mutation-types'
import RadonOperator from '@/components/RadonOperator'
import { mapMutations } from 'vuex'

export default {
  name: 'RadonAggregateTallyScript',
  components: { RadonOperator },
  props: {
    sourceIndex: {
      required: false,
      default: null,
      type: Number,
    },
    script: {
      required: false,
      default: null,
      type: [Object, Array]
    },
    scriptId: {
      required: false,
      default: null,
      type: Number,
    },
    type: {
      required: false,
      default: null,
      type: String,
    }
  },
  computed: {
    header() {
      return this.type === 'filters'
        ? 'From x sources and companion scripts'
        : 'From aggregation filters'
    },
    footer() {
      return this.type === 'filters'
        ? 'Into aggregation reducer'
        : 'Return and report to the network'
    },
    filters() {
      return this.script.filters
    },
    reducer() {
      return this.script.reducer
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

.script-footer {
  align-items: center;
  border: $operator-dashed-border;
  display: flex;

  .text {
    color: $grey-3;
    font-size: 14px;
    font-weight: medium;
    margin: 16px;
  }
}

.icon-container {
  margin-left: 16px;
}

.radon-script {
  padding: 16px 24px;
  width: 100%;
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

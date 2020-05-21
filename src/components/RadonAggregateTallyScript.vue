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
          :scriptId="scriptId"
          :sourceIndex="sourceIndex"
          :showOutputType="index !== filters.length - 1"
          @add-operator="addOperator"
        />
      </div>
    </div>
    <div v-else>
      <RadonOperator
        data-test="reducer-operator"
        :operator="reducer"
        :scriptId="scriptId"
        :sourceIndex="sourceIndex"
        :showOutputType="true"
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
    sourceIndex: Number,
    script: [Object, Array],
    scriptId: Number,
    type: String,
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
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
.script-header {
  border: $operator-dashed-border;
  display: flex;
  align-items: center;
  .url {
    margin: 16px;
    color: $grey-3;
    font-weight: medium;
    font-size: 14px;
    .protocol {
      font-size: 12px;
    }
  }
}
.script-footer {
  border: $operator-dashed-border;
  display: flex;
  align-items: center;
  .text {
    margin: 16px;
    color: $grey-3;
    font-weight: medium;
    font-size: 14px;
  }
}
.icon-container {
  margin-left: 16px;
}
.radon-script {
  width: 100%;
  padding: 16px 24px;
}
.button-container {
  margin-top: 16px;
  text-align: center;

  .add-operators-btn {
    cursor: pointer;
    margin: 32px;
    width: 150px;
    padding: 8px;
    font-size: 16px;
    background-color: $purple-4;
    border-radius: 5px;
    color: $white;
    font-family: 'Roboto';
    font-weight: bold;

    &:active,
    &:focus {
      outline: none;
    }
  }
}
</style>

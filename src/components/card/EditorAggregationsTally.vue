<template>
  <div>
    <Fieldset :title="filtersTitle" :closable="false">
      <Card class="card" shadow="thin" :border="false" :padding="false">
        <RadonAggregateTallyScript
          :script="script"
          :scriptId="script.reducer.scriptId"
          type="filters"
          :header="filtersHeader"
          :footer="filtersFooter"
          :headerScriptInfo="filtersHeaderScriptInfo"
          :footerScriptInfo="filtersFooterScriptInfo"
          :partialResults="results"
          :finalResult="finalResult ? finalResult : null"
        />
      </Card>
    </Fieldset>
    <Fieldset :title="reducerTitle" :closable="false">
      <Card class="card" shadow="thin" :border="false" :padding="false">
        <RadonAggregateTallyScript
          :script="script"
          stage="aggregate"
          type="reducer"
          :header="reducerHeader"
          :footer="reducerFooter"
          :headerScriptInfo="reducerHeaderScriptInfo"
          :footerScriptInfo="reducerFooterScriptInfo"
          :partialResults="results"
          :finalResult="finalResult"
        />
      </Card>
    </Fieldset>
  </div>
</template>

<script>
import RadonAggregateTallyScript from '@/components/RadonAggregateTallyScript.vue'
import Card from '@/components/card/Card'
import Fieldset from '@/components/Fieldset'

export default {
  name: 'EditorAggregationsTally',
  components: {
    Fieldset,
    Card,
    RadonAggregateTallyScript,
  },
  props: {
    script: {
      type: Object,
      required: true,
    },
    sources: {
      type: Number,
      default: null,
      required: false,
    },
    stage: {
      type: String,
      required: true,
    },
    finalResult: {
      type: Object,
      required: false,
      default: () => {},
    },
    results: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  computed: {
    filtersLength() {
      return this.script.filters.length
    },
    filtersTitle() {
      return this.stage === 'aggregation'
        ? `Aggregation filters ${this.filtersLength}`
        : `Tally filters ${this.filtersLength}`
    },
    reducerTitle() {
      return this.stage === 'aggregation'
        ? 'Aggregation reducer'
        : 'Tally reducer'
    },
    filtersHeader() {
      return this.stage === 'aggregation'
        ? `From ${this.sources} sources and companion scripts`
        : 'As many results as witnessing nodes'
    },
    filtersFooter() {
      return this.stage === 'aggregation'
        ? 'Into aggregation reducer'
        : 'Return results that pass the filters'
    },
    filtersHeaderScriptInfo() {
      return this.stage === 'aggregation'
        ? 'Collect the results from the source scripts.'
        : 'Collect the results reported by as many witnessing nodes as required in the request'
    },
    filtersFooterScriptInfo() {
      return this.stage === 'aggregation'
        ? 'Feed into the Aggregator reducer below only the values that passed the Aggregator filters.'
        : 'Feed into the Tally reducer below only the values that passed the Tally filters.'
    },
    reducerHeader() {
      return this.stage === 'aggregation'
        ? 'From aggregation filters'
        : 'From tally filters'
    },
    reducerFooter() {
      return this.stage === 'aggregation'
        ? 'Return and report to the network'
        : 'Return final data request result'
    },
    reducerHeaderScriptInfo() {
      return 'Collect the results that passed the filters above.'
    },
    reducerFooterScriptInfo() {
      return this.stage === 'aggregation'
        ? 'Cryptographically commit to the result, and eventually reveal it once all the witnesses have committed their own result.'
        : 'Publish the result into a Tally function in a new block on the Witnet block chain.'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card {
  margin-bottom: 16px;
}
</style>

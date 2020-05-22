<template>
  <div>
    <Fieldset :title="filtersTitle" :closable="false">
      <Card class="card" shadow="thin" :border="false" :padding="false">
        <div class="form">
          <RadonAggregateTallyScript
            :script="script"
            :script-id="script.reducer.scriptId"
            type="filters"
            :header="filtersHeader"
            :footer="filtersFooter"
          />
          <div class="script-info"></div>
        </div>
      </Card>
    </Fieldset>
    <Fieldset :title="reducerTitle" :closable="false">
      <Card class="card" shadow="thin" :border="false" :padding="false">
        <div class="form">
          <RadonAggregateTallyScript
            :script="script"
            stage="aggregate"
            type="reducer"
            :header="reducerHeader"
            :footer="reducerFooter"
          />
          <div class="script-info"></div>
        </div>
      </Card>
    </Fieldset>
  </div>
</template>

<script>
import RadonAggregateTallyScript from '@/components/RadonAggregateTallyScript.vue'
import Card from '@/components/card/Card'
import Fieldset from '@/components/Fieldset'

export default {
<<<<<<< HEAD:src/components/card/EditorAggregations.vue
  name: 'ScriptCard',
  components: {
    Fieldset,
    Card,
    RadonAggregateTallyScript,
  },
=======
  name: 'EditorAggregationsTally',
>>>>>>> feat: implement tally stage:src/components/card/EditorAggregationsTally.vue
  props: {
    script: {
      type: Object,
      required: true,
    },
    sources: {
      type: Number,
      required: false,
    },
    stage: {
      type: String,
      required: true,
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
      return this.stage === 'aggregation' ? 'Aggregation reducer' : 'Tally reducer'
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
    reducerHeader() {
      return this.stage === 'aggregation' ? 'From aggregation filters' : 'From tally filters'
    },
    reducerFooter() {
      return this.stage === 'aggregation'
        ? 'Return and report to the network'
        : 'Return final data request result'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card {
  margin-bottom: 16px;
  .form {
    font-size: 16px;
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-rows: auto;
    .script-info {
      background-color: $yellow-0;
      border: 1px solid $yellow-3;
    }
  }
}
</style>

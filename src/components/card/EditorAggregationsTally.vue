<template>
  <div>
    <Fieldset v-if="filtersSupported" :title="filtersTitle" :closable="false">
      <Card class="card" shadow="thin" :border="false" :padding="false">
        <RadonAggregateTallyScript
          :script="script"
          :script-id="script.reducer.scriptId"
          type="filters"
          :header="filtersHeader"
          :footer="filtersFooter"
          :header-script-info="filtersHeaderScriptInfo"
          :footer-script-info="filtersFooterScriptInfo"
          :partial-results="results"
          :final-result="finalResult"
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
          :header-script-info="reducerHeaderScriptInfo"
          :footer-script-info="reducerFooterScriptInfo"
          :partial-results="results"
          :final-result="finalResult"
        />
      </Card>
    </Fieldset>
  </div>
</template>

<script>
import RadonAggregateTallyScript from '@/components/RadonAggregateTallyScript.vue'
import Card from '@/components/card/Card.vue'
import Fieldset from '@/components/Fieldset.vue'

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
    },
    stage: {
      type: String,
      required: true,
    },
    finalResult: {
      type: Object,
      default: null,
    },
    filtersSupported: {
      type: Boolean,
      // eslint-disable-next-line vue/no-boolean-default
      default: true,
    },
    results: {
      type: Array,
      default: null,
    },
  },
  computed: {
    filtersLength() {
      return this.script.filters.length
    },
    filtersTitle() {
      return this.stage === 'aggregation'
        ? this.$t('filters_title_aggregation', { variable: this.filtersLength })
        : this.$t('filters_title_tally', { variable: this.filtersLength })
    },
    reducerTitle() {
      return this.stage === 'aggregation'
        ? this.$t('reducer_title_aggregation')
        : this.$t('reducer_title_tally')
    },
    filtersHeader() {
      return this.stage === 'aggregation'
        ? this.$t('filters_header_aggregation', { variable: this.sources })
        : this.$t('filters_header_tally')
    },
    filtersFooter() {
      return this.stage === 'aggregation'
        ? this.$t('filters_footer_aggregation')
        : this.$t('filters_footer_tally')
    },
    filtersHeaderScriptInfo() {
      return this.stage === 'aggregation'
        ? this.$t('filters_header_script_info_aggregation')
        : this.$t('filters_header_script_info_tally')
    },
    filtersFooterScriptInfo() {
      return this.stage === 'aggregation'
        ? this.$t('filters_footer_script_info_aggregation')
        : this.$t('filters_footer_script_info_tally')
    },
    reducerHeader() {
      return this.stage === 'aggregation'
        ? this.$t('reducer_header_aggregation')
        : this.$t('reducer_header_tally')
    },
    reducerFooter() {
      return this.stage === 'aggregation'
        ? this.$t('reducer_footer_aggregation')
        : this.$t('reducer_footer_tally')
    },
    reducerHeaderScriptInfo() {
      return this.$t('reducer_header_script_info')
    },
    reducerFooterScriptInfo() {
      return this.stage === 'aggregation'
        ? this.$t('reducer_footer_script_info_aggregation')
        : this.$t('reducer_footer_script_info_tally')
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 16px;
}
</style>

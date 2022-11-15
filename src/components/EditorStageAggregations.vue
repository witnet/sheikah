<template>
  <LayoutTwoColumns>
    <template v-slot:left>
      <EditorAggregationsTally
        :script="aggregations"
        stage="aggregation"
        :sources="sourcesLength"
        :results="results ? results.partial_results : null"
        :final-result="finalResult"
        :filters-supported="filtersSupported"
      />
    </template>

    <template v-slot:upperRight>
      <Fieldset :title="$t('aggregator_description_title')" type="help">
        <div>
          <i18n-t keypath="aggregations_description_0" tag="p" scope="global">
            <em>{{ $t('aggregations_description_1') }}</em>
          </i18n-t>
          <p>{{ $t('aggregations_description_2') }}</p>
        </div>
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset :title="$t('aggregator_rules_title')" type="help" scope="global">
        <div>
          <i18n-t keypath="aggregations_rule_1_0" tag="p" scope="global">
            <em>{{ $t('aggregations_rule_1_1') }}</em>
          </i18n-t>
          <i18n-t keypath="aggregations_rule_2_0" tag="p" scope="global">
            <em>{{ $t('aggregations_rule_2_1') }}</em>
          </i18n-t>
          <i18n-t keypath="aggregations_rule_3_0" tag="p" scope="global">
            <em>{{ $t('aggregations_rule_3_1') }}</em>
          </i18n-t>
          <i18n-t keypath="aggregations_rule_4_0" tag="p" scope="global">
            <em>{{ $t('aggregations_rule_4_1') }}</em>
            <em>{{ $t('aggregations_rule_4_2') }}</em>
          </i18n-t>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapState } from 'vuex'
import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'
import EditorAggregationsTally from '@/components/card/EditorAggregationsTally.vue'
import Fieldset from '@/components/Fieldset.vue'

export default {
  name: 'EditorStageAggregations',
  components: {
    Fieldset,
    LayoutTwoColumns,
    EditorAggregationsTally,
  },
  computed: {
    ...mapState({
      aggregations: state => state.rad.radRequest.getMarkup().aggregate,
      sourcesLength: state => state.rad.radRequest.getMarkup().retrieve.length,
      radRequestResult: state => state.wallet.radRequestResult,
      filtersSupported: state =>
        state.rad.radRequest.getMarkup().retrieve[0].kind !== 'RNG',
    }),
    results() {
      return this.radRequestResult
        ? this.radRequestResult.result.aggregate
        : null
    },
    finalResult() {
      return this.results ? this.results.result : null
    },
  },
}
</script>

<template>
  <LayoutTwoColumns>
    <template v-slot:left>
      <EditorAggregationsTally
        :script="tally"
        stage="tally"
        :results="results ? results.partial_results : null"
        :final-result="finalResult"
        :filters-supported="filtersSupported"
      />
    </template>

    <template v-slot:upperRight>
      <Fieldset :title="$t('tally_description_title')" type="help">
        <div>
          <i18n path="tally_description_0" tag="p">
            <em>{{ $t('tally_description_1') }}</em>
          </i18n>
        </div>
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset :title="$t('tally_rule_title')" type="help">
        <div>
          <p>{{ $t('tally_rules_intro') }}</p>
          <i18n path="tally_rule_1_0" tag="p">
            <em>{{ $t('tally_rule_1_1') }}</em>
          </i18n>
          <i18n path="tally_rule_2_0" tag="p">
            <em>{{ $t('tally_rule_2_1') }}</em>
          </i18n>
          <i18n path="tally_rule_3_0" tag="p">
            <em>{{ $t('tally_rule_3_1') }}</em>
          </i18n>
          <i18n path="tally_rule_4_0" tag="p">
            <em>{{ $t('tally_rule_4_1') }}</em>
          </i18n>
          <i18n path="tally_rule_5_0" tag="p">
            <em>{{ $t('tally_rule_5_1') }}</em>
          </i18n>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapState } from 'vuex'
import EditorAggregationsTally from '@/components/card/EditorAggregationsTally.vue'
import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'
import Fieldset from '@/components/Fieldset.vue'

export default {
  name: 'EditorStageTally',
  components: {
    Fieldset,
    LayoutTwoColumns,
    EditorAggregationsTally,
  },
  computed: {
    ...mapState({
      tally: state => state.rad.radRequest.getMarkup().tally,
      radRequestResult: state => state.wallet.radRequestResult,
      filtersSupported: state =>
        state.rad.radRequest.getMarkup().retrieve[0].kind !== 'RNG',
    }),
    results() {
      return this.radRequestResult ? this.radRequestResult.result.tally : null
    },
    finalResult() {
      return this.results ? this.results.result : null
    },
  },
}
</script>

<docs>
### Example
```jsx
  <EditorStageTally />
```
</docs>

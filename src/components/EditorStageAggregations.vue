<template>
  <LayoutTwoColumns>
    <template v-slot:left>
      <EditorAggregationsTally
        :script="aggregations"
        stage="aggregation"
        :sources="sourcesLength"
        :results="results ? results.partial_results : null"
        :final-result="finalResult"
      />
    </template>

    <template v-slot:upperRight>
      <Fieldset :title="$t('aggregator_description_title')" type="help">
        <div>
          <p>
            {{ $t('aggregations_description[0]') }}
            <em>{{ $t('aggregations_description[1]') }} </em
            >{{ $t('aggregations_description[2]') }}
          </p>
          <p>
            {{ $t('aggregations_description[3]') }}
          </p>
        </div>
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset :title="$t('aggregator_rules_title')" type="help">
        <div>
          <p
            >- {{ $t('aggregations_rule_1[0]') }}
            <em>{{ $t('aggregations_rule_1[1]') }} </em
            >{{ $t('aggregations_rule_1[2]') }}</p
          >
          <p
            >- {{ $t('aggregations_rule_2[0]') }}
            <em>{{ $t('aggregations_rule_2[1]') }}</em></p
          >
          <p
            >- {{ $t('aggregations_rule_3[0]')
            }}<em> {{ $t('aggregations_rule_3[1]') }}</em></p
          >
          <p
            >- {{ $t('aggregations_rule_4[0]') }}
            <em>{{ $t('aggregations_rule_4[1]') }}</em>
            {{ $t('aggregations_rule_4[2]')
            }}<em>{{ $t('aggregations_rule_4[3]') }}</em>
          </p>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapState } from 'vuex'
import LayoutTwoColumns from '@/components/LayoutTwoColumns'
import EditorAggregationsTally from '@/components/card/EditorAggregationsTally.vue'
import Fieldset from '@/components/Fieldset'

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

<docs>
### Example
```jsx
  <EditorStageAggregations />
```
</docs>

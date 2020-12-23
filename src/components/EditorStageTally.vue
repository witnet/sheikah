<template>
  <LayoutTwoColumns>
    <template v-slot:left>
      <EditorAggregationsTally
        :script="tally"
        stage="tally"
        :results="results ? results.partial_results : null"
        :final-result="finalResult"
      />
    </template>

    <template v-slot:upperRight>
      <Fieldset :title="$t('tally_description_title')" type="help">
        <div>
          <p>
            {{ $t('tally_description[0]') }}
            <em>{{ $t('tally_description[1]') }}</em
            >.
          </p>
        </div>
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset :title="$t('tally_rule_title')" type="help">
        <div>
          <p>{{ $t('tally_rules_intro') }}</p>
          <p
            >- {{ $t('tally_rule_1[0]') }} <em>{{ $t('tally_rule_1[1]') }}</em
            >.</p
          >
          <p
            >- {{ $t('tally_rule_2[0]') }}<em>{{ $t('tally_rule_2[1]') }}</em
            >.</p
          >
          <p
            >- {{ $t('tally_rule_3[0]') }}<em>{{ $t('tally_rule_3[1]') }}</em
            >.</p
          >
          <p
            >- {{ $t('tally_rule_4[0]') }} <em>{{ $t('tally_rule_4[1]') }}</em
            >.</p
          >
          <p>
            - {{ $t('tally_rule_5[0]') }} <em>{{ $t('tally_rule_5[1]') }}</em>
            {{ $t('tally_rule_5[2]') }}
          </p>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapState } from 'vuex'
import EditorAggregationsTally from '@/components/card/EditorAggregationsTally.vue'
import LayoutTwoColumns from '@/components/LayoutTwoColumns'
import Fieldset from '@/components/Fieldset'

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

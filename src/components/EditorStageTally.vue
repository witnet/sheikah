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
      <Fieldset title="What is a tally?" type="help">
        <div>
          <p>
            Tallies are really similar to aggregators, but instead of merging
            multiple sources, they
            <em>merge the results reported by multiple Witnet nodes</em>.
          </p>
        </div>
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset title="The rules of tallies" type="help">
        <div>
          <p>The rules for aggregators also apply here:</p>
          <p
            >- Every Witnet request needs to have
            <em>exactly one tally function</em>.</p
          >
          <p>- The tally must contain <em>zero, one or more filters</em>.</p>
          <p>- The tally must contain <em>exactly one reducer</em>.</p>
          <p
            >- Tallies
            <em>merge the results reported by multiple witnessing nodes</em>.</p
          >
          <p>
            - Tallies are <em>executed by miners</em> and validated by every
            node in the Witnet network.
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

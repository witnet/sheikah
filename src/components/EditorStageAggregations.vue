<template>
  <LayoutTwoColumns>
    <template v-slot:left>
      <EditorAggregations :script="aggregations" />
    </template>

    <template v-slot:upperRight>
      <Fieldset title="What is an aggregator?" type="help">
        <div>
          <p>
            Aggregators define how to reduce or
            <em
              >merge the result of multiple sources into a single data point</em
            >. They are similar to Javascript's .reduce() method or the fold
            higher-order function from many programming languages.
          </p>
          <p>
            In addition, aggregation functions give the chance to filter out any
            outliers by using one or more statistical primitives.
          </p>
        </div>
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset title="The rules of aggregators" type="help">
        <div>
          <p
            >- Every Witnet request needs to have
            <em>exactly one aggregator</em> function.</p
          >
          <p
            >- The aggregator must contain
            <em>zero, one or more filters.</em></p
          >
          <p>- The aggregator must contain <em>exactly one reducer.</em></p>
          <p>
            - When a Witnet node gets a request assigned for resolution, it
            retrieves every source, applies the source companion scripts on the
            retrieved data, collects the results into an Array, and then apply
            the aggregator on it, first running the <em>filters</em> and
            eventually the <em>reducer.</em>
          </p>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapState } from 'vuex'
import LayoutTwoColumns from '@/components/LayoutTwoColumns'
import EditorAggregations from '@/components/card/EditorAggregations.vue'
import Fieldset from '@/components/Fieldset'

export default {
  name: 'EditorStageAggregations',
  components: {
    Fieldset,
    LayoutTwoColumns,
    EditorAggregations,
  },
  computed: {
    ...mapState({
      aggregations: state => state.rad.radRequest.getMarkup().aggregate,
    }),
  },
}
</script>

<docs>
### Example
```jsx
  <EditorStageAggregations />
```
</docs>

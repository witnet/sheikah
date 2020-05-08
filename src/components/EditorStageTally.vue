<template>
  <LayoutTwoColumns>
    <template #left>Tally function</template>

    <template #upperRight>
      <Fieldset title="What is a tally?" type="help">
        <div>
          <p>
            Tallies are really similar to aggregators, but instead of merging multiple sources, they
            <em>merge the results reported by multiple Witnet nodes</em>.
          </p>
        </div>
      </Fieldset>
    </template>

    <template #bottomRight>
      <Fieldset title="The rules of tallies" type="help">
        <div>
          <p>The rules for aggregators also apply here:</p>
          <p>- Every Witnet request needs to have <em>exactly one tally function</em>.</p>
          <p>- The tally must contain <em>zero, one or more filters</em>.</p>
          <p>- The tally must contain <em>exactly one reducer</em>.</p>
          <p>- Tallies <em>merge the results reported by multiple witnessing nodes</em>.</p>
          <p>
            - Tallies are <em>executed by miners</em> and validated by every node in the Witnet
            network.
          </p>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import LayoutTwoColumns from '@/components/LayoutTwoColumns'
import Fieldset from '@/components/Fieldset'

export default {
  name: 'EditorStageTally',
  components: {
    Fieldset,
    LayoutTwoColumns,
  },
}
</script>

<docs>
### Example
```jsx
  <EditorStageTally />
```
</docs>

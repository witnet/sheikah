<template>
  <LayoutTwoColumns>
    <template #left>Sources</template>

    <template #upperRight>
      <Fieldset title="About data sources" type="help">
        <div>
          <p>
            Data sources are each of the endpoints from which you want Witnet to retrieve the data.
            Most times, these will be the URLs of public APIs.
          </p>
          <p>
            There is no limit to the number of sources in a single Witnet request—although the more
            sources, the higher the fees will be.
          </p>
          <p>
            In a later step, each source will be given a companion script that lists operations that
            we want the witnesses to apply on the retrieved data. This enables you to get the
            information of your interest extracted out of larger data structures like JSON objects.
          </p>
        </div>
      </Fieldset>
    </template>

    <template #bottomRight>
      <Fieldset title="Choose your sources carefully" type="help">
        <div>
          <p>
            Data sources are each of the endpoints from which you want Witnet to retrieve the data.
            Most times, these will be the URLs of public APIs.
          </p>
          <p>
            There is no limit to the number of sources in a single Witnet request—although the more
            sources, the higher the fees will be.
          </p>
          <p>
            In a later step, each source will be given a companion script that lists operations that
            we want the witnesses to apply on the retrieved data. This enables you to get the
            information of your interest extracted out of larger data structures like JSON objects.
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
  name: 'EditorStageSources',
  components: {
    Fieldset,
    LayoutTwoColumns,
  },
}
</script>

<docs>
### Example

```jsx
  <EditorStageSources />
```
</docs>

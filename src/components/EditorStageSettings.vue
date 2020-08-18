<template>
  <LayoutTwoColumns>
    <template v-slot:left>
      <EditorSettings :template="currentTemplate" />
    </template>

    <template v-slot:upperRight>
      <Fieldset title="What’s in a template?" type="help">
        <div>
          <p>
            Templates enable smart contract developers to easily build, extend,
            remix and share data requests thanks to the use of variables that
            can be customized when deploying an instance of the template.
          </p>
          <p>
            A template puts together multiple data sources plus one Aggregation
            and one Tally function.
          </p>
        </div>
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset title="About variables" type="help">
        <div>
          <p
            >Variables need to be defined here before using them in source
            scripts.</p
          >
          <p>
            Inserting variables in Source Scripts and Aggregation or Tally
            functions is as easy as writting.
          </p>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapState } from 'vuex'
import LayoutTwoColumns from '@/components/LayoutTwoColumns'
import EditorSettings from '@/components/EditorSettings'
import Fieldset from '@/components/Fieldset'

export default {
  name: 'EditorStageSettings',
  components: {
    Fieldset,
    EditorSettings,
    LayoutTwoColumns,
  },
  computed: {
    ...mapState({
      currentTemplate: state => state.rad.currentTemplate,
    }),
  },
}
</script>

<docs>
### Example
```jsx

  <EditorStageSettings />
```
</docs>

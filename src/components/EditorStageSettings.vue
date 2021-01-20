<template>
  <LayoutTwoColumns>
    <template v-slot:left>
      <EditorSettings :template="currentTemplate" />
    </template>

    <template v-slot:upperRight>
      <Fieldset :title="$t('template_description_title')" type="help">
        <div v-html="$t('template_description')" />
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset :title="$t('variables_description_title')" type="help">
        <div v-html="$t('variables_description')" />
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

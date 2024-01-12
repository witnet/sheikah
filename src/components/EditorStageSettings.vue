<template>
  <LayoutTwoColumns>
    <template #left>
      <EditorSettings :template="currentTemplate" />
    </template>

    <template #upperRight>
      <Fieldset :title="$t('template_description_title')" type="help">
        <div>
          <p>{{ $t('template_description_0') }}</p>
          <p>{{ $t('template_description_1') }}</p>
        </div>
      </Fieldset>
    </template>

    <template #bottomRight>
      <Fieldset :title="$t('variables_description_title')" type="help">
        <div>
          <p>{{ $t('variables_description_0') }}</p>
          <p>{{ $t('variables_description_1') }}</p>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapState } from 'vuex'
import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'
import EditorSettings from '@/components/EditorSettings.vue'
import Fieldset from '@/components/Fieldset.vue'

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

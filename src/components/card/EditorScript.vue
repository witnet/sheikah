<template>
  <Fieldset :title="title" :subtitle="subtitle" :closable="false">
    <Card shadow="thin" :border="false" :padding="false">
      <RadonScript
        :url="source.url"
        :protocol="source.kind"
        :script="source.script"
        stage="retrieve"
        :source-index="source.index"
        :script-id="source.scriptId"
        :partial-results="results"
        :subscript-partial-results="subscriptResults"
        :final-result="finalResult"
      />
    </Card>
  </Fieldset>
</template>

<script>
import RadonScript from '@/components/RadonScript.vue'
import Card from '@/components/card/Card.vue'
import Fieldset from '@/components/Fieldset.vue'

export default {
  name: 'EditorScript',
  components: {
    Fieldset,
    Card,
    RadonScript,
  },
  props: {
    source: {
      type: Object,
      required: true,
    },
    subscriptResults: {
      type: Array,
      default: null,
    },
    results: {
      type: Array,
      default: null,
    },
    finalResult: {
      type: Object,
      default: null,
    },
  },
  computed: {
    title() {
      return `Data source #${this.source.index}`
    },
    subtitle() {
      return this.source.url
    },
  },
}
</script>

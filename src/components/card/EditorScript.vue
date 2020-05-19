<template>
  <Fieldset :title="title" :subtitle="subtitle" :closable="false">
    <Card class="card" shadow="thin" :border="false" :padding="false">
      <RadonScript
        :url="source.url"
        :protocol="source.kind"
        :script="source.script"
        stage="retrieve"
        :source-index="source.index"
        :script-id="source.scriptId"
      />
    </Card>
  </Fieldset>
</template>

<script>
import RadonScript from '@/components/RadonScript'
import Card from '@/components/card/Card'
import Fieldset from '@/components/Fieldset'

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

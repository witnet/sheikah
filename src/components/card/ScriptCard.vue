<template>
  <Fieldset :title="title" :subtitle="subtitle" :closable="false">
    <Card class="card" shadow="thin" :border="false" :padding="false">
      <div class="form">
        <RadonScript
          :url="source.url"
          :protocol="source.kind"
          :script="source.script"
          stage="retrieve"
          :sourceIndex="source.index"
          :scriptId="source.scriptId"
        />
        <div class="script-info"></div>
      </div>
    </Card>
  </Fieldset>
</template>

<script>
import RadonScript from '@/components/RadonScript'
import Card from '@/components/card/Card'
import Fieldset from '@/components/Fieldset'

export default {
  name: 'ScriptCard',
  props: {
    source: Object,
  },
  components: {
    Fieldset,
    Card,
    RadonScript,
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

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card {
  .form {
    font-size: 16px;
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-rows: auto;
    .script-info {
      background-color: $yellow-0;
      border: 1px solid $yellow-3;
    }
  }
}
</style>

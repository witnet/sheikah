<template>
  <div>
    <Fieldset :title="filtersTitle" :closable="false">
      <Card class="card" shadow="thin" :border="false" :padding="false">
        <div class="form">
          <RadonAggregateTallyScript
            :script="script"
            :scriptId="script.reducer.scriptId"
            type="filters"
          />
          <div class="script-info"></div>
        </div>
      </Card>
    </Fieldset>
    <Fieldset :title="reducerTitle" :closable="false">
      <Card class="card" shadow="thin" :border="false" :padding="false">
        <div class="form">
          <RadonAggregateTallyScript :script="script" stage="aggregate" type="reducer" />
          <div class="script-info"></div>
        </div>
      </Card>
    </Fieldset>
  </div>
</template>

<script>
import RadonAggregateTallyScript from '@/components/RadonAggregateTallyScript.vue'
import Card from '@/components/card/Card'
import Fieldset from '@/components/Fieldset'

export default {
  name: 'ScriptCard',
  props: {
    script: {
      type: Object,
      required: true,
    },
  },
  components: {
    Fieldset,
    Card,
    RadonAggregateTallyScript,
  },
  computed: {
    filtersTitle() {
      return `Aggregation filters`
    },
    reducerTitle() {
      return 'Aggregation reducer'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card {
  margin-bottom: 16px;
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

<template>
  <div>
    <Fieldset :title="$t('template_settings')" :closable="false">
      <Card class="card" shadow="thin" :border="false">
        <RenameTemplate
          :id="template.id"
          :name="template.name"
          :description="template.description"
        />
      </Card>
    </Fieldset>
    <Fieldset class="variables" :title="$t('variables')" :closable="false">
      <Card class="card" shadow="thin" :border="false">
        <Variables />
      </Card>
    </Fieldset>
  </div>
</template>

<script>
import Card from '@/components/card/Card.vue'
import Fieldset from '@/components/Fieldset.vue'
import Variables from '@/components/Variables.vue'
import RenameTemplate from '@/components/RenameTemplate.vue'

export default {
  name: 'EditorSettings',
  components: {
    Fieldset,
    Card,
    RenameTemplate,
    Variables,
  },
  props: {
    /**
     * Current template
     */
    template: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      basicSettings: 'Basic template settings',
      variables: 'Variables',
    }
  },
  computed: {
    name() {
      return this.template.name
    },
    description() {
      return this.template.description
    },
    id() {
      return this.template.id
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.card {
  .form {
    align-items: center;
    column-gap: 10px;
    display: grid;
    grid-template: repeat(3, auto) / 130px 1fr;

    .label {
      color: var(--text-medium-emphasis);
      font-size: 14px;
    }
  }
}

.variables {
  margin: 24px 0;
}
</style>

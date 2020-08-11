<template>
  <div class="info">
    <label class="label" data-test="name-label">Name</label>
    <el-input
      v-model="localName"
      data-test="template-name-input"
      placeholder="Add a template name"
    />
    <label class="label" data-test="description-label">Description</label>
    <el-input
      v-model="localDescription"
      type="textarea"
      :rows="3"
      data-test="template-description-input"
      placeholder="Add a description for this template"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RenameTemplate',
  props: {
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localName: this.name,
      localDescription: this.description,
    }
  },
  watch: {
    localName(val) {
      this.changeTemplateName({ id: this.id, name: val })
    },
    localDescription(val) {
      this.changeTemplateDescription({ id: this.id, description: val })
    },
  },
  methods: {
    ...mapActions(['changeTemplateName', 'changeTemplateDescription']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.info {
  align-items: center;
  column-gap: 16px;
  display: grid;
  grid-template-columns: max-content auto;
  grid-template-rows: auto auto;
  row-gap: 16px;

  .label {
    color: $grey-5;
    font-size: 14px;
  }
}
</style>

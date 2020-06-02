<template>
  <div class="info">
    <label class="label" data-test="name-label">Name</label>
    <el-input
      v-model="updateName"
      data-test="template-name-input"
      :placeholder="name"
    />
    <label class="label" data-test="description-label">Description</label>
    <el-input
      v-model="updateDescription"
      type="textarea"
      :rows="3"
      data-test="template-description-input"
      :placeholder="description"
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
  computed: {
    updateName: {
      get() {
        return this.name
      },
      set(newName) {
        this.changeTemplateName({ id: this.id, name: newName })
      },
    },
    updateDescription: {
      get() {
        return this.description
      },
      set(newDescription) {
        this.changeTemplateDescription({
          id: this.id,
          description: newDescription,
        })
      },
    },
  },
  methods: {
    ...mapActions({
      changeTemplateName: 'changeTemplateName',
      changeTemplateDescription: 'changeTemplateDescription',
    }),
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

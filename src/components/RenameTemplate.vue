<template>
  <el-dialog title="Rename template" :visible="true" width="30%">
    <div class="info">
      <p class="label">Name</p>
      <el-input data-test="template-name-input" :placeholder="name" v-model="updateName" />
      <p class="label">Description</p>
      <el-input
        type="textarea"
        :rows="3"
        data-test="template-description-input"
        :placeholder="description"
        v-model="updateDescription"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Cancel</el-button>
      <el-button type="primary" @click="handleClose">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'TemplateCard',
  props: {
    name: String,
    description: String,
    id: String,
  },
  computed: {
    style() {
      return this.type
    },
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
        this.changeTemplateDescription({ id: this.id, description: newDescription })
      },
    },
  },
  methods: {
    ...mapActions({
      changeTemplateName: 'changeTemplateName',
      changeTemplateDescription: 'changeTemplateDescription',
    }),
    handleClose() {
      this.$emit('close-modal')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
.info {
  display: grid;
  grid-template-columns: max-content auto;
  grid-template-rows: auto auto;
  row-gap: 16px;
  column-gap: 16px;
  align-items: center;
}
</style>

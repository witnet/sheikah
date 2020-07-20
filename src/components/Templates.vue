<template>
  <div class="templates" data-test="templates">
    <div class="templates-bar">
      <p class="title">
        Data Request Templates
        <span class="templates-number">{{ templates.length }}</span>
      </p>
      <el-button class="import-btn" type="primary" @click="importTemplate">
        <font-awesome-icon class="icon" icon="file-import" />
        Import template
      </el-button>
    </div>

    <div class="container-templates">
      <div
        v-show="currentPage === 1"
        data-test="create-template"
        class="add"
        @click="createTemplateAndRedirect"
      >
        <img class="add-btn" src="@/resources/svg/add.svg" />
        <p class="text">Create a new template</p>
      </div>
      <TemplateCard
        v-for="template in paginatedTemplates"
        :id="template.id"
        :key="template.id"
        class="card"
        :name="template.name"
        :sources="template.radRequest.retrieve.length"
        :description="template.description"
        @toggle-modal="displayModalCreateDR(template)"
      />
    </div>

    <div v-show="templates.length > templatesPerPage" class="pagination-nav">
      <el-pagination
        :page-size="templatesPerPage"
        layout="prev, pager, next"
        :total="templates.length"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>
    <input
      ref="fileInput"
      :style="{ display: 'none' }"
      type="file"
      @change="readFile"
    />
    <DeployDataRequest
      v-if="dialogVisible"
      :template="currentTemplate"
      :visible="dialogVisible"
      @close="closeDeployModal"
    />
  </div>
</template>

<script>
import DeployDataRequest from '@/components/DeployDataRequest.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import { CREATE_TEMPLATE } from '@/store/mutation-types'
import TemplateCard from './card/TemplateCard'

export default {
  name: 'Templates',
  components: {
    TemplateCard,
    DeployDataRequest,
  },
  data() {
    return {
      currentPage: 1,
      tabs: [{ name: 'Templates', link: '/request/templates' }],
      dialogVisible: false,
      currentTemplate: null,
    }
  },
  computed: {
    templatesPerPage() {
      return this.currentPage === 1 ? 8 : 9
    },
    paginatedTemplates() {
      const from =
        this.currentPage * this.templatesPerPage - this.templatesPerPage
      const to = this.currentPage * this.templatesPerPage
      return this.templates.slice(from, to)
    },
    ...mapState({
      templates: state =>
        Object.entries(state.rad.templates)
          .map(template => {
            return {
              id: template[0],
              ...template[1],
            }
          })
          .sort(
            (a, b) => parseInt(b.lastTimeOpened) - parseInt(a.lastTimeOpened),
          ),
    }),
  },
  beforeMount() {
    this.getTemplates()
  },
  beforeDestroy() {
    if (this.saveItemError) {
      this.clearError({ error: this.saveItemError.name })
    }
    if (this.getItemError) {
      this.clearError({ error: this.getItemError.name })
    }
  },
  methods: {
    ...mapMutations({
      createTemplate: CREATE_TEMPLATE,
      clearError: 'clearError',
    }),
    ...mapActions({
      getTemplates: 'getTemplates',
      saveTemplate: 'saveTemplate',
    }),
    closeDeployModal() {
      this.dialogVisible = false
    },
    createTemplateAndRedirect() {
      this.createTemplate()
      this.$router.push('/request/editor')
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    toggleUpdated() {
      this.variablesUpdated = !this.variablesUpdated
    },
    displayModalCreateDR: function(currentTemplate) {
      this.dialogVisible = true
      this.currentTemplate = currentTemplate
    },
    importTemplate() {
      this.$refs.fileInput.click()
    },
    readFile(e) {
      const file = this.$refs.fileInput.files[0]
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          const fileText = reader.result
          try {
            const template = JSON.parse(fileText)
            // try to save template if it is valid
            this.saveTemplate({ template })

            // clear file input to be able to try to load the same file twitce
            this.$refs.fileInput.value = ''
          } catch (error) {
            console.log('Error parsing json')
          }
        },
        false,
      )
      reader.readAsText(file)
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.templates {
  padding-bottom: 16px;

  .templates-bar {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    height: 70px;
    justify-content: right;
    text-align: right;

    .title {
      font-weight: bold;
      margin: 16px 0 0 32px;

      .templates-number {
        color: $grey-4;
        font-size: 14px;
        font-weight: normal;
        margin-left: 8px;
      }
    }

    .import-btn {
      margin: 0 16px 0 auto;
    }
  }

  .pagination-nav {
    padding: 16px 0 0 0;
    text-align: center;
  }

  .container-templates {
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fill, 300px);
    margin: 0 32px;

    .add {
      align-items: center;
      background-color: $white;
      border: 1px solid $grey-1;
      border-radius: 2px;
      box-shadow: 1px 2px 8px 0 rgba(207, 207, 207, 0.329);
      display: flex;
      flex-direction: column;
      height: 300px;
      justify-content: center;
      width: 300px;

      .add-btn {
        width: 50px;
      }

      .text {
        color: $grey-3;
        font-size: 12px;
        font-style: italic;
        margin-top: 24px;
      }

      &:hover {
        border: 1px solid $purple-4;
        cursor: pointer;
      }
    }
  }
}
</style>

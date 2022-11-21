<template>
  <div class="templates" data-test="templates">
    <div class="templates-bar">
      <p class="title">
        {{ $t('dr_templates') }}
      </p>
      <el-button class="import-btn" type="primary" @click="importTemplate">
        <font-awesome-icon class="icon" icon="file-import" />
        {{ $t('import_templates') }}
      </el-button>
    </div>

    <div class="container-templates">
      <div
        v-show="currentPage === 1"
        data-test="create-template"
        class="add"
        @click="createTemplateAndRedirect"
      >
        <!-- <img class="add-btn" src="@/resources/svg/add.svg" /> -->
        <CustomIcon class="add-btn" name="add" />
        <p class="text">{{ $t('create_template') }}</p>
      </div>
      <TemplateCard
        v-for="template in paginatedTemplates"
        :id="template.id"
        :key="template.id"
        :name="template.name"
        :sources="template.radRequest.retrieve.length"
        :description="template.description"
        @delete-template="handleDeleteTemplate({ id: template.id })"
        @toggle-modal="displayModalCreateDR(template)"
      />
    </div>

    <div
      v-show="templates.length + 1 > templatesPerPage"
      class="pagination-nav"
    >
      <el-pagination
        :page-size="templatesPerPage"
        layout="prev, pager, next"
        :total="templates.length + 1"
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
import { mapState, mapActions, mapMutations } from 'vuex'
import TemplateCard from '@/components/card/TemplateCard.vue'

import DeployDataRequest from '@/components/SendTransaction/DeployDataRequest.vue'
import { CREATE_TEMPLATE } from '@/store/mutation-types'
import { TEMPLATES_PER_PAGE } from '@/constants'

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
      templatesPerPage: TEMPLATES_PER_PAGE,
    }
  },
  computed: {
    paginatedTemplates() {
      const from =
        this.currentPage === 1
          ? 0
          : this.currentPage * this.templatesPerPage - this.templatesPerPage - 1

      const to =
        this.currentPage === 1
          ? this.templatesPerPage - 1
          : this.currentPage * this.templatesPerPage - 1

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
      locale: state => state.wallet.locale,
    }),
  },
  beforeMount() {
    this.getTemplates()
  },
  beforeUnmount() {
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
      deleteTemplate: 'deleteTemplate',
    }),
    closeDeployModal() {
      this.dialogVisible = false
    },
    createTemplateAndRedirect() {
      this.createTemplate({ locale: this.locale })
      this.$router.push('/request/editor')
    },
    handleDeleteTemplate({ id }) {
      if (this.paginatedTemplates.length === 1 && this.currentPage !== 1) {
        this.currentPage -= 1
      }
      this.deleteTemplate({ id })
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    toggleUpdated() {
      this.variablesUpdated = !this.variablesUpdated
    },
    displayModalCreateDR: function (currentTemplate) {
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
        color: var(--text-medium-emphasis);
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
    padding: 16px 0 0;
    text-align: center;
  }

  .container-templates {
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fill, 300px);
    margin: 0 32px;
    overflow-y: auto;

    .add {
      align-items: center;
      background-color: var(--card-background);
      border: var(--card-border);
      border-radius: 2px;
      box-shadow: var(--card-shadow);
      display: flex;
      flex-direction: column;
      height: 300px;
      justify-content: center;
      width: 300px;

      .add-btn {
        width: 50px;
      }

      .text {
        color: var(--text-medium-emphasis);
        font-size: 12px;
        font-style: italic;
        margin-top: 24px;
      }

      &:hover {
        border: var(--card-active-border);
        cursor: pointer;
      }
    }
  }
}
</style>

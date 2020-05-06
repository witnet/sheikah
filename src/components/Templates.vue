<template>
  <div data-test="templates">
    <div class="templates-bar">
      <p class="title">
        Data Request Templates <span class="templates-number">{{ templates.length }}</span>
      </p>
      <el-button class="import-btn" @click="importTemplate" type="primary">
        <font-awesome-icon class="icon" icon="file-import" />
        Import template
      </el-button>
    </div>
    <div class="centered">
      <div v-if="Object.entries(paginatedItems)" class="container-templates">
        <div
          data-test="create-template"
          @click="createTemplateAndRedirect()"
          v-show="currentPage === 1"
          class="add"
        >
          <img class="add-btn" src="@/resources/svg/add.svg" />
          <p class="text">Create a new template</p>
        </div>
        <TemplateCard
          v-for="template in paginatedItems"
          class="card"
          :name="template.name"
          :id="template.id"
          :sources="template.radRequest.retrieve.length"
          :description="template.description"
          :key="template.id"
          v-on:toggle-modal="displayModalCreateDR(template)"
        />
      </div>
      <div v-else>
        You don't have templates yet.
      </div>
    </div>
    <div v-show="templates.length" class="pagination-nav">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="itemsPerPage"
        layout="prev, pager, next"
        :total="templates.length"
        :current-page="currentPage"
      />
    </div>
    <input :style="{ display: 'none' }" type="file" ref="fileInput" @change="readFile" />
    <DeployDataRequest
      v-if="dialogVisible"
      v-on:close="closeDeployModal"
      :template="currentTemplate"
      :visible="dialogVisible"
    />
  </div>
</template>

<script>
import TemplateCard from './card/TemplateCard'
import DeployDataRequest from '@/components/DeployDataRequest.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import { CREATE_TEMPLATE } from '@/store/mutation-types'

export default {
  name: 'Templates',
  components: {
    TemplateCard,
    DeployDataRequest,
  },
  beforeMount() {
    this.getTemplates()
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 7,
      tabs: [{ name: 'Templates', link: '/request/templates' }],
      dialogVisible: false,
      currentTemplate: null,
    }
  },
  computed: {
    paginatedItems() {
      this.getItemsPerPage()
      const from = this.currentPage * this.itemsPerPage - this.itemsPerPage
      const to = this.currentPage * this.itemsPerPage
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
          .sort((a, b) => parseInt(a.creationDate) - parseInt(b.creationDate)),
    }),
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
    getItemsPerPage() {
      this.currentPage === 1 ? (this.itemsPerPage = 7) : (this.itemsPerPage = 8)
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
            // TODO: Validate template before save
            this.saveTemplate({ template })
          } catch (error) {
            console.log('Error parsing json')
          }
        },
        false
      )
      reader.readAsText(file)
    },
  },
  beforeDestroy() {
    if (this.saveItemError) {
      this.clearError({ error: this.saveItemError.name })
    }
    if (this.getItemError) {
      this.clearError({ error: this.getItemError.name })
    }
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
.templates-bar {
  display: flex;
  flex-flow: row wrap;
  text-align: right;
  justify-content: right;
  align-items: center;
  height: 70px;
  .title {
    margin: 16px 0px 0px 32px;
    font-weight: bold;
    .templates-number {
      margin-left: 8px;
      font-weight: normal;
      font-size: 14px;
      color: $grey-4;
    }
  }
  .import-btn {
    margin: 0px 16px 0px auto;
  }
}
.pagination-nav {
  padding: 16px 0px 16px 0px;
  text-align: center;
}
.centered {
  min-height: 700px;
  margin: 0px 16px;
}
.container-templates {
  width: 100%;
  margin: 0px 16px;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, 300px);
  .add {
    box-shadow: 1px 2px 8px 0px rgba(207, 207, 207, 0.329);
    border: 1px solid $grey-1;
    background-color: $white;
    border-radius: 2px;
    display: flex;
    width: 300px;
    height: 300px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .add-btn {
      width: 50px;
    }
    .text {
      margin-top: 24px;
      font-size: 12px;
      color: $grey-3;
      font-style: italic;
    }
    &:hover {
      cursor: pointer;
      border: 1px solid $purple-4;
    }
  }
}
</style>

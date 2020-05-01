<template>
  <div data-test="templates">
    <div class="templates-bar">
      <TopBar :tabs="tabs">
        <template v-slot:tool>
          <button class="tool-btn" @click="importTemplate">
            <font-awesome-icon class="icon" icon="file-import" />
            Import template
          </button>
        </template>
      </TopBar>
    </div>
    <div class="centered">
      <div v-if="Object.entries(paginatedItems)" class="container-templates">
        <div v-show="currentPage === 1" class="add">
          <router-link to="/request/editor">
            <img
              data-test="create-template"
              @click="createTemplate"
              class="add-btn"
              src="@/resources/svg/add.svg"
            />
          </router-link>
        </div>
        <TemplateCard
          v-for="template in paginatedItems"
          class="card"
          :name="template.name"
          :id="template.id"
          :description="template.description"
          :key="template.id"
          :date="template.creationDate"
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
import TopBar from '@/components/TopBar'
import { CREATE_TEMPLATE } from '@/store/mutation-types'

export default {
  name: 'Templates',
  components: {
    TopBar,
    TemplateCard,
    DeployDataRequest,
  },
  beforeMount() {
    this.getTemplates()
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 8,
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
    getItemsPerPage() {
      this.currentPage === 1 ? (this.itemsPerPage = 8) : (this.itemsPerPage = 9)
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
  background-color: $white;
  display: flex;
  flex-flow: row wrap;
  height: 70px;
  text-align: right;

  .icon {
    margin-right: 8px;
  }
  .tool-btn {
    color: $alt-grey-2;
    font-family: 'Roboto';
    font-weight: bold;
    font-size: 1em;
    padding: 16px 24px;
    background-color: transparent;
    border: none;

    &:active,
    &:focus,
    &:hover {
      outline: none;
    }

    &:hover {
      cursor: pointer;
      background-color: $alpha-purple;
    }
  }
}
.pagination-nav {
  padding: 16px 0px 16px 0px;
  text-align: center;
}
.centered {
  display: flex;
  justify-content: center;
  margin: 24px;
}
.container-templates {
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;

  .card {
    margin: 16px;
  }
  .add {
    box-shadow: 1px 2px 8px 0px rgba(207, 207, 207, 0.329);
    border: 1px solid $grey-1;
    background-color: $white;
    display: flex;
    width: 250px;
    height: 300px;
    justify-content: center;
    align-items: center;
    margin: 16px;
    .add-btn {
      width: 50px;
    }
    &:hover {
      cursor: pointer;
      border: 1px solid $purple-4;
    }
  }
}
</style>

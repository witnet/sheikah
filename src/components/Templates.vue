<template>
  <div>
    <div class="templates-bar">
      <div v-for="tab in tabs" class="title" :key="tab.link">
        {{ tab.name }}
      </div>
      <div class="button-container">
        <Button type="primary" :onClick="importTemplate" class="import">Import template</Button>
      </div>
    </div>
    <div v-if="Object.entries(templates)" class="container-templates">
      <div class="add">
        <router-link to="/request/editor">
          <img @click="createTemplate" class="add-btn" src="@/resources/svg/add.svg" />
        </router-link>
      </div>
      <TemplateCard
        v-for="template in templates"
        class="card"
        :name="template.name"
        :id="template.id"
        :description="template.description"
        :key="template.id"
        :date="template.creationDate"
        v-on:change-name="changeName"
        v-on:toggle-modal="displayModalCreateDR(template)"
      />
    </div>
    <div v-else>
      You don't have templates yet.
    </div>
    <input :style="{ display: 'none' }" type="file" ref="fileInput" @change="readFile" />
    <el-dialog :visible.sync="dialogVisible" v-on:close="closeAndClear">
      <Alert
        data-test="alert"
        v-if="createDataRequestError"
        :key="createDataRequestError.message"
        type="error"
        :message="createDataRequestError.message"
        :description="createDataRequestError.description"
        v-on:close="closeAndClear"
      />
      <DeployDataRequest
        :variablesUpdated="variablesUpdated"
        v-on:close="dialogVisible = false"
        v-on:toggle-updated="toggleUpdated"
        :template="currentTemplate"
        :fees="fees"
      />
    </el-dialog>
  </div>
</template>

<script>
import TemplateCard from './card/TemplateCard'
import DeployDataRequest from '@/components/DeployDataRequest.vue'
import Button from '@/components/Button.vue'
import { mapState } from 'vuex'
import Alert from '@/components/Alert'
import { CREATE_TEMPLATE } from '@/store/mutation-types'

export default {
  name: 'Templates',
  components: {
    TemplateCard,
    DeployDataRequest,
    Button,
    Alert,
  },
  beforeMount() {
    this.$store.dispatch('getTemplates')
  },
  data() {
    return {
      tabs: [{ name: 'Templates', link: '/request/templates' }],
      dialogVisible: false,
      currentTemplate: '',
      variablesUpdated: false,
      fees: [
        {
          label: 'Witnesses',
          amount: 1,
        },
        {
          label: 'Data request fee',
          amount: 1,
        },
        {
          label: 'Reward fee',
          amount: 1,
        },
        {
          label: 'Commit fee',
          amount: 1,
        },
        {
          label: 'Reveal fee',
          amount: 1,
        },
        {
          label: 'Tally fee',
          amount: 1,
        },
      ],
    }
  },
  computed: {
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
      createDataRequestError: state => {
        if (state.wallet.errors.createDataRequest) {
          return {
            message: state.wallet.errors.createDataRequest.message,
            description: state.wallet.errors.createDataRequest.error.message,
            name: state.wallet.errors.createDataRequest.name,
          }
        }
      },
    }),
  },
  methods: {
    toggleUpdated() {
      this.variablesUpdated = !this.variablesUpdated
    },
    displayModalCreateDR: function(currentTemplate) {
      this.dialogVisible = true
      this.variablesUpdated = false
      this.fees.map(fee => {
        fee.amount = 1
      })
      this.currentTemplate = currentTemplate
    },
    closeAndClear: function() {
      this.variablesUpdated = false
      if (this.createDataRequestError) {
        this.clearError(this.createDataRequestError.name)
      }
    },
    clearError: function(name) {
      return this.$store.commit('clearError', { error: name })
    },
    changeName({ name, id }) {
      this.$store.dispatch('changeTemplateName', { id, name })
    },
    createTemplate() {
      this.$store.commit(CREATE_TEMPLATE)
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
            this.$store.dispatch('saveTemplate', { template })
          } catch (error) {
            console.log('Error parsing json')
          }
        },
        false
      )
      reader.readAsText(file)
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
.templates-bar {
  border-bottom: 1px solid $grey-0;
  display: flex;
  flex-flow: row wrap;
  height: 64px;
  justify-content: space-between;
  padding-left: 48px;
  text-align: right;

  .title {
    color: $grey-5;
    font-weight: bold;
    height: 64px;
    line-height: 25px;
    padding: 16px;
    text-decoration: none;
    border-bottom: 2px solid $blue-6;
    color: $blue-6;
  }
  .button-container {
    padding: 8px;
  }
}
.el-dialog {
  min-width: 500px;
  max-width: 700px;
  .el-dialog__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    word-break: keep-all;
  }
}
.container-templates {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin: 32px 32px 32px 72px;

  .card {
    flex: 0 1 calc(30% - 2em);
    margin: 16px;
  }
  .add {
    display: flex;
    justify-content: center;
    flex: 0 1 calc(30% - 2em);
    align-items: center;
    margin: 16px;
    .add-btn {
      width: 50px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>

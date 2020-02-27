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
    <div v-show="dialogVisible === false">
      <Alert
        data-test="alert"
        v-for="error in errors"
        :key="error.message"
        type="error"
        :message="error.message"
        :description="error.description"
        v-on:close="() => clearError(error.name)"
      />
    </div>
    <div v-if="Object.entries(templates)" class="container-templates">
      <div class="add">
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
import { mapState } from 'vuex'
import TopBar from '@/components/TopBar'
import Alert from '@/components/Alert'
import { CREATE_TEMPLATE } from '@/store/mutation-types'

export default {
  name: 'Templates',
  components: {
    TopBar,
    TemplateCard,
    DeployDataRequest,
    Alert,
  },
  beforeMount() {
    this.$store.dispatch('getTemplates')
  },
  data() {
    return {
      tabs: [{ name: 'Templates', link: '/request/templates' }],
      dialogVisible: false,
      currentTemplate: null,
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
      sendTransactionError: state => {
        if (state.wallet.errors.sendTransaction) {
          return {
            message: state.wallet.errors.sendTransaction.message,
            description: state.rad.errors.sendTransaction.error.message,
            name: state.rad.errors.sendTransaction.name,
          }
        }
      },
      saveItemError: state => {
        if (state.rad.errors.saveItem) {
          return {
            message: state.rad.errors.saveItem.message,
            description: state.rad.errors.saveItem.error.message,
            name: state.rad.errors.saveItem.name,
          }
        }
      },
      networkError: state => {
        if (state.wallet.errors.network) {
          return {
            message: state.wallet.errors.network.message,
            description: state.wallet.errors.network.error,
            name: state.wallet.errors.network.name,
          }
        }
      },
      getItemError: state => {
        if (state.rad.errors.getItem) {
          return {
            message: state.rad.errors.getItem.message,
            description: state.rad.errors.getItem.error.message,
            name: state.rad.errors.getItem.name,
          }
        }
      },
      errors() {
        if (this.$store.state.wallet.networkStatus !== 'error') {
          return [this.getItemError, this.saveItemError, this.createDataRequestError].filter(
            error => !!error
          )
        } else {
          return [this.networkError]
        }
      },
    }),
  },
  methods: {
    closeDeployModal(status) {
      if (status === 'SENT') {
        this.showSuccessNotification = true
        // TODO: remove setTimeout adding a flag in vuex
        setTimeout(() => {
          if (!this.sendTransactionError) {
            this.$notify({
              title: 'Success',
              message: 'Data request deployed',
              type: 'success',
            })
          } else {
            this.$notify({
              title: 'Error',
              message: 'Error ocurred',
              type: 'error',
            })
          }
        }, 3000)
      }
      this.dialogVisible = false
    },
    displayModalCreateDR: function(currentTemplate) {
      this.dialogVisible = true
      this.currentTemplate = currentTemplate
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
  beforeDestroy() {
    if (this.saveItemError) {
      this.clearError(this.saveItemError.name)
    }
    if (this.getItemError) {
      this.clearError(this.getItemError.name)
    }
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
  text-align: right;

  .icon {
    margin-right: 8px;
  }
  .tool-btn {
    color: $grey-2;
    font-family: 'Titillium Web';
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
      background-color: $blue-1;
    }
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
    min-width: 300px;
    min-height: 200px;
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

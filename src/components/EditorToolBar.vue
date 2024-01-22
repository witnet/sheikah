<template>
  <div class="toolbar">
    <div class="left">
      <a
        ref="download"
        class="none"
        :href="dataStr"
        :download="downloadName"
      ></a>

      <router-link
        data-test="go-back-to-templates"
        class="back"
        to="/request/templates"
      >
        <el-button class="back-btn" type="primary" @click="clear"
          ><font-awesome-icon class="content" icon="angle-left"
        /></el-button>
      </router-link>

      <div class="current-template">
        <p class="text">{{ $t('edit_template') }}</p>
        <p class="name">{{ template.name }}</p>
      </div>
    </div>
    <div class="tools">
      <span v-for="tab in tabs" :key="tab.icon" class="btn">
        <el-tooltip
          v-if="tab.type === 'button'"
          :disabled="!!tab.text"
          :content="tab.icon"
          :target="tab.name"
          placement="bottom"
          effect="light"
        >
          <el-button
            :id="tab.name"
            type="primary"
            :data-test="`action-${tab.name}`"
            :class="tab.class"
            @click="tab.action"
          >
            <font-awesome-icon v-if="tab.icon" class="icon" :icon="tab.name" />
            <span v-else>{{ tab.text }}</span>
          </el-button>
        </el-tooltip>

        <el-switch
          v-else-if="tab.type === 'switch'"
          v-model="autoTryDataRequest"
          data-test="action-try"
          class="center dark"
          :active-text="tab.text"
        ></el-switch>

        <el-dropdown v-else @command="handleCommand">
          <el-button type="primary" data-test="export-selection">
            {{ tab.text }} <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="option in tab.options"
                :key="option.text"
                :command="option.action"
                :data-test="option.name"
                >{{ option.text }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  EDITOR_REDO,
  EDITOR_UNDO,
  CLEAR_HISTORY,
  UPDATE_TEMPLATE,
} from '@/store/mutation-types'
import { EDITOR_EXPORT_FORMAT, NETWORK_STATUS } from '@/constants'
import { deleteKey } from '@/utils'

export default {
  name: 'EditorToolBar',
  data() {
    return {
      exportFormat: EDITOR_EXPORT_FORMAT.JSON,
      jsFile: null,
      tabs: [
        {
          icon: 'Redo changes',
          action: this.editorRedo,
          name: 'redo',
          type: 'button',
        },
        {
          icon: 'Undo changes',
          action: this.editorUndo,
          name: 'undo',
          type: 'button',
        },
        {
          text: this.$t('export_as'),
          action: this.exportTemplate,
          name: 'export',
          type: 'selection',
          options: [
            {
              text: this.$t('export_js'),
              name: 'export-js',
              action: () => {
                this.export(EDITOR_EXPORT_FORMAT.JS)
              },
            },
            {
              text: this.$t('export_template'),
              name: 'export-template',
              action: () => {
                this.export(EDITOR_EXPORT_FORMAT.JSON)
              },
            },
          ],
        },
        {
          text: this.$t('deploy'),
          action: this.deployTemplate,
          name: 'deploy',
          type: 'button',
        },
        {
          text: this.$t('try_data_request'),
          action: this.tryDataRequest,
          name: 'try',
          type: 'switch',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      template: state => state.rad.currentTemplate,
      radRequest: state => state.rad.radRequest,
      autoTry: state => state.rad.autoTry,
      currentStatus: state => state.wallet.status.currentState,
      locale: state => state.wallet.locale,
    }),
    dataStr() {
      if (this.exportFormat === EDITOR_EXPORT_FORMAT.JSON) {
        return `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(deleteKey(this.template, 'id')),
        )}`
      } else {
        this.getJsFile()
        return `data:text/plain;charset=utf-8,${encodeURIComponent(
          this.jsFile,
        )}`
      }
    },
    downloadName() {
      return this.exportFormat === EDITOR_EXPORT_FORMAT.JSON
        ? 'template.json'
        : 'data_request.js'
    },
    autoTryDataRequest: {
      set() {
        this.toggleTryDataRequest()
      },
      get() {
        return this.autoTry
      },
    },
  },
  beforeUnmount() {
    this.clear()
  },
  methods: {
    ...mapMutations({
      undo: EDITOR_UNDO,
      redo: EDITOR_REDO,
      updateTemplate: UPDATE_TEMPLATE,
      clearHistory: CLEAR_HISTORY,
      clearDataRequestResult: 'clearDataRequestResult',
      toggleTryDataRequest: 'toggleTryDataRequest',
      resetAutoTry: 'resetAutoTry',
      setError: 'setError',
    }),
    clear() {
      this.clearDataRequestResult()
      this.resetAutoTry()
      this.clearHistory()
    },
    getJsFile() {
      this.template.usedVariables.forEach(({ value, id }) => {
        this.updateTemplate({ id, value, keepRecord: false })
      })
      this.jsFile = this.radRequest.getJs()
      this.template.usedVariables.forEach(({ variable, id }) => {
        this.updateTemplate({
          id,
          value: '$' + variable,
          keepRecord: false,
        })
      })
    },
    export(format) {
      this.exportFormat = format
      // wait for computed props update according to exportFormat
      this.$nextTick().then(() => {
        this.$refs.download.click()
      })
    },
    deployTemplate() {
      if (this.currentStatus === NETWORK_STATUS.SYNCED) {
        this.$emit('deploy')
      } else {
        this.setError({
          name: 'syncing',
          error: this.$t('syncing_error'),
          message: this.$t('syncing_error_message'),
        })
      }
    },
    editorUndo() {
      this.undo({ locale: this.locale })
      this.$emit('undo-redo')
    },
    editorRedo() {
      this.redo({ locale: this.locale })
      this.$emit('undo-redo')
    },
    handleCommand(action) {
      action()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
.none {
  display: none;
}

.toolbar {
  align-items: center;
  background-color: var(--toolbar-background-color);
  display: flex;
  height: 70px;
  justify-content: space-between;
  min-width: min-content;
  padding: 0 25px 0 0;
  width: 100%;

  .el-button--primary {
    background: var(--toolbar-background-color);
    border-color: $white;
    color: $white;
  }

  .left {
    display: flex;

    .current-template {
      align-self: center;

      .text {
        color: $white;
        font-size: 14px;
        line-height: normal;
      }

      .name {
        color: $white;
        font-size: 16px;
        font-style: italic;
        font-weight: bold;
      }
    }

    .back {
      align-items: center;
      color: white;
      display: flex;
      height: 70px;

      .back-btn {
        border: none;
        border-radius: 0;
        height: 70px;
        margin-right: 25px;

        .content {
          font-size: 24px;
        }
      }
    }
  }

  .tools {
    display: flex;

    .btn {
      align-items: center;
      display: flex;
      margin-left: 8px;
    }
  }
}
</style>

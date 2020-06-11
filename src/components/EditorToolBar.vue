<template>
  <div class="toolbar">
    <div class="left">
      <a
        ref="download"
        :href="dataStr"
        download="template.json"
        style="display:none"
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
        <p class="text">Editing template</p>
        <p class="name">{{ template.name }}</p>
      </div>
    </div>
    <div class="tools">
      <el-button
        v-for="tab in tabs"
        :key="tab.icon"
        type="primary"
        :data-test="`action-${tab.name}`"
        :class="tab.class"
        @click="tab.action"
      >
        <font-awesome-icon v-if="tab.icon" class="icon" :icon="tab.icon" />
        <span v-else>{{ tab.text }}</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import { EDITOR_REDO, EDITOR_UNDO, CLEAR_HISTORY } from '@/store/mutation-types'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'EditorToolBar',
  data() {
    return {
      tabs: [
        {
          icon: 'redo',
          action: this.editorRedo,
          name: 'redo',
        },
        {
          icon: 'undo',
          action: this.editorUndo,
          name: 'undo',
        },
        {
          text: 'Save',
          action: this.saveTemplate,
          name: 'save',
        },
        {
          text: 'Export',
          action: this.exportTemplate,
          name: 'export',
        },
        {
          text: 'Deploy',
          action: this.deployTemplate,
          name: 'deploy',
        },
        {
          text: 'Try data request',
          action: this.tryDataRequest,
          name: 'try',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      template: state => state.rad.currentTemplate,
    }),
    dataStr() {
      return `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(this.template),
      )}`
    },
  },
  methods: {
    ...mapActions(['tryDataRequest', 'saveTemplate']),
    ...mapMutations({
      undo: EDITOR_UNDO,
      redo: EDITOR_REDO,
      clearHistory: CLEAR_HISTORY,
      clearDataRequestResult: 'clearDataRequestResult',
    }),
    clear() {
      this.clearDataRequestResult()
      this.clearHistory()
    },
    exportTemplate: function() {
      this.$refs.download.click()
    },
    deployTemplate() {
      this.$emit('deploy')
    },
    editorUndo() {
      this.undo()
      this.clearDataRequestResult()
      this.$emit('undo-redo')
    },
    editorRedo() {
      this.redo()
      this.clearDataRequestResult()
      this.$emit('undo-redo')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.toolbar {
  align-items: center;
  background-color: $purple-5;
  display: flex;
  height: 70px;
  justify-content: space-between;
  min-width: min-content;
  padding: 0 25px 0 0;
  width: 100%;

  .el-button--primary {
    background: $purple-5;
    border-color: $white;
  }

  .left {
    display: flex;

    .current-template {
      align-self: center;

      .name,
      .text {
        color: $white;
        font-size: 14px;
        line-height: normal;
      }

      .name {
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
  }
}
</style>

<docs>
### Example

```jsx
  <EditorToolBar />
```
</docs>

<template>
  <div class="toolbar">
    <div class="left">
      <a :href="dataStr" ref="download" download="template.json" style="display:none"></a>

      <router-link data-test="go-back-to-templates" class="back" to="/request/templates">
        <el-button class="back-btn" type="primary"
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
        type="primary"
        :data-test="`action-${tab.name}`"
        v-for="tab in tabs"
        :key="tab.icon"
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
import { EDITOR_REDO, EDITOR_UNDO } from '@/store/mutation-types'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'EditorToolBar',
  methods: {
    ...mapActions(['tryDataRequest', 'saveTemplate']),
    ...mapMutations({
      editorUndo: EDITOR_UNDO,
      editorRedo: EDITOR_REDO,
    }),
    exportTemplate: function() {
      this.$refs.download.click()
    },
  },
  computed: {
    ...mapState({
      template: state => state.rad.currentTemplate,
    }),
    dataStr() {
      return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.template))}`
    },
  },
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
          text: 'Try data request',
          action: this.tryDataRequest,
          name: 'try',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.toolbar {
  display: flex;
  min-width: min-content;
  width: 100%;
  background-color: $purple-5;
  padding: 0 25px 0 0;
  height: 70px;
  align-items: center;
  justify-content: space-between;

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
        line-height: normal;
      }

      .name {
        font-size: 16px;
        font-style: italic;
        font-weight: bold;
      }
    }

    .back {
      color: white;
      display: flex;
      align-items: center;
      height: 70px;

      .back-btn {
        margin-right: 25px;
        height: 70px;
        border: none;
        border-radius: 0;
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

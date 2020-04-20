<template>
  <div class="top-bar">
    <a ref="download" :href="dataStr" download="template.json" style="display:none"></a>
    <router-link data-test="go-back-to-templates" class="back" to="/request/templates">
      <img class="back-btn" src="@/resources/svg/arrow-to-left.svg" />
    </router-link>
    <button
      v-for="tab in tabs"
      :key="tab.icon"
      :data-test="`action-${tab.icon}`"
      :class="tab.class"
      @click="tab.action"
    >
      {{ tab.icon }}
    </button>
  </div>
</template>

<script>
import { EDITOR_REDO, EDITOR_UNDO } from '@/store/mutation-types'
export default {
  name: 'ToolBar',
  data() {
    return {
      tabs: [
        {
          icon: 'Redo',
          action: this.editorRedo,
          class: 'end',
        },
        {
          icon: 'Undo',
          action: this.editorUndo,
          class: 'end',
        },
        {
          icon: 'Save',
          action: this.saveTemplate,
          class: 'end',
        },
        {
          icon: 'Export',
          action: this.exportTemplate,
          class: 'end',
        },
        {
          icon: 'Try data request',
          action: this.tryDataRequest,
          class: 'end',
        },
      ],
    }
  },
  computed: {
    dataStr() {
      const template = this.$store.state.rad.currentTemplate
      return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(template))}`
    },
  },
  methods: {
    tryDataRequest: function() {
      this.$store.dispatch('tryDataRequest')
    },
    saveTemplate: function() {
      this.$store.dispatch('saveTemplate')
    },
    exportTemplate: function() {
      this.$refs.download.click()
    },
    editorUndo() {
      this.$store.commit(EDITOR_UNDO)
    },
    editorRedo() {
      this.$store.commit(EDITOR_REDO)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.top-bar {
  position: relative;
  border-bottom: 1px solid $grey-1;
  display: flex;
  flex-flow: row wrap;
  height: 70px;
  min-width: 700px;
  justify-content: flex-end;

  .first,
  .end {
    color: $alt-grey-2;
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
      background-color: $purple-0;
    }
  }

  .first {
    margin-right: auto;
  }

  .back {
    margin-right: auto;
    padding: 24px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: $purple-0;
    }

    .back-btn {
      width: 20px;
    }
  }
}
</style>

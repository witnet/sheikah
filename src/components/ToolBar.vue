<template>
  <div class="top-bar">
    <a :href="dataStr" ref="download" download="template.json" style="display:none"></a>
    <router-link class="back" to="/request/templates">
      <img class="back-btn" src="@/resources/svg/arrow-to-left.svg" />
    </router-link>
    <button v-for="tab in tabs" :key="tab.icon" :class="tab.class" @click="tab.action">
      {{ tab.icon }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
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
      this.$store.commit('editorUndo')
    },
    editorRedo() {
      this.$store.commit('editorRedo')
    },
  },
  computed: {
    dataStr() {
      const template = this.$store.state.rad.currentTemplate
      return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(template))}`
    },
  },
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
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.top-bar {
  border-bottom: 1px solid $grey-0;
  display: flex;
  flex-flow: row wrap;
  height: 70px;
  justify-content: flex-end;

  .first,
  .end {
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

  .first {
    margin-right: auto;
  }

  .back {
    margin-right: auto;
    padding: 24px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: $blue-1;
    }

    .back-btn {
      width: 20px;
    }
  }
}
</style>

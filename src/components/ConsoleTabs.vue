<template>
  <div :class="[!showConsole ? 'tab-bar hidden' : 'tab-bar']">
    <div class="tab">
      <button
        data-test="console-tab"
        v-for="(tab, index) in tabs"
        :key="tab + index"
        @click="changeTab(tab)"
        class="tab-btn"
        :class="{ active: current === tab && showConsole }"
      >
        {{ tab }}
      </button>
    </div>
    <div v-show="showConsole" class="btn-container">
      <button @click="close" class="close-btn">_</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsoleTabs',
  props: {
    current: String,
    showConsole: Boolean,
    tabs: Array,
  },
  methods: {
    changeTab(tabName) {
      this.$emit('change-tab', tabName)
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
.tab-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  padding-left: 16px;
  width: 100%;
  background-color: $black;
  &.hidden {
    .btn-container {
      display: none;
    }
  }
  .tab {
    display: flex;
    flex-flow: row wrap;
    justify-content: left;
    .tab-btn {
      display: flex;
      padding: 8px 16px;
      font-size: 16px;
      background-color: $black;
      border: none;
      color: $alt-grey-1;
      &:hover {
        cursor: pointer;
        background-color: $black;
      }
      .tab-btn:active,
      &:focus,
      &.active {
        color: $alt-grey-1;
        outline: none;
        border-bottom: 1px solid $alt-grey-1;
        margin-bottom: -1px;
        outline: 1;
      }
      .icon {
        margin-left: 16px;
      }
    }
  }
  .btn-container {
    text-align: center;
    padding: 8px;
    background-color: $black;
    .close-btn {
      font-size: 20px;
      background-color: transparent;
      border: none;
      color: $alt-grey-1;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>

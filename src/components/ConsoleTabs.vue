<template>
  <div :class="[!showConsole ? 'tab-bar hidden' : 'tab-bar']">
    <div class="tab">
      <button
        v-for="(tab, index) in tabs"
        :key="tab + index"
        data-test="console-tab"
        class="tab-btn"
        :class="{ active: current === tab && showConsole }"
        @click="changeTab(tab)"
      >
        {{ tab }}
      </button>
    </div>
    <div v-show="showConsole" class="btn-container">
      <button class="close-btn" @click="close">_</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsoleTabs',
  props: {
    current: {
      type: String,
      default: '',
    },
    showConsole: Boolean,
    tabs: {
      type: Array,
      required: true,
    },
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
  background-color: $black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 16px;
  position: relative;
  width: 100%;

  .btn-container {
    background-color: $black;
    padding: 8px;
    text-align: center;

    .close-btn {
      background-color: transparent;
      border: none;
      color: $alt-grey-1;
      font-size: 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }

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
      background-color: $black;
      border: none;
      color: $alt-grey-1;
      display: flex;
      font-size: 16px;
      padding: 8px 16px;

      &:hover {
        background-color: $black;
        cursor: pointer;
      }

      .icon {
        margin-left: 16px;
      }

      &:focus,
      .tab-btn:active,
      &.active {
        border-bottom: 1px solid $alt-grey-1;
        color: $alt-grey-1;
        margin-bottom: -1px;
        outline: none;
        outline: 1;
      }
    }
  }
}
</style>

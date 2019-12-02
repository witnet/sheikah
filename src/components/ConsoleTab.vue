<template>
  <div :class="[!showConsole ? 'tab-bar hidden' : 'tab-bar']">
    <div class="tab">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="changeTab(tab.name)"
        class="tab-btn"
        :class="[current === tab.name && showConsole ? 'active' : '']"
      >
        {{ tab.name }}
        <font-awesome-icon v-show="!showConsole" class="icon" icon="angle-up" />
      </button>
    </div>
    <div v-show="showConsole" class="btn-container">
      <button @click="close" class="close-btn">_</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Console-Tab',
  props: {
    initialTab: { type: String, default: 'variables' },
    showConsole: Boolean,
  },
  methods: {
    changeTab(name) {
      this.current = name
      this.$emit('change-tab', name)
    },
    close() {
      console.log('close')
      this.$emit('close')
    },
  },
  data() {
    return {
      current: this.initialTab,
      tabs: [{ name: 'variables' }, { name: 'logs' }],
    }
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
  padding: 8px;
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
      margin-bottom: 16px;
      padding: 8px 16px;
      font-size: 16px;
      background-color: $black;
      border: none;
      color: #c5c2c2;
      &:hover {
        cursor: pointer;
        background-color: $black;
      }
      .tab-btn:active,
      &:focus,
      &.active {
        color: #c5c2c2;
        outline: none;
        border-bottom: 1px solid #c5c2c2;
      }
      .icon {
        margin-left: 16px;
      }
    }
  }
  .btn-container {
    text-align: center;
    padding: 10px;
    background-color: $black;
    .close-btn {
      font-size: 20px;
      background-color: transparent;
      border: none;
      color: #c5c2c2;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>

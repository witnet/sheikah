<template>
  <div class="button">
    <el-dropdown class="dropdown" @command="handleCommand">
      <font-awesome-icon class="icon" :class="[color]" icon="cog" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(setting, index) in settings"
          :key="setting.label"
          :command="index"
        >
          {{ setting.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <p v-if="showText" class="text" :class="[color]">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  props: {
    showText: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: 'Settings',
    },
    color: {
      default: 'light',
    },
    settings: Array,
  },
  methods: {
    handleCommand(index) {
      this.settings[index].action()
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.button {
  display: flex;
  align-items: center;
  cursor: pointer;
  .icon {
    font-size: 18px;

    &.light {
      color: white;
    }
    &.dark {
      color: $grey-5;
    }
  }
  .text {
    margin-left: 8px;
    font-size: 18px;

    &.light {
      color: white;
    }

    &.dark {
      color: $grey-5;
    }
  }
}

.el-dropdown-menu {
  padding: 8px 0;
}
.el-dropdown-menu__item {
  padding: 0px 8px;
  font-weight: bold;
  color: $grey-3;
  &:not(.is-disabled):hover {
    color: $blue-6;
    font-weight: bold;
  }
}
.el-button {
  padding: 8px 16px 8px 8px;
  cursor: pointer;
  background: none;
  color: inherit;
  border: none;
}
.el-button,
.el-dropdown-selfdefine :hover {
  cursor: pointer;
  background: none;
  color: inherit;
  border: none;

  &:hover .icon {
    background: none;
    border: none;
  }
}
.el-button--primary:focus,
.el-button--primary:hover,
.el-button--primary:active {
  background: none;
  color: inherit;
}
</style>

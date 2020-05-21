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
      type: String,
      default: 'light',
    },
    settings: {
      type: Array,
      required: true,
    },
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
  align-items: center;
  cursor: pointer;
  display: flex;

  .icon {
    font-size: 18px;

    &.light {
      color: white;
    }

    &.dark {
      color: $alt-grey-5;
    }
  }

  .text {
    font-size: 18px;
    margin-left: 8px;

    &.light {
      color: white;
    }

    &.dark {
      color: $alt-grey-5;
    }
  }
}

.el-dropdown-menu {
  padding: 8px 0;
}

.el-dropdown-menu__item {
  color: $alt-grey-5;
  font-weight: bold;
  padding: 0 8px;

  &:not(.is-disabled):hover {
    color: $purple-4;
    font-weight: bold;
  }
}

.el-button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 8px 16px 8px 8px;
}

.el-button,
.el-dropdown-selfdefine :hover {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;

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

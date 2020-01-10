<template>
  <div>
    <el-dropdown class="dropdown" @command="handleCommand">
      <div class="button">
        <font-awesome-icon class="icon" :class="[color]" icon="cog" />
        <p v-if="showText" class="text" :class="[color]">{{ text }}</p>
      </div>
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

.dropdown {
  padding: 4px;
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
}
</style>

<template>
  <div class="card-layout">
    <div class="option-btn">
      <el-dropdown @command="handleCommand">
        <el-button class="button-options" split-button type="primary">
          <img src="@/resources/svg/options.svg" alt="" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(option, index) in options" :key="option.label" :command="index">
            {{ option.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="title">
      {{ name }}
    </div>
    <div class="description">
      {{ description }}
    </div>
    <div>
      {{ date }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateCard',
  data() {
    return {
      options: [
        {
          label: 'Edit',
          action: () => {
            this.setCurrentTemplate()
            this.$router.push('/request/editor')
          },
        },
        {
          label: 'Deploy',
          action: () => {},
        },
        {
          label: 'Delete',
          action: () => {
            this.deleteTemplate()
          },
        },
      ],
    }
  },
  props: {
    id: String,
    name: String,
    description: String,
    date: Number,
  },
  methods: {
    handleCommand(index) {
      this.options[index].action()
    },
    setCurrentTemplate() {
      this.$store.commit('setCurrentTemplate', { id: this.id })
    },
    deleteTemplate() {
      this.$store.dispatch('deleteTemplate', { id: this.id })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.button-options {
  background-color: transparent;
  border: none;
  &:focus,
  &:hover {
    outline: none;
    cursor: pointer;
  }
}
.el-dropdown-menu {
  padding: 8px 0;
  font-weight: bold;
  .el-dropdown-menu__item:not(.is-disabled):hover {
    color: $blue-6;
  }
  .el-dropdown-menu__item:last-of-type:hover {
    background-color: $alpha-red;
    color: $red-2;
  }
}
.el-button--primary:focus,
.el-button--primary:hover,
.el-button--primary:active {
  background: none;
  color: inherit;
}
.card-layout {
  box-shadow: 1px 3px 11px 0px rgba(158, 158, 158, 0.445);
  margin: 24px;
  padding: 16px;
  min-width: 250px;
  background-color: $alpha-blue;
  &.option-btn,
  .title,
  .description {
    flex: 1 400px;
    padding: 24px;
  }
  .title {
    font-size: 24px;
    color: $black;
    padding-top: 0px;
  }
  .description {
    color: $grey-4;
    line-height: 1.5em;
  }
  .option-btn {
    text-align: right;
    padding: 0px;
  }
}
</style>

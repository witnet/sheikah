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
    <div class="title" @click="showInput = true">
      <div ref="input" v-show="!showInput" @click="showInput = !showInput">
        {{ name }}
      </div>
      <Input
        v-show="showInput"
        v-closable="{ exclude: ['input'], handler: 'onClose' }"
        class="input"
        :value="name"
        @input="
          val => {
            updateName(val)
          }
        "
      />
      <font-awesome-icon v-show="!showInput" class="edit-btn" icon="edit" />
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
import { SET_CURRENT_TEMPLATE } from '@/store/mutation-types'
import Input from '@/components/Input'

export default {
  name: 'TemplateCard',
  components: {
    Input,
  },
  data() {
    return {
      options: [
        {
          label: 'Edit',
          action: () => {
            this.$router.push('/request/editor')
            this.setCurrentTemplate()
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
      showInput: false,
    }
  },
  props: {
    id: String,
    name: String,
    description: String,
    date: Number,
  },
  methods: {
    onClose() {
      this.showInput = false
    },
    handleCommand(index) {
      this.options[index].action()
    },
    setCurrentTemplate() {
      this.$store.commit(SET_CURRENT_TEMPLATE, { id: this.id })
    },
    updateName(input) {
      console.log('emit id', this.id)
      this.$emit('change-name', { name: input, id: this.id })
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
    .input {
      background-color: transparent;
      font-size: 1em;
      min-height: 40px;
      border-radius: 0%;
      border: none;
      border-bottom: 1px solid;
    }
  }
  .edit-btn {
    display: none;
  }
  .title {
    font-size: 24px;
    color: $black;
    display: flex;
    &:hover {
      .edit-btn {
        padding-left: 8px;
        display: block;
        font-size: 20px;
        color: $blue-6;
      }
    }
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

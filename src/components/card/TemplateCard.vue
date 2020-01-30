<template>
  <FrameOutside @click="showInput = false" @focus="showInput = false">
    <div :class="`card-layout ${style}`">
      <div class="option-btn">
        <el-dropdown @command="handleCommand">
          <el-button class="button-options" split-button type="primary">
            <img
              v-if="type === 'marketplace'"
              src="@/resources/svg/options-marketplace.svg"
              alt=""
            />
            <img v-else src="@/resources/svg/options.svg" alt="" />
          </el-button>
          <el-dropdown-menu v-if="type === 'marketplace'" slot="dropdown" :class="style">
            <el-dropdown-item
              v-for="(option, index) in marketplaceOptions"
              :key="option.label"
              :command="index"
            >
              {{ option.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu v-else slot="dropdown" :class="style">
            <el-dropdown-item
              v-for="(option, index) in options"
              :key="option.label"
              :command="index"
            >
              {{ option.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="content" @click="edit">
        <div class="title">
          <div ref="input" v-show="!showInput">
            {{ name }}
          </div>
          <Input
            v-show="showInput"
            class="input"
            type="default"
            :value="name"
            @input="
              val => {
                updateName(val)
              }
            "
          />
        </div>
        <div class="description">
          {{ description }}
        </div>
        <div v-show="style != 'marketplace'" class="date">
          {{ dateFormated }}
        </div>
      </div>
    </div>
  </FrameOutside>
</template>

<script>
import { SET_CURRENT_TEMPLATE } from '@/store/mutation-types'
import Input from '@/components/Input'
import { changeDateFormat } from '@/utils'
import FrameOutside from '@/components/FrameOutside'

export default {
  name: 'TemplateCard',
  components: {
    Input,
    FrameOutside,
  },
  data() {
    return {
      marketplaceOptions: [
        {
          label: 'Deploy',
          action: () => {
            console.log('This method should be implemented soon')
          },
        },
      ],
      options: [
        {
          label: 'Edit',
          action: () => {
            this.edit()
          },
        },
        {
          label: 'Rename',
          action: () => {
            this.showInput = true
          },
        },
        {
          label: 'Deploy',
          action: () => {
            this.displayModal()
          },
        },
        {
          label: 'Delete',
          action: () => {
            this.deleteTemplate()
          },
        },
      ],
      dateFormated: changeDateFormat(this.date),
      showInput: false,
      isModalActivated: false,
    }
  },
  props: {
    id: String,
    name: String,
    description: String,
    date: [Number, String],
    type: [Number, String],
  },
  computed: {
    style() {
      return this.type
    },
  },
  methods: {
    displayModal() {
      this.isModalActivated = true
      this.$emit('toggle-modal', { isModalActivated: this.isModalActivated })
    },
    edit() {
      if (!this.showInput) {
        this.$router.push('/request/editor')
        this.setCurrentTemplate()
      }
    },
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
  display: block;
  background-color: transparent;
  border: none;
  &:focus,
  &:hover {
    outline: none;
    cursor: pointer;
  }
}
.el-dropdown-menu {
  display: block;
  padding: 8px 0;
  font-weight: bold;
  .el-dropdown-menu__item:not(.is-disabled):hover {
    display: block;
    color: $blue-6;
  }
  &.marketplace .el-dropdown-menu__item:not(.is-disabled):hover {
    display: block;
    background-color: rgba(255, 183, 212, 0.246);
    color: rgb(255, 42, 127);
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
  background-color: $alpha-blue;
  border-radius: 2px;
  margin: 16px;
  padding: 16px;
  border: 2px solid $grey-0;
  box-shadow: 1px 2px 8px 0px rgba(207, 207, 207, 0.329);
  &.marketplace {
    background: none;
  }
  &:hover {
    border: 2px solid $blue-6;
  }
  &.marketplace:hover {
    border: 2px solid rgb(255, 42, 127);
  }
  &.option-btn,
  .title,
  .description {
    padding: 24px;
    .input {
      color: $black;
      text-align: left;
      padding-left: 8px;
      border: 1px solid $grey-1;
      font-size: 0.9em;
      min-height: 40px;
    }
  }
  .date {
    color: $grey-4;
    text-align: right;
  }
  .edit-btn {
    padding-left: 8px;
    display: block;
    font-size: 20px;
    color: $blue-6;
  }
  .option-btn {
    text-align: right;
    padding: 0px;
  }
  .content {
    &:hover {
      cursor: pointer;
    }
    .title {
      font-size: 24px;
      color: $black;
    }
    .description {
      color: $grey-4;
      line-height: 1.5em;
    }
  }
}
</style>

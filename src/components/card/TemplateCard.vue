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
              :data-test="`template-${option.label}`"
              v-for="(option, index) in options"
              :key="option.label"
              :command="index"
            >
              {{ option.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div data-test="edit-template" class="content" @click="edit">
        <div class="info">
          <div class="title">
            <div ref="input" v-show="!showInput">
              {{ name }}
            </div>
            <el-input
              data-test="template-name-input"
              v-show="showInput"
              :placeholder="name"
              v-model="updateName"
            />
          </div>
          <div class="description">
            {{ description }}
          </div>
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
import { formatDateDash } from '@/utils'
import FrameOutside from '@/components/FrameOutside'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'TemplateCard',
  components: {
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
            this.deleteTemplate({ id: this.id })
          },
        },
      ],
      dateFormated: formatDateDash(this.date),
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
    updateName: {
      get() {
        return this.name
      },
      set(newName) {
        this.$emit('change-name', { name: newName, id: this.id })
      },
    },
  },
  methods: {
    ...mapMutations({
      setCurrentTemplate: SET_CURRENT_TEMPLATE,
    }),
    ...mapActions({
      deleteTemplate: 'deleteTemplate',
    }),
    displayModal() {
      this.isModalActivated = true
      this.$emit('toggle-modal', { isModalActivated: this.isModalActivated })
    },
    edit() {
      if (!this.showInput) {
        this.$router.push('/request/editor')
        this.setCurrentTemplate({ id: this.id })
      }
    },
    onClose() {
      this.showInput = false
    },
    handleCommand(index) {
      this.options[index].action()
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
    color: $purple-4;
  }
  &.marketplace .el-dropdown-menu__item:not(.is-disabled):hover {
    display: block;
    background-color: rgba(255, 183, 212, 0.246);
    color: rgb(255, 42, 127);
  }
  .el-dropdown-menu__item:last-of-type:hover {
    background-color: $red-0;
    color: $red-5;
  }
}
.el-button--primary:focus,
.el-button--primary:hover,
.el-button--primary:active {
  background: none;
  color: inherit;
}
.card-layout {
  width: 250px;
  height: 250px;
  background-color: $purple-0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 2px;
  margin: 16px;
  padding: 16px;
  border: 2px solid $grey-1;
  box-shadow: 1px 2px 8px 0px rgba(207, 207, 207, 0.329);
  &.marketplace {
    background: none;
  }
  &:hover {
    border: 2px solid $purple-4;
  }
  &.marketplace:hover {
    border: 2px solid rgb(255, 42, 127);
  }
  &.option-btn,
  .title,
  .description {
    padding: 16px;
  }
  .date {
    color: $alt-grey-3;
    text-align: right;
  }
  .edit-btn {
    padding-left: 8px;
    display: block;
    color: $purple-4;
  }
  .option-btn {
    flex: 1;
    text-align: right;
    padding: 0px;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 3;
    &:hover {
      cursor: pointer;
    }
    .title {
      font-size: 20px;
      color: $black;
    }
    .description {
      color: $alt-grey-3;
      line-height: 1.5em;
    }
  }
}
</style>

<template>
  <div :class="`card-layout ${style}`">
    <div class="option-btn">
      <div class="title">
        <el-tooltip
          v-if="name.length > 40"
          :content="name"
          placement="bottom"
          effect="light"
        >
          <div ref="input">
            {{ cropString(name, 40) }}
          </div>
        </el-tooltip>
        <div v-else>
          {{ name }}
        </div>
      </div>
      <el-dropdown @command="handleCommand">
        <div class="button-options" split-button type="primary">
          <img
            v-if="type === 'marketplace'"
            src="@/resources/svg/options-marketplace.svg"
            alt=""
          />
          <img v-else src="@/resources/svg/options.svg" alt="" />
        </div>
        <el-dropdown-menu
          v-if="type === 'marketplace'"
          slot="dropdown"
          :class="style"
        >
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
            :data-test="`template-${option.label}`"
            :command="index"
          >
            {{ option.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div data-test="edit-template" class="content" @click="edit">
      <div class="description">
        {{ cropString(description, 120) }}
      </div>
    </div>
    <div v-show="style !== 'marketplace'" class="sources">
      <span class="number">{{ sources }}</span> sources
    </div>
  </div>
</template>

<script>
import { SET_CURRENT_TEMPLATE } from '@/store/mutation-types'
import { cropString } from '@/utils'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'TemplateCard',
  props: {
    type: {
      type: [Number, String],
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    sources: {
      type: [Number, String],
      default: 0,
    },
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
          label: 'Deploy',
          action: () => {
            this.displayDeployModal()
          },
        },
        {
          label: 'Delete',
          action: () => {
            this.deleteTemplate({ id: this.id })
          },
        },
      ],
      showInput: false,
      isDeployModalActivated: false,
    }
  },
  computed: {
    style() {
      return this.type
    },
  },
  methods: {
    cropString,
    ...mapMutations({
      setCurrentTemplate: SET_CURRENT_TEMPLATE,
    }),
    ...mapActions({
      deleteTemplate: 'deleteTemplate',
      tryDataRequest: 'tryDataRequest',
    }),
    displayDeployModal() {
      this.isDeployModalActivated = true
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
  background-color: transparent;
  border: none;
  display: block;
  height: min-content;

  &:focus,
  &:hover {
    cursor: pointer;
    outline: none;
  }
}

.el-dropdown {
  height: min-content;
}

.card-layout {
  align-items: flex-start;
  background-color: $white;
  border: 1px solid $grey-1;
  border-radius: 2px;
  box-shadow: 1px 2px 8px 0 rgba(207, 207, 207, 0.329);
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 70px auto 30px;
  height: 300px;
  width: 300px;

  &.marketplace {
    background: none;
  }

  &:hover {
    border: 1px solid $purple-3;
  }

  &.marketplace:hover {
    border: 1px solid rgb(255, 42, 127);
  }

  &.option-btn,
  .title,
  .description {
    overflow: hidden;
    width: inherit;
  }

  .edit-btn {
    color: $alpha-purple;
    display: block;
  }

  .option-btn {
    display: flex;
    justify-content: space-between;
    margin: 24px 24px 0 24px;
  }

  .title {
    color: $grey-6;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5em;
  }

  .content {
    align-self: flex-start;

    &:hover {
      cursor: pointer;
    }

    .description {
      color: $grey-5;
      font-size: 14px;
      font-style: italic;
      line-height: 1.5em;
      margin: 16px 24px;
      word-wrap: break-word;
    }
  }

  .sources {
    color: $grey-3;
    font-size: 12px;
    margin-left: 24px;
    width: 250px;

    .number {
      color: $grey-5;
      font-weight: bold;
    }
  }
}
</style>

<docs>
### Examples

#### Template Card
```jsx
  <TemplateCard
    name="Template"
    description="Description"
    :sources="1"
    id="0"
  />
```
</docs>

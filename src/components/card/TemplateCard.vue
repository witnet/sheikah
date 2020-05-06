<template>
  <div :class="`card-layout ${style}`">
    <div class="option-btn">
      <div class="title">
        <el-tooltip v-if="name.length > 40" :content="name" placement="bottom" effect="light">
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
          <img v-if="type === 'marketplace'" src="@/resources/svg/options-marketplace.svg" alt="" />
          <img v-else src="@/resources/svg/options.svg" alt="" />
        </div>
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
      <div class="description">
        {{ cropString(description, 120) }}
      </div>
    </div>
    <div v-show="style != 'marketplace'" class="sources">
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
  props: {
    id: String,
    name: String,
    description: String,
    sources: Number,
    type: [Number, String],
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
  height: min-content;
  display: block;
  background-color: transparent;
  border: none;
  &:focus,
  &:hover {
    outline: none;
    cursor: pointer;
  }
}
.el-dropdown {
  height: min-content;
}
.card-layout {
  display: grid;
  grid-template-rows: 70px auto 30px;
  align-items: flex-start;
  grid-template-columns: 300px;
  background-color: $white;
  border-radius: 2px;
  height: 300px;
  width: 300px;
  border-radius: 2px;
  border: 1px solid $grey-1;
  box-shadow: 1px 2px 8px 0px rgba(207, 207, 207, 0.329);
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
    display: block;
    color: $alpha-purple;
  }
  .option-btn {
    margin: 24px 24px 0px 24px;
    justify-content: space-between;
    display: flex;
  }
  .title {
    font-weight: bold;
    font-size: 16px;
    color: $grey-6;
    line-height: 1.5em;
  }
  .content {
    align-self: flex-start;
    &:hover {
      cursor: pointer;
    }
    .description {
      margin: 16px 24px;
      word-wrap: break-word;
      color: $grey-5;
      line-height: 1.5em;
      font-size: 14px;
      font-style: italic;
    }
  }
  .sources {
    margin-left: 24px;
    font-size: 12px;
    width: 250px;
    color: $grey-3;
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
  />
```
</docs>

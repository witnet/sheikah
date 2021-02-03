<template>
  <div :class="`card-layout ${style}`" @click="edit">
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
        <div class="button-options" split-button type="primary" @click.stop>
          <img
            v-if="type === 'marketplace'"
            src="@/resources/svg/options-marketplace.svg"
            alt=""
          />
          <CustomIcon v-else name="options" />
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
    <div data-test="edit-template" class="content">
      <div class="description">
        {{ cropString(localDescription, 120) }}
      </div>
    </div>
    <div v-show="style !== 'marketplace'" class="sources">
      {{ $tc('sources', sources, { count: sources }) }}
    </div>
  </div>
</template>

<script>
import { SET_CURRENT_TEMPLATE } from '@/store/mutation-types'
import { cropString } from '@/utils'
import { mapActions, mapMutations, mapState } from 'vuex'
import { TEMPLATE_EMPTY_DESCRIPTION, NETWORK_STATUS } from '@/constants'
import CustomIcon from '@/components/CustomIcon'

export default {
  name: 'TemplateCard',
  components: {
    CustomIcon,
  },
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
            if (this.currentStatus === NETWORK_STATUS.SYNCED) {
              this.displayDeployModal()
            } else {
              this.setError({
                name: 'syncing',
                error: this.$t('syncing_error'),
                message: this.$t('syncing_error_message'),
              })
            }
          },
        },
        {
          label: 'Delete',
          action: () => {
            this.$emit('delete-template')
          },
        },
      ],
      isDeployModalActivated: false,
    }
  },
  computed: {
    ...mapState({
      currentStatus: state => state.wallet.status.currentState,
    }),
    style() {
      return this.type
    },
    localDescription() {
      return this.description || TEMPLATE_EMPTY_DESCRIPTION
    },
  },
  methods: {
    cropString,
    ...mapMutations({
      setCurrentTemplate: SET_CURRENT_TEMPLATE,
      setError: 'setError',
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
      this.$router.push('/request/editor')
      this.setCurrentTemplate({ id: this.id })
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
// Overwrite element UI styles
.el-dropdown-menu__item:last-of-type:hover {
  background-color: $red-0 !important;
  color: $red-3 !important;
}

.el-dropdown {
  height: min-content;
}

.card-layout {
  align-items: flex-start;
  background-color: var(--card-background);
  border: var(--card-border);
  border-radius: 2px;
  box-shadow: var(--card-shadow);
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 70px auto 30px;
  height: 300px;
  width: 300px;

  &.marketplace {
    background: none;

    &:hover {
      border: var(--card-active-border);
    }
  }

  &:hover {
    border: var(--card-active-border);
    cursor: pointer;
  }

  .option-btn {
    display: flex;
    justify-content: space-between;
    margin: 24px 24px 0 24px;

    .title {
      color: var(--text-medium-emphasis);
      font-size: 16px;
      font-weight: bold;
      line-height: 1.5em;
    }

    .button-options {
      background-color: transparent;
      border: none;
      display: block;
      height: min-content;
      margin: -10px;
      padding: 10px;

      &:focus,
      &:hover {
        cursor: pointer;
        outline: none;
      }
    }
  }

  .content {
    align-self: flex-start;

    .description {
      color: var(--text-medium-emphasis);
      font-size: 14px;
      font-style: italic;
      line-height: 1.5em;
      margin: 16px 24px;
      word-wrap: break-word;
    }
  }

  .sources {
    color: var(--text-medium-emphasis);
    font-size: 12px;
    margin-left: 24px;
    width: 250px;
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

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
          <template #content>
            <div ref="input">
              {{ cropString(name, 40) }}
            </div>
          </template>
        </el-tooltip>
        <div v-else>
          {{ name }}
        </div>
      </div>

      <el-dropdown @command="handleCommand">
        <div
          class="button-options"
          split-button
          type="primary"
          aria-expanded="true"
          @click.stop
        >
          <img
            v-if="type === 'marketplace'"
            src="@/resources/svg/options-marketplace.svg"
            alt=""
          />
          <CustomIcon v-else name="Options" />
        </div>

        <template v-if="type === 'marketplace'" #dropdown>
          <el-dropdown-menu :class="style">
            <el-dropdown-item
              v-for="(option, index) in marketplaceOptions"
              :key="option.label"
              :command="index"
            >
              {{ option.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>

        <template v-else #dropdown>
          <el-dropdown-menu :class="style">
            <el-dropdown-item
              v-for="(option, index) in options"
              :key="option.label"
              class="el-dropdown-menu__item"
              :data-test="`template-${option.label}`"
              :command="index"
            >
              {{ option.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div data-test="edit-template" class="content">
      <div class="description">
        {{ cropString(localDescription, 120) }}
      </div>
    </div>
    <div v-show="style !== 'marketplace'" class="sources">
      {{ $t('sources', sources, { count: sources }) }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { SET_CURRENT_TEMPLATE } from '@/store/mutation-types'
import { cropString } from '@/utils'
import CustomIcon from '@/components/CustomIcon.vue'
import { NETWORK_STATUS } from '@/constants'

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
          label: this.$t('deploy'),
          action: () => {
            console.log('This method should be implemented soon')
          },
        },
      ],
      options: [
        {
          label: this.$t('edit'),
          action: () => {
            this.edit()
          },
        },
        {
          label: this.$t('deploy'),
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
          label: this.$t('delete'),
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
      locale: state => state.wallet.locale,
    }),
    style() {
      return this.type
    },
    localDescription() {
      return this.description || this.$t('template_empty_description')
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
    }),
    displayDeployModal() {
      this.isDeployModalActivated = true
      this.$emit('toggle-modal', { isModalActivated: this.isModalActivated })
    },
    edit() {
      this.$router.push('/request/editor')
      this.setCurrentTemplate({ id: this.id, locale: this.locale })
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
    margin: 24px 24px 0;

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

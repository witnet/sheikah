<template>
  <div
    tabindex="0"
    @keydown.tab="tabKeyPressed = true"
    @blur.capture="handleBlur"
  >
    <div class="select-box">
      <button
        id="select-button"
        ref="button"
        type="button"
        data-test="select-btn"
        aria-haspopup="listbox"
        aria-labelledby="select-label select-button"
        :aria-expanded="areOptionsVisible"
        class="selected-btn"
        :class="{ active: areOptionsVisible, big: type === 'big', disabled }"
        @click="toggleOptions"
        @keyup.up.down.prevent="showOptions"
        @keyup.up.prevent="selectPrevOption"
        @keyup.down.prevent="selectNextOption"
      >
        <div class="selected">
          <div class="label" :class="{ big: type === 'big' }">
            <div class="primary" data-test="selected-option-primary">
              <img
                v-if="selectedOption.img"
                class="item-icon"
                :src="selectedOption.img"
                alt="icon"
              />
              {{ selectedOption.primaryText }}
            </div>
            <OperatorType
              v-if="selectedOption.secondaryText"
              data-test="selected-option-secondary"
              :type="selectedOption.secondaryText"
            />
            <div class="arrow">
              <CustomIcon
                v-if="areOptionsVisible"
                class-name="icon"
                name="sort-up"
              />
              <CustomIcon v-else class-name="icon" name="sort-down" />
            </div>
          </div>
        </div>
      </button>
      <input
        v-if="!tabKeyPressed"
        :aria-hidden="true"
        class="hidden"
        @focus="handleFocus"
      />
      <ul
        v-if="areOptionsVisible"
        ref="options"
        data-test="options"
        tabindex="-1"
        role="listbox"
        :aria-labelledby="`select-label`"
        :aria-activedescendant="activeDescendant"
        class="options"
        :class="{ big: type === 'big' }"
        @keydown="search"
        @focus="setupFocus"
        @keyup.up.prevent="selectPrevOption"
        @keyup.down.prevent="selectNextOption"
        @keydown.up.down.prevent
        @keydown.enter.esc.prevent="reset"
      >
        <li
          v-for="(option, index) in filteredOptions"
          :id="`select-option-${index}`"
          :ref="`option-${index}`"
          :key="index"
          :data-test="`option-${index}`"
          :aria-selected="activeOptionIndex === index"
          :class="{
            ['has-focus']: activeOptionIndex === index,
            big: type === 'big',
          }"
          class="option"
          role="option"
          @click="selectOption(option)"
        >
          <div class="label" :data-test="`option-label-${index}`">
            <img
              v-if="option.img"
              class="item-icon"
              :src="option.img"
              alt="icon"
            />
            <span class="primary">{{ option.primaryText }}</span>
          </div>
          <OperatorType
            v-if="option.secondaryText"
            class="value"
            :data-test="`option-value-${index}`"
            :type="option.secondaryText"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { standardizeOperatorName } from '@/utils'
import OperatorType from '@/components/OperatorType.vue'
import CustomIcon from '@/components/CustomIcon.vue'

let resetKeysSoFarTimer
export default {
  name: 'Select',
  components: {
    OperatorType,
    CustomIcon,
  },
  model: {
    event: 'input',
  },
  props: {
    type: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tabKeyPressed: false,
      areOptionsVisible: false,
      keysSoFar: '',
      filteredOptions: this.options,
      selectedOption: this.modelValue,
    }
  },
  computed: {
    activeOptionIndex() {
      // TODO(#856): implement find for operator select, wait till the Radon Library is updated
      if (this.type === 'operator') {
        return this.filteredOptions.findIndex(x => {
          return (
            standardizeOperatorName(x.value).toLowerCase() ===
            this.selectedOption.value.toLowerCase()
          )
        })
        // return this.options.findIndex(x => standardizeOperatorName(x.value) === this.value.value)
      } else {
        return this.filteredOptions.findIndex(
          x =>
            x.primaryText === this.selectedOption.primaryText ||
            x === this.selectedOption,
        )
      }
    },
    prevOptionIndex() {
      const next = this.activeOptionIndex - 1
      this.scrollTop(next >= 0 ? next : this.filteredOptions.length - 1)
      return next >= 0 ? next : this.filteredOptions.length - 1
    },
    nextOptionIndex() {
      const next = this.activeOptionIndex + 1
      this.scrollTop(next <= this.filteredOptions.length - 1 ? next : 0)
      return next <= this.filteredOptions.length - 1 ? next : 0
    },
    activeDescendant() {
      return `select-option-${this.activeOptionIndex}`
    },
  },
  watch: {
    modelValue() {
      this.selectedOption = this.modelValue
    },
    options: {
      deep: true,
      handler(value) {
        this.filteredOptions = value
      },
    },
  },
  methods: {
    scrollTop(next) {
      if (next <= this.filteredOptions.length - 2) {
        const top = this.$refs[`option-${next}`][0].offsetTop
        this.$refs.options.scrollTop = top
      }
    },
    handleFocus(e) {
      this.areOptionsVisible = true
      if (this.$refs.button) {
        this.$refs.button.focus()
      }
    },
    selectOption(option) {
      this.selectedOption = option
      this.$emit('update:modelValue', this.selectedOption)
      this.reset()
    },
    handleBlur(e) {
      if (!this.$el.contains(e.relatedTarget)) {
        this.hideOptions()
      }
    },
    toggleOptions() {
      if (!this.disabled) {
        this.areOptionsVisible ? this.hideOptions() : this.showOptions()
      }
    },
    async showOptions() {
      this.areOptionsVisible = true
      await this.$nextTick()
      if (this.$refs.options) {
        this.$refs.options.focus()
      }
    },
    hideOptions() {
      this.areOptionsVisible = false
    },
    async reset() {
      this.hideOptions()
      this.filteredOptions = this.options
      await this.$nextTick()
      if (this.$refs.button) {
        this.$refs.button.focus()
      }
    },
    setupFocus() {
      if (!this.selectedOption) {
        this.$emit('update:modelValue', this.filteredOptions[0])
      }
    },
    selectPrevOption() {
      this.selectedOption = this.filteredOptions[this.prevOptionIndex]
      this.$emit('update:modelValue', this.selectedOption)
    },
    selectNextOption() {
      this.selectedOption = this.filteredOptions[this.nextOptionIndex]
      this.$emit('update:modelValue', this.selectedOption)
    },
    search(e) {
      clearTimeout(resetKeysSoFarTimer)
      // No alphanumeric key was pressed.
      resetKeysSoFarTimer = setTimeout(() => {
        this.keysSoFar = ''
      }, 500)
      this.keysSoFar += e.key
      const matchingOption = this.options.find(x =>
        x.primaryText.toString().toLowerCase().includes(this.keysSoFar),
      )
      const matchingOptions = this.options.filter(option =>
        option.primaryText
          .toString()
          .toLowerCase()
          .includes(this.keysSoFar.toLowerCase()),
      )
      if (matchingOption) {
        this.filteredOptions = matchingOptions
      }
      if (matchingOption && e.key === 'neEnter') {
        // TODO: implement filtered option
        this.filteredOptions = this.options
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/fonts.scss';

.select-box {
  min-width: 170px;
  position: relative;
  width: 100%;

  .selected-btn {
    align-items: center;
    background: var(--select-background-color);
    border: var(--select-border);
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--text-medium-emphasis);
    cursor: pointer;
    display: flex;
    font-size: 14px;
    min-height: 40px;
    outline: none;
    padding-left: 16px;
    width: 100%;
    z-index: 1;

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &.big {
      font-size: 16px;
      min-height: 60px;
    }

    .selected {
      width: 100%;

      .item-icon {
        margin-right: 16px;
        width: 30px;
      }

      .label {
        align-items: center;
        column-gap: 8px;
        display: grid;
        font-size: 14px;
        grid-template-columns: auto max-content max-content;
        margin-right: 16px;
        overflow: hidden;
        width: 100%;

        &.big {
          font-size: 16px;
          margin-right: 8px;
        }

        .primary {
          align-items: center;
          align-self: center;
          display: flex;
          justify-self: left;
          margin-right: 16px;
          overflow: hidden;
        }

        .value {
          border-radius: 2px;
          overflow: hidden;
        }

        .icon {
          font-size: 16px;
          margin: 0;
        }
      }
    }
  }

  .active {
    border: var(--select-border-active);
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding-bottom: 1px;
  }

  .hidden {
    display: none;
  }

  .options {
    background: var(--select-background-color);
    border: var(--select-border-active);
    border-radius: 4px;
    border-top: 0;
    border-top: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 500;
    left: 0;
    list-style-type: none;
    margin: 0;
    max-height: 200px;
    outline: none;
    overflow-y: auto;
    position: absolute;
    right: 0;
    top: 40px;
    width: inherit;
    z-index: 10;

    &.big {
      top: 60px;
    }

    .option {
      align-items: center;
      background: var(--select-background-color);
      color: var(--text-medium-emphasis);
      cursor: pointer;
      display: flex;
      height: 40px;
      justify-content: space-between;
      overflow: hidden;
      padding: 8px;
      padding: 0 0 0 16px;

      .label {
        align-items: center;
        display: flex;

        .item-icon {
          margin-right: 16px;
          width: 30px;
        }
      }

      .value {
        margin-right: 8px;
      }

      &.big {
        height: 60px;
      }

      &:hover {
        background-color: var(--select-option-background-active);
      }

      &.has-focus {
        background-color: var(--select-option-background-active);
      }

      .primary {
        overflow: hidden;
      }
    }
  }
}
</style>

<template>
  <div @keydown.tab="tabKeyPressed = true" @blur.capture="handleBlur">
    <div :class="'select-box'">
      <button
        ref="button"
        data-test="select-btn"
        id="select-button"
        aria-haspopup="listbox"
        aria-labelledby="select-label select-button"
        :aria-expanded="areOptionsVisible"
        class="selected-btn"
        :class="{ active: areOptionsVisible, big: type === 'big' }"
        @click="toggleOptions"
        @keyup.up.down.prevent="showOptions"
        @keyup.up.prevent="selectPrevOption"
        @keyup.down.prevent="selectNextOption"
      >
        <div class="selected">
          <div class="label" :class="{ big: type === 'big' }">
            <div class="primary" data-test="selected-option-primary">
              <img
                class="item-icon"
                v-if="selectedOption.img"
                :src="selectedOption.img"
                alt="icon"
              />
              {{ selectedOption.primaryText }}
            </div>
            <OperatorType
              data-test="selected-option-secondary"
              v-if="selectedOption.secondaryText"
              :type="selectedOption.secondaryText"
            />
            <div class="arrow">
              <img
                v-if="areOptionsVisible"
                class="icon sort-up"
                src="@/resources/svg/sort-up.svg"
                alt="sort-up-icon"
              />
              <img
                v-else
                src="@/resources/svg/sort-down.svg"
                class="icon sort-down"
                alt="sort-down-icon"
              />
            </div>
          </div>
        </div>
      </button>
      <input v-if="!tabKeyPressed" :aria-hidden="true" class="hidden" @focus="handleFocus" />
      <ul
        v-if="areOptionsVisible"
        data-test="options"
        ref="options"
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
          :data-test="`option-${index}`"
          :key="index"
          :aria-selected="activeOptionIndex === index"
          :class="{ ['has-focus']: activeOptionIndex === index, big: type === 'big' }"
          class="option"
          role="option"
          @click="selectOption(option)"
        >
          <div class="label" :data-test="`option-label-${index}`">
            <img class="item-icon" v-if="option.img" :src="option.img" alt="icon" />
            <span class="primary">{{ option.primaryText }}</span>
          </div>
          <OperatorType
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

let resetKeysSoFarTimer
export default {
  name: 'Select',
  model: {
    event: 'input',
  },
  components: {
    OperatorType,
  },
  props: {
    type: String,
    options: {
      type: Array,
    },
    value: {
      type: Object,
    },
  },
  data() {
    return {
      tabKeyPressed: false,
      areOptionsVisible: false,
      keysSoFar: '',
      filteredOptions: this.options,
      selectedOption: this.value,
    }
  },
  watch: {
    value() {
      this.selectedOption = this.value
    },
  },
  computed: {
    activeOptionIndex() {
      // TODO(#856): implement find for operator select, wait till the Radon Library is updated
      if (this.type === 'operator') {
        return this.filteredOptions.findIndex(
          x => standardizeOperatorName(x.value) === this.selectedOption.value
        )
        // return this.options.findIndex(x => standardizeOperatorName(x.value) === this.value.value)
      } else {
        return this.filteredOptions.findIndex(
          x => x.value === this.selectedOption || x === this.selectedOption
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
  methods: {
    scrollTop(next) {
      if (next >= 2 && next <= this.filteredOptions.length - 2) {
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
      this.$emit('input', this.selectedOption)
      this.reset()
    },
    handleBlur(e) {
      if (!this.$el.contains(e.relatedTarget)) {
        this.hideOptions()
      }
    },
    toggleOptions() {
      this.areOptionsVisible ? this.hideOptions() : this.showOptions()
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
        this.$emit('input', this.filteredOptions[0])
      }
    },
    selectPrevOption() {
      this.selectedOption = this.filteredOptions[this.prevOptionIndex]
      this.$emit('input', this.selectedOption)
    },
    selectNextOption() {
      this.selectedOption = this.filteredOptions[this.nextOptionIndex]
      this.$emit('input', this.selectedOption)
    },
    search(e) {
      clearTimeout(resetKeysSoFarTimer)
      // No alphanumeric key was pressed.
      resetKeysSoFarTimer = setTimeout(() => {
        this.keysSoFar = ''
      }, 500)
      this.keysSoFar += e.key
      const matchingOption = this.options.find(x =>
        x.primaryText.toLowerCase().includes(this.keysSoFar)
      )
      const matchingOptions = this.options.filter(option =>
        option.primaryText.toLowerCase().includes(this.keysSoFar.toLowerCase())
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
  width: 100%;
  min-width: 270px;
  position: relative;

  .selected-btn {
    outline: none;
    cursor: pointer;
    box-sizing: border-box;
    width: 100%;
    z-index: 1;
    align-items: center;
    background: none;
    border-radius: 4px;
    border: $select_border;
    color: $alt-grey-5;
    display: flex;
    padding-left: 16px;
    min-height: 40px;
    font-size: 14px;
    &.big {
      font-size: 16px;
      min-height: 60px;
    }
    .selected {
      width: 100%;

      .item-icon {
        width: 30px;
        margin-right: 16px;
        width: 30px;
      }
      .label {
        width: 100%;
        overflow: hidden;
        display: grid;
        grid-template-columns: auto max-content max-content;
        column-gap: 8px;
        align-items: center;
        font-size: 14px;
        margin-right: 16px;
        &.big {
          margin-right: 8px;
          font-size: 16px;
        }

        .primary {
          justify-self: left;
          align-self: center;
          overflow: hidden;
          margin-right: 16px;
          display: flex;
          align-items: center;
        }
        .value {
          overflow: hidden;
          border-radius: 2px;
        }
        .icon {
          font-size: 16px;
          margin: 0;
        }
      }
    }
  }

  .active {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: $select_border__active;
    border-bottom: none;
    padding-bottom: 1px;
  }

  .hidden {
    display: none;
  }

  .options {
    position: absolute;
    right: 0px;
    left: 0px;
    width: inherit;
    font-weight: 500;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    box-sizing: border-box;
    margin: 0;
    list-style-type: none;
    outline: none;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 0px;
    font-size: 16px;
    border: $select_border__active;
    border-top: none;
    top: 40px;
    &.big {
      top: 60px;
    }

    .option {
      overflow: hidden;
      background: $white;
      color: $alt-grey-5;
      padding: 8px;
      cursor: pointer;
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding: 0px 0px 0px 16px;
      height: 40px;
      .label {
        display: flex;
        align-items: center;
        .item-icon {
          width: 30px;
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
        background-color: $alpha-purple;
      }
      &.has-focus {
        background-color: $alpha-purple;
      }
      .primary {
        overflow: hidden;
      }
    }
  }
}
</style>

<docs>
### Example
#### Operator select

```jsx
  <Select
    type="big"
    :value="{
      primaryText: 'option 1',
    }"
    :options="[{primaryText: 'option 1'},{primaryText: 'option 2'}]"
  />
```
#### Big Select

```jsx
  <Select
    :value="{
      primaryText: 'option 1',
    }"
    :options="[{primaryText: 'option 1'},{primaryText: 'option 2'}]"
  />
```
</docs>

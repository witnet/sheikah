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
        :class="{ active: areOptionsVisible, operator: type === 'operator' }"
        @click="toggleOptions"
        @keyup.up.down.prevent="showOptions"
        @keyup.up.prevent="selectPrevOption"
        @keyup.down.prevent="selectNextOption"
      >
        <div class="selected">
          <div class="label" :class="{ operator: type === 'operator' }">
            <div class="primary" :data-test="'value' + value.primaryText">
              <img class="item-icon" v-if="value.img" :src="value.img" alt="icon" />
              {{ value.primaryText }}
            </div>
            <span v-if="value.secondaryText" :class="`value ${value.secondaryText}`">{{
              value.secondaryText
            }}</span>
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
        v-show="areOptionsVisible"
        ref="options"
        tabindex="-1"
        role="listbox"
        :aria-labelledby="`select-label`"
        :aria-activedescendant="activeDescendant"
        class="options"
        :class="{ operator: type === 'operator' }"
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
          :class="{ ['has-focus']: activeOptionIndex === index, operator: type === 'operator' }"
          class="option"
          role="option"
          @click="selectOption(option)"
        >
          <div class="label">
            <img class="item-icon" v-if="option.img" :src="option.img" alt="icon" />
            <span class="primary">{{ option.primaryText }}</span>
          </div>
          <span :class="`value operator ${option.secondaryText}`">
            {{ option.secondaryText }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { standardizeOperatorName } from '@/utils'

let resetKeysSoFarTimer
export default {
  name: 'Select',
  model: {
    event: 'input',
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
    }
  },
  computed: {
    activeOptionIndex() {
      // TODO(#856): implement find for operator select, wait till the Radon Library is updated
      if (this.type === 'operator') {
        return this.filteredOptions.findIndex(
          x => standardizeOperatorName(x.value) === this.value.value
        )
        // return this.options.findIndex(x => standardizeOperatorName(x.value) === this.value.value)
      } else {
        return this.filteredOptions.findIndex(x => x.value === this.value || x === this.value)
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
      this.$emit('input', option)
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
      if (!this.value) {
        this.$emit('input', this.filteredOptions[0])
      }
    },
    selectPrevOption() {
      this.$emit('input', this.filteredOptions[this.prevOptionIndex])
    },
    selectNextOption() {
      this.$emit('input', this.filteredOptions[this.nextOptionIndex])
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
    min-height: 60px;
    align-items: center;
    background: none;
    border-radius: 4px;
    border: $select_border;
    color: $alt-grey-5;
    display: flex;
    padding-left: 16px;
    &.operator {
      font-size: 14px;
      min-height: 40px;
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
        margin-right: 8px;
        display: grid;
        grid-template-columns: auto max-content max-content;
        column-gap: 8px;
        align-items: center;
        font-size: 16px;
        &.operator {
          font-size: 14px;
          margin-right: 16px;
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
          text-align: center;
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
    top: 60px;
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
    &.operator {
      top: 40px;
    }

    .option {
      overflow: hidden;
      background: $white;
      color: $alt-grey-5;
      padding: 8px;
      cursor: pointer;
      align-items: center;
      display: flex;
      height: 60px;
      justify-content: space-between;
      padding: 0px 0px 0px 16px;
      .label {
        display: flex;
        align-items: center;
        .item-icon {
          width: 30px;
          margin-right: 16px;
          width: 30px;
        }
      }
      &.operator {
        height: 40px;
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
.value {
  border-radius: 2px;
  font-weight: normal;
  text-align: center;
  padding: 4px;
  &.operator {
    font-size: 14px;
    margin-right: 8px;
  }
  &.string {
    border: 1px solid $string;
  }
  &.mixed {
    border: 1px solid $mixed;
  }
  &.boolean {
    border: 1px solid $boolean;
  }
  &.int {
    border: 1px solid $int;
  }
  &.float {
    border: 1px solid $float;
  }
  &.array {
    border: 1px solid $array;
  }
  &.map {
    border: 1px solid $map;
  }
  &.null {
    border: 1px solid $null;
  }
  &.result {
    border: 1px solid $result;
  }
  &.bytes {
    border: 1px solid $bytes;
  }
  &.boolean {
    border: 1px solid $boolean;
  }
  &.generic {
    border: 1px solid $generic;
  }
  &.integer {
    border: 1px solid $integer;
  }
}
</style>

<docs>
### Example
#### Operator select

```jsx
  <Select
    type="operator"
    :value="{
      primaryText: 'option 1',
    }"
    :options="[{primaryText: 'option 1', secondaryText: 'value'},{primaryText: 'option 2', secondaryText: 'value'}]"
  />
```
#### Big Select

```jsx
  <Select
    :value="{
      primaryText: 'option 1',
    }"
    :options="[{primaryText: 'option 1', secondaryText: 'value'},{primaryText: 'option 2', secondaryText: 'value'}]"
  />
```
</docs>

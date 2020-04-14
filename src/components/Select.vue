<template>
  <div @keydown.tab="tabKeyPressed = true" @blur.capture="handleBlur">
    <div :class="[type === 'operator' ? 'select-box-operator' : 'select-box']">
      <button
        ref="button"
        data-test="select-btn"
        id="select-button"
        aria-haspopup="listbox"
        aria-labelledby="select-label select-button"
        :aria-expanded="areOptionsVisible"
        class="selected-btn"
        :class="{ active: areOptionsVisible }"
        @click="toggleOptions"
        @keyup.up.down.prevent="showOptions"
        @keyup.up.prevent="selectPrevOption"
        @keyup.down.prevent="selectNextOption"
      >
        <div class="selected">
          <img class="item-icon" v-if="value.img" :src="value.img" alt="icon" />
          <div class="label">
            <div class="primary" :data-test="'value' + value.primaryText">
              {{ value.primaryText }}
            </div>
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
          <span v-if="value.secondaryText" :class="`value ${value.secondaryText}`">{{
            value.secondaryText
          }}</span>
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
        @focus="setupFocus"
        @keydown="search"
        @keyup.up.prevent="selectPrevOption"
        @keyup.down.prevent="selectNextOption"
        @keydown.up.down.prevent
        @keydown.enter.esc.prevent="reset"
      >
        <li
          v-for="(option, index) in options"
          :id="`select-option-${index}`"
          :ref="`option-${index}`"
          :data-test="`option-${index}`"
          :key="index"
          :aria-selected="activeOptionIndex === index"
          :class="activeOptionIndex === index && 'has-focus'"
          class="option"
          role="option"
          @click="selectOption(option)"
        >
          <div class="label">
            <img class="item-icon" v-if="option.img" :src="option.img" alt="icon" />
            <span class="primary">{{ option.primaryText }}</span>
          </div>
          <span :class="`value ${option.secondaryText}`">
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
    }
  },
  computed: {
    activeOptionIndex() {
      // TODO(#856): implement find for operator select, wait till the Radon Library is updated
      if (this.type === 'operator') {
        return this.options.findIndex(x => standardizeOperatorName(x.value) === this.value.value)
      } else {
        return this.options.findIndex(x => x.value === this.value || x === this.value)
      }
    },
    prevOptionIndex() {
      const next = this.activeOptionIndex - 1
      this.scrollTop(next - 1)
      return next >= 0 ? next : this.options.length - 1
    },
    nextOptionIndex() {
      const next = this.activeOptionIndex + 1
      this.scrollTop(next - 1)
      return next <= this.options.length - 1 ? next : 0
    },
    activeDescendant() {
      return `select-option-${this.activeOptionIndex}`
    },
  },
  methods: {
    scrollTop(next) {
      if (next >= 2 && next <= this.options.length - 2) {
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
      await this.$nextTick()
      if (this.$refs.button) {
        this.$refs.button.focus()
      }
    },
    setupFocus() {
      if (!this.value) {
        this.$emit('input', this.options[0])
      }
    },
    selectPrevOption() {
      this.$emit('input', this.options[this.prevOptionIndex])
    },
    selectNextOption() {
      this.$emit('input', this.options[this.nextOptionIndex])
    },
    search(e) {
      clearTimeout(resetKeysSoFarTimer)
      // No alphanumeric key was pressed.
      if (e.key.length <= 1) {
        resetKeysSoFarTimer = setTimeout(() => {
          this.keysSoFar = ''
        }, 500)
      }
      this.keysSoFar += e.key
      const matchingOption = this.options.find(x =>
        x.primaryText.toLowerCase().includes(this.keysSoFar)
      )
      const matchingOptions = this.options.filter(x => x.primaryText.indexOf(this.keysSoFar) !== -1)
      if (matchingOption) {
        this.$emit('filtered', matchingOptions)
      }
      if (matchingOption && this.keysSoFar === 'neEnter') {
        // TODO: implement filtered option
        this.$emit('input--->', matchingOption)
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/fonts.scss';
//as Select-box for Operators

.select-box-operator {
  min-width: 300px;
  position: relative;
  &:focus,
  &:focus-within {
    border-color: $grey-1;
    border-radius: 4px;
    box-shadow: 0 0 0 0.1rem $white;
  }
  &:focus-within .selected-btn {
    border: none;
  }

  .selected-btn {
    box-sizing: border-box;
    min-width: inherit;
    z-index: 1;
    min-height: 35px;
    align-items: center;
    background-color: $alt-grey-1;
    border-radius: 4px;
    border: 1px solid $alt-grey-1;
    color: $white;
    display: flex;
    padding: 0 0 0 16px;
    .selected {
      width: 100%;
      align-items: baseline;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .label {
        width: 100%;
        margin-right: 32px;
        display: flex;
        align-items: center;
        text-align: center;

        .primary {
          font-size: 16px;
          margin-right: 16px;
        }
        .icon {
          margin: 0;
        }
        .value {
          font-size: 16px;
          border-radius: 2px;
          text-align: center;
        }
      }
    }
  }

  .hidden {
    display: none;
  }

  .options {
    position: absolute;
    top: 34px;
    min-width: inherit;
    font-weight: 500;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    box-sizing: border-box;
    border-color: 1px solid $alt-grey-5;
    margin: 0;
    list-style-type: none;
    outline: none;

    .option {
      background: $grey-1;
      border-bottom: 1px solid $white;
      color: $alt-grey-5;
      padding: 8px;
      cursor: default;
      align-items: center;
      display: flex;
      height: 32px;
      font-size: 14px;
      justify-content: space-between;
      padding: 0px 0px 0px 16px;
      &.has-focus {
        background-color: $white;
        color: $alt-grey-1;
      }
    }
  }
}
.value {
  font-size: 16px;
  border-radius: 2px;
  text-align: center;
  padding: 8px;
  color: $black;
  &.string {
    background-color: $string;
  }
  &.mixed {
    background-color: $mixed;
  }
  &.boolean {
    background-color: $boolean;
  }
  &.int {
    background-color: $int;
  }
  &.float {
    background-color: $float;
  }
  &.array {
    background-color: $array;
  }
  &.map {
    background-color: $map;
  }
  &.null {
    background-color: $null;
  }
  &.result {
    background-color: $result;
  }
  &.bytes {
    background-color: $bytes;
  }
  &.boolean {
    background-color: $boolean;
  }
  &.generic {
    background-color: $generic;
  }
  &.integer {
    background-color: $integer;
  }
}
//as Select-box

.select-box {
  width: 100%;
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
    padding: 0 8px 0 16px;

    .selected {
      width: 100%;
      align-items: baseline;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .item-icon {
        margin-right: 16px;
        width: 30px;
      }
      .label {
        width: 100%;
        overflow: hidden;
        margin-right: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .primary {
          overflow: hidden;
          font-size: 16px;
          margin-right: 16px;
        }
        .value {
          overflow: hidden;
          font-size: 20px;
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
          margin-right: 16px;
          width: 30px;
        }
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

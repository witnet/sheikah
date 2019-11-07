<template>
  <div :class="[type === 'operator' ? 'select-box-operator' : 'select-box']">
    <div
      data-test="select-btn"
      ref="button"
      :class="`select ${active ? 'active' : ''}`"
      @click="active = !active"
    >
      <div class="selected">
        <div class="label">
          <span class="primary" :data-test="'value' + value.primaryText">
            {{ value.primaryText }}
          </span>
          <font-awesome-icon class="icon sort-down" icon="sort-down" />
        </div>
        <span :class="`value ${value.secondaryText}`">{{ value.secondaryText }}</span>
      </div>
    </div>
    <div
      :class="`options ${active ? 'active' : ''}`"
      v-show="active"
      v-closable="{ exclude: ['button'], handler: 'onClose' }"
    >
      <div
        v-for="option in options"
        :data-test="'option-' + option.primaryText"
        :key="option.value"
        :class="`option ${option.value === value ? 'selected' : ''}`"
        @click="() => selectOption(option)"
      >
        <span class="primary">{{ option.primaryText }}</span>
        <span :class="`value ${option.secondaryText}`">
          {{ option.secondaryText }}
        </span>
      </div>
    </div>
    <!-- {{ value }}
    <select v-model="selectValue" class="hidden">
      <option v-for="option in options" :value="option.value" :key="option.value">
        {{ option.primaryText }}
      </option>
    </select> -->
  </div>
</template>

<script>
export default {
  name: 'Select',
  data() {
    return {
      primaryText: '',
      secondaryText: '',
      active: false,
    }
  },
  props: {
    value: Object,
    options: Array,
    type: String,
  },
  methods: {
    onClose() {
      this.active = false
    },
    selectOption(option) {
      // this.value = option.value
      // this.primaryText = option.primaryText
      // this.secondaryText = option.secondaryText
      this.active = false
      this.$emit('input', option)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/fonts.scss';

//as-OPERATOR
.select-box-operator {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  user-select: none;
  height: 42px;

  .select {
    z-index: 1;
    min-height: 35px;
    align-items: center;
    background: $grey-1;
    border-radius: 3px;
    border: none;
    color: $white;
    display: flex;
    min-width: min-content;
    padding: 0 8px 0 16px;
    font-weight: normal;

    &.active,
    &:hover {
      background: $grey-1;
      color: $white;
    }

    .selected {
      align-items: baseline;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 50px;
      align-items: center;

      .label {
        display: flex;
        width: 100%;
        align-content: center;
        text-align: center;

        .primary {
          margin-right: 16px;
        }
        .sort-down {
          font-size: 16px;
          margin: 0;
        }
      }
      .icon {
        margin: 8px;
        font-size: 15px;
      }
    }
  }
  .options {
    z-index: 2;
    display: none;
    border-radius: 5px;
    margin-top: 8px;
    &.active {
      display: block;
    }
    .option {
      align-items: center;
      background: $grey-0;
      border-bottom: 1px solid $white;
      color: $grey-3;
      display: flex;
      height: 40px;
      justify-content: space-between;
      padding: 16px;
      font-weight: normal;
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

//not-an-OPERATOR

// .hidden {
//   // display: none;
// }

.select-box {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  user-select: none;
  height: 42px;
  width: min-content;

  .select {
    z-index: 1;
    min-height: 35px;
    align-items: center;
    background: none;
    border-radius: 4px;
    border: 1px solid $blue-6;
    color: $blue-6;
    display: flex;
    width: min-content;
    min-width: min-content;
    padding: 0 8px 0 16px;
    width: 190px;

    &.active,
    &:hover {
      border-color: $alpha-blue-1;
      color: $alpha-blue-1;
    }

    .selected {
      align-items: baseline;
      display: flex;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;

      .label {
        display: flex;
        justify-content: space-between;
        padding-right: 16px;

        .primary {
          margin-right: 16px;
        }
      }
    }
  }

  .options {
    z-index: 1;
    display: none;
    &.active {
      display: block;
    }
    border: 1px solid $blue-1;
    border-radius: 0 0 4px 4px;
    background-color: $blue-1;

    .option {
      align-items: center;
      box-sizing: border-box;
      color: $blue-6;
      display: flex;
      height: 32px;
      justify-content: space-between;
      padding: 0 16px;
      width: 100%;

      &:hover {
        color: $grey-0;
      }

      &.selected {
        background-color: $white;
      }
    }
  }
}
</style>

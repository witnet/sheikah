<template>
  <div :class="[type === 'operator' ? 'select-box-operator' : 'select-box']">
    <div ref="button" :class="`select ${active ? 'active' : ''}`" @click="active = !active">
      <div class="selected">
        <div class="label">
          <span class="primary">{{ value.primaryText }}</span>
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
    background: #c5c2c2;
    border-radius: 3px;
    border: none;
    color: white;
    display: flex;
    min-width: min-content;
    padding: 0 12px 0 16px;
    font-weight: normal;

    &.active,
    &:hover {
      background: #c5c2c2a9;
      color: rgb(255, 255, 255);
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
        margin: 10px;
        font-size: 15px;
      }
    }
  }
  .options {
    z-index: 2;
    display: none;
    border-radius: 5px;
    margin-top: 5px;
    &.active {
      display: block;
    }
    .option {
      align-items: center;
      background: #f0f0f0;
      border-bottom: 1px solid white;
      color: #949494;
      display: flex;
      height: 40px;
      justify-content: space-between;
      padding: 20px;
      font-weight: normal;
    }
  }
}
.value {
  font-size: 16px;
  padding: 6px;
  border-radius: 2px;
  text-align: center;
  color: rgb(0, 0, 0);
  white-space: nowrap;
  &.string {
    background-color: #c0abfa80;
  }
  &.mixed {
    background-color: #2e6ff280;
  }
  &.boolean {
    background-color: #aed58180;
  }
  &.int {
    background-color: #4fc3f780;
  }
  &.float {
    background-color: #e5737380;
  }
  &.array {
    background-color: #f0629280;
  }
  &.map {
    background-color: #f22ea480;
  }
  &.null {
    background-color: #ba68c880;
  }
  &.result {
    background-color: #9575cd80;
  }
  &.bytes {
    background-color: #7986cb80;
  }
  &.boolean {
    background-color: #ff8a6580;
  }
  &.generic {
    background-color: #ffb74d80;
  }
  &.integer {
    background-color: #aed58180;
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
    border: 1px solid #1a6cfb;
    color: #1a6cfb;
    display: flex;
    width: min-content;
    min-width: min-content;
    padding: 0 12px 0 16px;

    &.active,
    &:hover {
      border-color: #1a6dfbb6;
      color: #1a6cfbb6;
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
        width: 100%;

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
    border-bottom: 1px solid #40a9ff;
    border-left: 1px solid #40a9ff;
    border-radius: 0 0 4px 4px;
    border-right: 1px solid #40a9ff;

    .option {
      align-items: center;
      background: #fff;
      box-sizing: border-box;
      color: #1a6cfb;
      display: flex;
      height: 32px;
      justify-content: space-between;
      padding: 0 16px;
      width: 100%;

      &:hover {
        color: #40a9ff;
      }

      &.selected {
        background-color: #f9f9f9;
      }
    }
  }
}
</style>

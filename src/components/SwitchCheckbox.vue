<template>
  <div class="switch" @click="switchValue">
    <div class="wrapper">
      <div :class="`dot ${checked ? 'checked' : ''}`">
        <input class="input" type="checkbox" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchCheckbox',
  data() {
    return {
      checked: this.value,
    }
  },
  props: {
    value: Boolean,
  },
  methods: {
    switchValue() {
      this.checked = !this.checked
    },
  },
  watch: {
    checked(value) {
      this.$emit('switchCheckbox', value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.switch {
  display: inline-block;
  width: 40px;
  height: 20px;
  background: $grey-0;
  border-radius: 10px;

  // This class will be helpull in a future if we want to add more padding
  .wrapper {
    display: flex;
    align-items: center;
    width: 40px;
    height: 20px;
    border-radius: 10px;
    background-color: $grey-0;
  }

  .dot {
    background-color: $white;
    border-radius: 10px;
    width: 20px;
    height: 20px;
    transition: all 300ms;

    &.checked {
      background-color: $purple-6;
    }
  }

  .checked {
    transform: translate3d(100%, 0, 0);
  }

  .input {
    display: none;
  }
}
</style>

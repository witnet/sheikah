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
  props: {
    value: Boolean,
  },
  data() {
    return {
      checked: this.value,
    }
  },
  watch: {
    checked(value) {
      this.$emit('switchCheckbox', value)
    },
  },
  methods: {
    switchValue() {
      this.checked = !this.checked
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.switch {
  background: $grey-1;
  border-radius: 10px;
  display: inline-block;
  height: 20px;
  width: 40px;

  // This class will be helpull in a future if we want to add more padding

  .wrapper {
    align-items: center;
    background-color: $grey-1;
    border-radius: 10px;
    display: flex;
    height: 20px;
    width: 40px;
  }

  .dot {
    background-color: $white;
    border-radius: 10px;
    height: 20px;
    transition: all 300ms;
    width: 20px;

    &.checked {
      background-color: $purple-4;
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

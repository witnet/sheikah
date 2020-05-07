<template>
  <div class="stage-bar">
    <div
      :data-test="`stage-${stage.name}`"
      v-for="stage in stages"
      :key="stage.name"
      @click="() => changeStage(stage.name)"
      class="link-btn"
      :class="{ active: current === stage.name }"
    >
      {{ stage.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StageBar',
  methods: {
    changeStage: function(stage) {
      this.current = stage
      return this.$emit('change-stage', stage)
    },
  },
  props: {
    initialStage: { type: String, default: 'retrieve' },
  },
  data() {
    return {
      current: this.initialStage,
      stages: [{ name: 'retrieve' }, { name: 'aggregate' }, { name: 'tally' }],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.stage-bar {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, auto));
  grid-template-rows: 50px;
  overflow: hidden;
  .link-btn {
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $purple-2;
    color: $white;
    cursor: pointer;
    .link-btn:active,
    &:focus,
    &.active {
      background: $purple-3;
      color: $white;
    }
    &.active::after {
      border-left-color: $purple-3;
    }
  }
  .link-btn::before,
  .link-btn::after {
    content: '';
    position: absolute;
    z-index: 2;
    border-top: 27px solid transparent;
    border-bottom: 27px solid transparent;
    border-left: 18px solid;
    right: -18px;
    border-left-color: $alpha-purple;
  }
  .link-btn::after {
    border-top: 25px solid transparent;
    border-bottom: 25px solid transparent;
    border-left: 17px solid;
    right: -17px;
    border-left-color: $purple-2;
  }
  .link-btn:last-of-type::after,
  .link-btn:last-of-type::before {
    content: none;
  }
}
</style>

<docs>
### Example

```jsx
  <StageBar
    initialStage="retrieve"
  />
```
</docs>

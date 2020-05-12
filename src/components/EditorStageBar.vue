<template>
  <div>
    <div class="stage-bar">
      <div
        :data-test="`stage-${stage.name}`"
        v-for="stage in stages"
        :key="stage.name"
        @click="() => changeStage(stage.name)"
        class="link-btn"
        :class="{ active: current === stage.name }"
      >
        <span v-html="stage.label" />
      </div>
    </div>
  </div>
</template>

<script>
import { EDITOR_STAGES } from '@/constants'

export default {
  name: 'EditorStageBar',
  methods: {
    changeStage: function(stage) {
      this.current = stage
      return this.$emit('change-stage', stage)
    },
  },
  props: {
    initialStage: { type: String, default: EDITOR_STAGES.SETTINGS },
  },
  data() {
    return {
      current: this.initialStage,
      stages: [
        {
          label: '<span>1. Enter Template <span class="bolder">Settings</span></span>',
          name: EDITOR_STAGES.SETTINGS,
        },
        {
          label: '<span class="link">2. Select your <span class="bolder">Data Sources<span></span>',
          name: EDITOR_STAGES.SOURCES,
        },
        {
          label: '<span>3. Edit <span class="bolder">Source Scripts</span></span>',
          name: EDITOR_STAGES.SCRIPTS,
        },
        {
          label: '<span>4. Set <span class="bolder">Aggregator</span></span>',
          name: EDITOR_STAGES.AGGREGATIONS,
        },
        {
          label: '<span>5. Set <span class="bolder">Tally</span></span>',
          name: EDITOR_STAGES.TALLY,
        },
      ],
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
    align-items: center;
    background: $purple-2;
    color: $white;
    cursor: pointer;
    display: flex;
    font-size: 15px;
    font-weight: 100;
    height: 50px;
    justify-content: center;
    padding: 0 24px;
    position: relative;

    ::v-deep .bolder {
      font-size: 15px;
      font-weight: 500;
    }

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
  <EditorStageBar
    initialStage="retrieve"
  />
```
</docs>

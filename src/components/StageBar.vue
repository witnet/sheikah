<template>
  <div class="stage-bar">
    <button
      v-for="stage in stages"
      :key="stage.name"
      class="link-btn"
      :class="[current === stage.name ? 'active' : '']"
      @click="() => changeStage(stage.name)"
    >
      {{ stage.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'StageBar',
  props: {
    initialStage: { type: String, default: 'retrieve' },
  },
  data() {
    return {
      current: this.initialStage,
      stages: [{ name: 'retrieve' }, { name: 'aggregate' }, { name: 'tally' }],
    }
  },
  methods: {
    changeStage: function(stage) {
      this.current = stage
      return this.$emit('change-stage', stage)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.stage-bar {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-left: 16px;

  .link-btn {
    color: $alt-grey-2;
    font-weight: bold;
    font-family: 'Titillium Web';
    font-size: 16px;
    padding: 24px;
    text-decoration: none;
    border: none;
    border-bottom: 1.5px solid $alt-grey-1;
    outline: none;
    cursor: pointer;
    background: none;

    .link-btn:active,
    &:focus,
    &.active {
      outline: none;
      border-bottom: 2px solid $purple-4;
      color: $purple-4;
    }
  }
}
</style>

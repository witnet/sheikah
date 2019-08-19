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
      stages: [{ name: 'retrieve' }, { name: 'aggregate' }, { name: 'consensus' }],
    }
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
  padding-left: 20px;

  .link-btn {
    color: $grey-6;
    font-weight: bold;
    font-family: 'Titillium Web';
    font-size: 18px;
    padding: 20px;
    text-decoration: none;
    border: none;
    border-bottom: 2px solid $grey-4;
    outline: none;
    cursor: pointer;
    background: none;

    .link-btn:active,
    &:focus,
    &.active {
      outline: none;
      border-bottom: 2px solid $blue-6;
      color: $blue-6;
    }
  }
}
</style>

<template>
  <!-- TODO: delete extra parent in template -->
  <div>
    <div class="stage-bar">
      <div
        v-for="stage in stages"
        :key="stage.name"
        :ref="`stage-${stage.name}`"
        class="link-btn"
        :class="{ active: currentStage === stage.name }"
        tabindex="0"
        @click="changeStage(stage.name)"
      >
        <i18n-t
          :keypath="stage.label[0]"
          tag="span"
          :data-test="`stage-${stage.name}`"
          scope="global"
        >
          <span class="bolder">{{ $t(stage.label[1]) }}</span>
        </i18n-t>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { EDITOR_STAGES } from '@/constants'
export default {
  name: 'EditorStageBar',
  data() {
    return {
      stages: [
        {
          label: ['editor_stage_1_0', 'editor_stage_1_1'],
          name: EDITOR_STAGES.SETTINGS,
        },
        {
          label: ['editor_stage_2_0', 'editor_stage_2_1'],
          name: EDITOR_STAGES.SOURCES,
        },
        {
          label: ['editor_stage_3_0', 'editor_stage_3_1'],
          name: EDITOR_STAGES.SCRIPTS,
        },
        {
          label: ['editor_stage_4_0', 'editor_stage_4_1'],
          name: EDITOR_STAGES.AGGREGATIONS,
        },
        {
          label: ['editor_stage_5_0', 'editor_stage_5_1'],
          name: EDITOR_STAGES.TALLY,
        },
      ],
    }
  },
  computed: {
    ...mapState({
      currentStage: state => state.rad.currentStage,
    }),
  },
  created() {
    this.unsubscribe = this.$store.subscribe(mutation => {
      if (mutation.type === 'EDITOR_UNDO' || mutation.type === 'EDITOR_REDO') {
        this.$refs[`stage-${this.currentStage}`][0].focus()
      }
    })
  },
  beforeUnmount() {
    this.unsubscribe()
  },
  methods: {
    changeStage: function (stage) {
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, auto));
  grid-template-rows: 50px;
  overflow: hidden;
  position: relative;

  .link-btn {
    align-items: center;
    background: var(--stagebar-background-color);
    color: $white;
    cursor: pointer;
    display: flex;
    font-size: 15px;
    font-weight: 100;
    height: 50px;
    justify-content: center;
    outline: none;
    padding: 0 24px;
    position: relative;
    // stylelint-disable-next-line
    .bolder {
      font-size: 15px;
      font-weight: 500;
    }

    &:focus,
    &:active,
    .link-btn:active,
    &.active {
      background: var(--stage-toolbar-active-color);
      color: $white;
    }

    &.active::after,
    &:active::after {
      border-left-color: var(--stage-toolbar-border-left-active-color);
    }
  }

  .link-btn::before,
  .link-btn::after {
    border-bottom: 27px solid transparent;
    border-left: 18px solid;
    border-left-color: $alpha-purple;
    border-top: 27px solid transparent;
    content: '';
    position: absolute;
    right: -18px;
    z-index: 2;
  }

  .link-btn::after {
    border-bottom: 25px solid transparent;
    border-left: 17px solid;
    border-left-color: var(--stage-toolbar-border-left-color);
    border-top: 25px solid transparent;
    right: -17px;
  }

  .link-btn:last-of-type::after,
  .link-btn:last-of-type::before {
    content: none;
  }
}
</style>

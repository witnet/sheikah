<template>
  <BaseCard class="card-navigation" :style="{ width: `${width}px` }">
    <template #header>
      <div v-if="title" class="header">
        {{ title }}
      </div>
    </template>

    <template #content>
      <div
        class="content"
        :class="{ 'full-padding': !nextStep && !previousStep }"
      >
        <slot></slot>
      </div>
    </template>

    <template #alt-footer>
      <div class="alt-footer">
        <slot name="alt-footer"></slot>
      </div>
    </template>

    <template #footer>
      <div v-if="previousStep || nextStep" class="navigation-buttons">
        <el-button
          v-if="previousStep"
          tabindex="2"
          data-test="previous-step"
          class="button"
          @click="previousStep"
        >
          {{ previousText }}
        </el-button>
        <el-button
          v-if="nextStep"
          ref="next"
          tabindex="1"
          data-test="next-step"
          type="primary"
          :disabled="disabledNextButton"
          @click="nextStep"
        >
          {{ nextText }}
        </el-button>
      </div>
    </template>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/card/BaseCard.vue'
export default {
  name: 'NavigationCard',
  components: {
    BaseCard,
  },
  props: {
    nextStep: {
      type: Function,
      default: null,
    },
    nextText: {
      type: String,
      default: '',
    },
    previousStep: {
      type: Function,
      default: null,
    },
    previousText: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 600,
    },
    title: {
      type: String,
      default: '',
    },
    disabledNextButton: {
      type: Boolean,
    },
  },
  methods: {
    handleKeyUp: event => {
      if (event.keyCode === 13) {
        this.props.nextStep()
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card-navigation {
  background-color: var(--navigation-card-background);
  border: var(--navigation-card-border);
  border-radius: 2px;
  box-shadow: var(--default-box-shadow);

  .header {
    align-items: center;
    background: var(--navigation-card-header-background);
    color: var(--text-dark-background);
    display: flex;
    flex-flow: row nowrap;
    font-size: 24px;
    font-weight: medium;
    height: 100px;
    padding: 0 32px;
  }

  .content {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    justify-content: center;
    padding: 32px 32px 0;

    &.full-padding {
      padding: 32px;
    }
  }

  .navigation-buttons {
    box-sizing: border-box;
    padding: 32px;
    text-align: right;

    .button,
    .default {
      margin-right: 8px;
    }
  }
}
</style>

<template>
  <BaseCard class="card-navigation">
    <template v-slot:header>
      <div v-if="title" class="header">
        {{ title }}
      </div>
    </template>

    <template v-slot:content>
      <div
        class="content"
        :class="{ 'full-padding': !nextStep && !previousStep }"
      >
        <slot></slot>
      </div>
    </template>

    <template v-slot:alt-footer>
      <div class="alt-footer">
        <slot name="alt-footer"></slot>
      </div>
    </template>

    <template v-slot:footer>
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
import BaseCard from '@/components/card/BaseCard'
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
  background-color: $white;
  border: 1px solid $purple-4;
  border-radius: 2px;
  box-shadow: $default-box-shadow;
  width: 600px;

  .header {
    align-items: center;
    background: $purple-4;
    color: $white;
    display: flex;
    flex-flow: row nowrap;
    font-size: 24px;
    font-weight: medium;
    height: 100px;
    padding: 0 32px;
  }

  .content {
    background: $white;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    justify-content: center;
    padding: 32px 32px 0 32px;

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

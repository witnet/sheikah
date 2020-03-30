<template>
  <BaseCard class="card-navigation">
    <template v-slot:header>
      <div v-if="title" class="header">
        {{ title }}
      </div>
    </template>

    <template v-slot:content>
      <div class="content">
        <slot></slot>
      </div>
    </template>

    <template v-slot:alt-footer>
      <div class="alt-footer">
        <slot name="alt-footer"></slot>
      </div>
    </template>

    <template v-if="previousStep || nextStep" v-slot:footer>
      <div class="navigation-buttons">
        <el-button
          v-if="previousStep"
          data-test="previous-step"
          class="button"
          @click="previousStep"
        >
          {{ previousText }}
        </el-button>
        <el-button
          v-if="nextStep"
          data-test="next-step"
          type="primary"
          @click="nextStep"
          :disabled="disabled"
          ref="next"
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
  props: {
    nextStep: Function,
    nextText: String,
    previousStep: {
      type: Function,
      required: false,
    },
    previousText: String,
    title: String,
    disabled: Boolean,
  },
  components: {
    BaseCard,
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
  box-shadow: $default-box-shadow;
  width: 600px;
  border: 1px solid $blue-6;

  .header {
    background: $blue-6;
    padding: 0 32px;
    align-items: center;
    color: $white;
    display: flex;
    flex-flow: row nowrap;
    font-size: 24px;
    font-weight: 100;
    height: 100px;
  }

  .content {
    background: $white;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    padding: 32px;
  }

  .navigation-buttons {
    box-sizing: border-box;
    text-align: right;
    padding: 0px 32px 32px 32px;
  }
}
</style>

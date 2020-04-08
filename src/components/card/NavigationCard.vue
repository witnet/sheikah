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

    <template v-slot:footer>
      <div class="navigation-buttons">
        <el-button data-test="previous-step" class="button" type="text" @click="previousStep">
          {{ previousText }}
        </el-button>
        <el-button
          v-if="nextStep"
          data-test="next-step"
          type="primary"
          @click="nextStep"
          :disabled="disabledNextButton"
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
    previousStep: Function,
    previousText: String,
    title: String,
    disabledNextButton: Boolean,
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
  border: 1px solid $purple-6;
  width: 600px;
  border: 1px solid $purple-6;

  .header {
    background: $purple-6;
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
    justify-content: center;
    font-size: 16px;
    padding: 32px 32px 0px 32px;
  }

  .navigation-buttons {
    box-sizing: border-box;
    text-align: right;
    padding: 32px;
    .button,
    .default {
      margin-right: 8px;
    }
  }
}
</style>

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
        <Button class="button" data-test="previous-step" :onClick="previousStep">
          {{ previousText }}
        </Button>
        <Button class="button" data-test="next-step" type="primary" ref="next" :onClick="nextStep">
          {{ nextText }}
        </Button>
      </div>
    </template>
  </BaseCard>
</template>

<script>
import Button from '@/components/Button'
import BaseCard from '@/components/card/BaseCard'

export default {
  name: 'NavigationCard',
  props: {
    nextStep: Function,
    nextText: String,
    previousStep: Function,
    previousText: String,
    title: String,
  },
  components: {
    BaseCard,
    Button,
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
  width: 600px;
  // height: 550px;
  min-height: 400px;
  border: 1px solid $grey-0;

  .header {
    background: $sheikah-gradient;
    padding: 0 24px;
    align-items: center;
    color: $white;
    display: flex;
    flex-flow: row nowrap;
    font-size: 24px;
    font-weight: 100;
    height: 100px;
  }

  .content {
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

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
        <Button data-test="previous-step" type="navigation" :onClick="previousStep">
          {{ previousText }}
        </Button>
        <Button data-test="next-step" type="navigation" ref="next" :onClick="nextStep">
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
    height: 389px;
    padding: 32px;
    border: 1px solid $grey-0;
  }

  .navigation-buttons {
    border-left: 1px solid $grey-0;
    border-bottom: 1px solid $grey-0;
  }
}
</style>

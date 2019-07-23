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
        <Button type="navigation" :onClick="previousStep">{{ previousText }}</Button>
        <Button type="navigation" :onClick="nextStep">{{ nextText }}</Button>
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

  .header{
    background: linear-gradient(to right, #722ed1, #1a6cfb);
    padding: 0 20px;
    align-items: center;
    color: #f9f9f9;
    display: flex;
    flex-flow: row nowrap;
    font-size: 18px;
    font-weight: 100;
    height: 100px;
  }

  .content {
    font-size: 16px;
    height: 389px;
    padding: 30px;
    border: 1px solid #ececec;
  }

  .navigation-buttons {
    border-left: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
  }
}
</style>

<template>
  <div class="navigation">
    <BaseCard :title="title" class="navigation shadow">
      <p class="content">
        <slot></slot>
      </p>
      <div class="button-group">
      <Button type="navigation-button" @click="previousStep">Previous Step</Button>
      <Button type="navigation-button" @click="nextStep">Next Step</Button>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import Button from '@/components/Button'
import BaseCard from '@/components/BaseCard'

export default {
  name: 'NavigationCard',
  props: {
    title: String,
    previousStep: Function,
    nextStep: Function,
  },
  components: {
    Button,
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

<style lang='scss'>
@import '@/styles/app.global.scss';
@import '@/styles/_colors.scss';

.navigation > .title {
  background: $sheikah-gradient;
  color: $grey-2;
  font-size: $loading-modal-title-font-size;
  font-weight: 100;
}

.shadow {
  box-shadow: $default-box-shadow;
}

</style>

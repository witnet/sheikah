<template>
  <div class="navigation-card">
    <BaseCard :title="title" class="shadow">
      <div class="content">
        <slot></slot>
      </div>
        <Button type="navigation" :onClick="previousStep">{{ previousText }}</Button>
        <Button type="navigation" :onClick="nextStep">{{ nextText }}</Button>
    </BaseCard>
  </div>
</template>

<script>
import Button from '@/components/Button'
import BaseCard from '@/components/BaseCard'

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

<style lang="scss">
@import '@/styles/app.global.scss';
@import '@/styles/_colors.scss';

.navigation-card .title {
  align-items: center;
  background: $sheikah-gradient;
  color: $grey-2;
  display: flex;
  flex-flow: row nowrap;
  font-size: $loading-modal-title-font-size;
  font-size: 19px;
  font-weight: 100;
  height: 100px;
}

.navigation-card .title .card-title {
  margin-left: 40px;
}

.content {
  font-size: 16px;
  height: 389px;
}

.button-group {
  height: 10px;
  width: 100%;
}

.button-nav-card {
  align-self: flex-end;
}
</style>

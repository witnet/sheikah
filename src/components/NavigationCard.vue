<template>
  <div class="navigation">
    <BaseCard :title="title" class="navigation">
      <p class="content">
       {{ text }}
      </p>
        <Button type="navigation-button" @click="previousStep">
          Previous Step
        </Button>
        <Button type="navigation-button" @click="nextStep">
          Next Step
        </Button>
    </BaseCard>
  </div>
</template>
<script>
import Button from '@/components/Button'
import BaseCard from '@/components/BaseCard'
export default {
  name: 'navigationCard',
  props: {
    title: String,
    text: String,
    previousStep: Function,
    nextStep: Function,
  },
  components: {
    Button,
    BaseCard,
  },
  methods: {
    handleKeyUp: (event) => {
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
.navigation > .title {
  background: $sheikah-gradient;
  color: $grey-2;
  font-size: $loading-modal-title-font-size;
  font-weight: 100;
}

.content {
    padding: 30px;
  }

</style>

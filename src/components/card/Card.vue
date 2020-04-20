<template>
  <BaseCard class="card">
    <template v-if="title" v-slot:header>
      <p class="title">{{ title }}</p>
    </template>

    <template v-else v-slot:header>
      <slot name="header"></slot>
    </template>

    <template v-slot:content>
      <div class="content" :class="[shadowStyle, borderStyle, paddingStyle]">
        <slot></slot>
      </div>
    </template>
  </BaseCard>
</template>

<script>
import BaseCard from './BaseCard'

export default {
  name: 'Card',
  components: {
    BaseCard,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 250,
    },
    padding: {
      type: Boolean,
      // eslint-disable-next-line vue/no-boolean-default
      default: true,
    },
    shadow: {
      type: String,
      default: 'fat',
    },
    border: {
      type: Boolean,
      // eslint-disable-next-line vue/no-boolean-default
      default: true,
    },
  },
  computed: {
    shadowStyle() {
      const shadows = {
        fat: 'shadow-fat',
        thin: 'shadow-thin',
      }

      return shadows[this.shadow]
    },
    borderStyle() {
      return this.border ? 'border-purple' : ''
    },
    paddingStyle() {
      return this.padding ? 'padding' : ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card {
  .title {
    color: $alt-grey-3;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .content {
    max-width: 500px;
    border: 1px solid $purple-4;
    background: $white;
    border: 1px solid $grey-1;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    justify-content: center;

    &.padding {
      padding: 24px;
    }

    &.border-purple {
      border: 1px solid $purple-4;
    }

    &.shadow-thin {
      box-shadow: $card-box-shadow;
    }

    &.shadow-fat {
      box-shadow: $default-box-shadow;
    }
  }
}
</style>

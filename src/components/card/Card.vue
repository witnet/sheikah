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
  props: {
    title: String,
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
      required: false,
      default: true,
    },
    shadow: {
      type: String,
      required: false,
      default: 'fat',
    },
    border: {
      type: Boolean,
      required: false,
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
  components: {
    BaseCard,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card {
  .title {
    font-size: 16px;
    font-weight: 600;
    color: $alt-grey-3;
    margin-bottom: 8px;
  }

  .content {
    background: $white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 2px;
    font-size: 16px;
    border: 1px solid $grey-1;
    &.padding {
      padding: 32px;
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

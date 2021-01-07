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
    color: var(--text-medium-emphasis);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .content {
    background: var(--card-background);
    border: var(--card-border);
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    justify-content: center;

    &.padding {
      padding: 24px;
    }

    &.border-purple {
      border: var(--card-active-border);
    }

    &.shadow-thin {
      box-shadow: var(--card-box-shadow);
    }

    &.shadow-fat {
      box-shadow: var(--default-box-shadow);
    }
  }
}
</style>

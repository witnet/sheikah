<template>
  <BaseCard class="card">
    <template v-if="title" #header>
      <p class="title" :class="type">{{ title }}</p>
    </template>

    <template v-else #header>
      <slot name="header"></slot>
    </template>

    <template #content>
      <div
        class="content"
        :class="[shadowStyle, borderStyle, paddingStyle, type]"
      >
        <slot></slot>
      </div>
    </template>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/card/BaseCard.vue'

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
    type: {
      type: String,
      default: null,
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

    &.danger {
      color: $red-2;
    }
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

    &.danger {
      border: 1px solid $red-2;
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

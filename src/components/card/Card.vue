<template>
  <BaseCard :style="{ width: `${width}px`, height: `${height}px` }" class="card">
    <template v-if="title" v-slot:header>
      <p class="title">{{ title }}</p>
    </template>

    <template v-else v-slot:header>
      <slot name="header"></slot>
    </template>

    <template v-slot:content>
      <div class="content">
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
    color: $white;
    margin-bottom: 8px;
  }

  .content {
    background: $white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 2px;
    box-shadow: $default-box-shadow;
    font-size: 16px;
    padding: 32px;
  }
}
</style>

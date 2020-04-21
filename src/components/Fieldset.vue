<template>
  <div class="fieldset">
    <header class="header">
      <p class="title">{{ title }}</p>
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      <p v-if="helper" class="helper">{{ helper }}</p>
    </header>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Fieldset',
  props: {
    /**
     * Main title
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Secondary title
     */
    subtitle: {
      type: String,
      required: false,
    },
    /**
     * Terciary title
     */
    helper: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.fieldset {
  .header {
    margin-bottom: 14px;
    display: flex;
    .title {
      color: $alt-grey-5;
      font-size: 16px;
      font-weight: bold;
    }

    .subtitle {
      color: $grey-4;
      font-size: 14px;
      margin-left: 8px;
    }

    .helper {
      color: $alt-grey-5;
      font-size: 10px;
      opacity: 50%;
      font-style: italic;
      margin-left: 25px;
      align-self: center;
    }
  }
}
</style>

<docs>
### Example

```jsx
  <Fieldset
    title="title"
    subtitle="subtitle"
    helper="helper"
  >
    <div :style="{ width: '200px', height: '100px' }">Content</div>
  </Fieldset>

```
</docs>

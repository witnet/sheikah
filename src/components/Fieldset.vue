<template>
  <div class="fieldset">
    <header class="header">
      <div class="texts">
        <p class="title" :class="[type]">{{ title }}</p>
        <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
        <p v-if="helper" class="helper">{{ helper }}</p>
      </div>
      <font-awesome-icon
        v-if="closable"
        class="icon cross close"
        icon="times"
        @click="onClose"
      />
    </header>
    <div :class="[type]">
      <slot></slot>
    </div>
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
      default: '',
    },
    /**
     * Terciary title
     */
    helper: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    closable: {
      type: Boolean,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.fieldset {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;

    .texts {
      display: flex;

      .title {
        color: var(--text-medium-emphasis);
        font-size: 16px;
        font-weight: bold;

        &.help {
          font-size: 13px;
        }
      }

      .subtitle {
        color: var(--text-low-emphasis);
        font-style: italic;
        font-weight: medium;
        margin-left: 8px;
        max-width: 650px;
        overflow-wrap: break-word;
      }

      .helper {
        align-self: center;
        color: var(--text-medium-emphasis);
        font-size: 10px;
        font-style: italic;
        margin-left: 25px;
        opacity: 0.5;
      }
    }

    .close {
      align-self: flex-end;
      cursor: pointer;
      font-size: 14px;
      opacity: 0.4;
    }
  }

  .help {
    // default style for paragraphs added in the slot
    // stylelint-disable-next-line
    :v-deep(p) {
      color: var(--text-low-emphasis);
      font-size: 13px;
      font-style: italic;
      font-weight: lighter;
      line-height: 1.5;
      margin-bottom: 8px;
    }
  }
}
</style>

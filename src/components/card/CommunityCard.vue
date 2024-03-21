<template>
  <a :href="url" target="_blank" class="card-layout community-link">
    <div class="clip">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="icon-container">
        <slot class="icon" name="icon-social"></slot>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'CommunityCard',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card-layout {
  background: var(--community-card-background);
  border: var(--community-card-border);
  border-radius: 2px;
  box-shadow: var(--default-box-shadow);
  color: var(--community-card-title);
  cursor: pointer;
  display: flex;
  justify-content: center;
  text-decoration: none;
  padding: 32px 0 0 32px;

  &:hover,
  :active {
    color: var(--community-card-title);
  }

  .clip {
    border-radius: 5px;
    clip-path: inset(0 0% 0% 0);
    display: flex;
    flex-wrap: wrap;

    * {
      flex: 1 415px;
      padding: 16px;
    }

    .header {
      color: var(--community-card-title);
      font-size: 18px;
    }

    .content {
      color: var(--text-medium-emphasis);
      line-height: 1.5em;
    }

    .icon-container {
      margin: -48px -40px;
      text-align: right;
    }

    &:hover {
      .header {
        text-decoration: underline;
      }

      .icon-container {
        transform: rotate(-3deg) scale(1);
        transition: transform 0.2s ease;
      }
    }
  }
}
</style>

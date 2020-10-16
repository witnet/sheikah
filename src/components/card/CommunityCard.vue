<template>
  <a :href="url" target="_blank" class="card-layout">
    <div class="clip">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="icon-container">
        <slot name="icon-social"></slot>
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
  background: $white;
  border: 1px solid $purple-4;
  border-radius: 2px;
  box-shadow: $default-box-shadow;
  color: $purple-4;
  cursor: pointer;
  display: flex;
  padding: 32px 0 0 32px;
  text-decoration: none;

  &:hover,
  :active {
    color: $purple-4;
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
      color: $purple-4;
      font-size: 18px;
    }

    .content {
      color: $alt-grey-5;
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

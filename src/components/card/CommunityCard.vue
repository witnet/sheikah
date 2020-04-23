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
    url: String,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card-layout {
  box-shadow: $default-box-shadow;
  border: 1px solid $purple-4;
  border-radius: 2px;
  background: $white;
  padding: 32px 0px 0px 32px;
  display: flex;

  .clip {
    clip-path: inset(0 0% 0% 0);
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;

    &:hover .icon-container {
      transition: transform 0.2s ease;
      transform: rotate(-3deg) scale(1);
    }
    &:hover .header {
      text-decoration: underline;
    }
    & > * {
      flex: 1 415px;
      padding: 16px;
    }
    .header {
      font-size: 18px;
      color: $purple-4;
    }
    .content {
      color: $alt-grey-5;
      line-height: 1.5em;
    }
    .icon-container {
      text-align: right;
      margin: -48px -40px;
    }
  }
}
</style>

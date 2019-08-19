<template>
  <div class="card-layout">
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
  </div>
</template>

<script>
export default {
  name: 'CommunityCard',
}
</script>

<style lang="scss" scoped>
.card-layout {
  box-shadow: 1px 3px 11px 0px rgba(158, 158, 158, 0.445);
  margin: 30px;
  padding: 50px 0px 0px 50px;
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
      flex: 1 400px;
      padding: 15px;
    }
    .header {
      font-size: 20px;
      color: #1a6cfb;
    }
    .content {
      color: rgb(102, 101, 101);
      line-height: 1.5em;
    }
    .icon-container {
      text-align: right;
      margin: -50px -30px;
    }
  }
}
</style>

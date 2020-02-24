<template>
  <router-link class="link" :to="link">
    <Button data-test="local-wallet" class="option">
      <p class="name">{{ name }}</p>
      <font-awesome-icon class="angle" icon="angle-right" />
    </Button>
  </router-link>
</template>

<script>
export default {
  name: 'RedirectionOption',
  props: {
    link: String,
    name: String,
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.wallets {
  overflow-y: auto;
  height: 200px;
  margin-bottom: 24px;
}

.link {
  text-decoration: none;
}

.option {
  background: $white;
  border-radius: 3px;
  border: 1px solid $grey-0;
  color: $grey-5;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 60px;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 24px;
  width: 100%;
  &:focus,
  &:hover {
    outline: none;
    cursor: pointer;
    border-color: $blue-6;
    color: $blue-6;
  }

  .name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 16px 0 0;
  }

  .angle {
    align-self: center;
  }
}
</style>

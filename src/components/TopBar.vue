<template>
  <div class="top-bar">
    <router-link class="link" to="/wallet/transaction">Transactions</router-link>
    <router-link class="link" to="/wallet/receive">Receive</router-link>
    <router-link class="link" to="/wallet/send">Send</router-link>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
}
</script>

<style lang="scss">@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.top-bar {
  border-bottom: 1px solid $grey-4;
  display: flex;
  flex-flow: row wrap;
  height: 64px;
  justify-content: flex-start;
  padding-left: 20px;

  .link {
    color: $grey-6;
    font-weight: bold;
    height: 64px;
    line-height: 25px;
    padding: 20px;
    text-decoration: none;

    &.router-link-active {
      border-bottom: 2px solid $blue-6;
      color: $blue-6;
    }
  }
}

</style>

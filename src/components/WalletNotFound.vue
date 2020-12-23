<template>
  <div class="container">
    <div class="alert">
      <div class="content">
        <p class="title">{{ this.$t('wallet_disconnected') }}</p>
        <img class="icon" src="@/resources/svg/disconnected2.svg" />
        <p class="description">
          {{ this.$t('connection_problem') }}
        </p>
      </div>
      <div class="link-container">
        <a
          class="link"
          href="https://github.com/witnet/witnet-rust/tree/master/wallet"
          target="_blank"
        >
          https://github.com/witnet/witnet-rust/tree/master/wallet
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WalletNotFound',
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.container {
  align-items: center;
  background-color: $alpha-purple;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  .alert {
    background-color: $yellow-0;
    border: 1px solid $grey-1;
    border-radius: 2px;
    box-shadow: $card-box-shadow;
    overflow: hidden;
    width: 475px;

    .content {
      align-items: center;
      display: grid;
      grid-template-columns: auto max-content;
      padding: 16px;

      .title {
        color: $alt-grey-5;
        font-size: 18px;
        font-weight: 500;
        padding-bottom: 16px;
      }

      .icon {
        padding-bottom: 16px;
      }

      .description {
        color: $alt-grey-5;
        font-size: 16px;
      }
    }

    .link-container {
      background-color: $white;
      font-size: 14px;
      margin-top: 16px;
      padding: 16px;

      .link {
        color: $alt-grey-5;
        cursor: pointer;
        line-height: 1.5;
        text-decoration: none;
      }
    }
  }
}
</style>

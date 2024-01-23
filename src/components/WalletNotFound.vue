<template>
  <div class="container">
    <div class="alert">
      <div class="content">
        <p class="title">{{ $t('wallet_disconnected') }}</p>
        <!-- <img src="@/resources/svg/disconnected.svg" class="icon" /> -->
        <CustomIcon name="disconnected" class="icon" />
        <p class="description">
          {{ $t('connection_problem') }}
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
  background-color: var(--app-background-color);
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  .alert {
    background-color: var(--alert-background);
    border: var(--alert-border);
    border-radius: 2px;
    box-shadow: var(--card-box-shadow);
    overflow: hidden;
    width: 475px;

    .content {
      align-items: center;
      display: grid;
      grid-template-columns: auto max-content;
      padding: 16px;

      .title {
        color: var(--alert-color-text);
        font-size: 18px;
        font-weight: 500;
        padding-bottom: 16px;
      }

      .icon {
        padding-bottom: 16px;
      }

      .description {
        color: var(--alert-color-text);
        font-size: 16px;
      }
    }

    .link-container {
      background-color: var(--alert-link-background);
      font-size: 14px;
      margin-top: 16px;
      padding: 16px;

      .link {
        color: var(--alert-colot-link-text);
        cursor: pointer;
        line-height: 1.5;
        text-decoration: none;
      }
    }
  }
}
</style>

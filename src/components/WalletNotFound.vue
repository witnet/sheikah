<template>
  <div class="container">
    <div class="alert">
      <p class="title">Wallet disconnected</p>
      <p class="description">
        There is a connection problem. The wallet or the node is not running properly. For more
        information visit:
      </p>
      <div class="link-container">
        <a
          class="link"
          @click="
            () => {
              openExternalLink('https://github.com/witnet/witnet-rust/tree/master/wallet')
            }
          "
        >
          https://github.com/witnet/witnet-rust/tree/master/wallet
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { openInExternalApp } from '@/utils'

export default {
  name: 'WalletNotFound',
  methods: {
    openExternalLink: async url => {
      await openInExternalApp(url)
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .alert {
    background-color: $orange-0;
    width: 400px;
    .title {
      color: $orange-1;
      font-weight: bold;
      font-size: 18px;
      padding-bottom: 16px;
    }
    .description {
      color: $orange-1;
      font-size: 16px;
    }
    .link-container {
      font-size: 14px;
      margin-top: 16px;
      padding: 8px;
      background-color: $white;
      .link {
        line-height: 1.5;
        color: $alt-grey-5;
      }
    }
  }
}
</style>

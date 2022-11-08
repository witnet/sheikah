<template>
  <Card class="wallet-seed-type" data-test="header-1">
    <p class="text header">
      {{ $t('import_wallet') }}
    </p>
    <ul class="options">
      <li v-for="option in options" :key="option.name" class="option">
        <el-button class="big" type="primary" @click="redirectTo(option.route)">
          {{ option.name }}
        </el-button>
      </li>
      <li v-if="walletInfos && walletInfos.length" class="option">
        <el-button
          class="big capitalize"
          data-test="back"
          @click="redirectTo('/welcome-back/wallet-list')"
        >
          {{ $t('back') }}
        </el-button>
      </li>
    </ul>
  </Card>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/card/Card.vue'

export default {
  name: 'WalletSeedTypeSelection',
  components: {
    Card,
  },
  data() {
    console.log('--------->', this.$i18n.tm('create_new_wallet'))
    return {
      options: [
        {
          name: this.$t('create_new_wallet'),
          route: '/ftu/disclaimer',
        },
        {
          name: this.$t('import_wallet_from_seed'),
          route: '/ftu/import-wallet',
        },
        {
          name: this.$t('import_wallet_from_xprv'),
          route: '/ftu/import-xprv',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      walletInfos: state => state.wallet.walletInfos,
    }),
  },
  methods: {
    redirectTo(path) {
      this.$router.push(path)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.wallet-seed-type {
  min-width: 500px;

  .text {
    margin-bottom: 32px;

    &.header {
      font-size: 20px;
    }
  }

  .options {
    .option {
      margin-bottom: 16px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .cancel-btn {
    text-align: right;
  }

  .create-wallet-text {
    color: $font-color-dark;
  }
}
</style>

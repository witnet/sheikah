<template>
  <NavigationCard
    :title="$t('identify_wallet')"
    :previous-text="$t('back')"
    :next-text="$t('next')"
    :previous-step="() => $router.push(previousRoute)"
    :next-step="() => $router.push(nextRoute)"
  >
    <p class="paragraph">
      {{ $t('wallet_description') }}
    </p>
    <div class="form-row password">
      <p class="capitalize">
        {{ $t('name') }}
        <el-tooltip trigger="hover" effect="light">
          <font-awesome-icon class="info" icon="info-circle" />
          <template #content class="info-message">
            {{ $t('wallet_name_info') }}
          </template>
        </el-tooltip>
      </p>
      
      <el-input v-model="title" :maxlength="30" class="password" />
    </div>
    <div class="form-row password">
      <p class="capitalize">
        {{ $t('description') }}
        <el-tooltip trigger="hover" effect="light">
          <font-awesome-icon class="info" icon="info-circle" />
          <template #content class="info-message">
            {{ $t('wallet_description_info') }}
          </template>
        </el-tooltip>
      </p>
      <el-input
        v-model="description"
        type="textarea"
        class="password"
        resize="none"
        :rows="3"
      />
    </div>
  </NavigationCard>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard.vue'

export default {
  name: 'WalletSeedBackup',
  components: {
    NavigationCard,
  },
  computed: {
    ...mapState({
      walletTitle: state => state.wallet.title,
      walletDescription: state => state.wallet.description,
    }),
    isImportingMnemonics() {
      return this.$route.query && this.$route.query.import
    },
    isImportingXprv() {
      return this.$route.query && this.$route.query.xprv
    },
    nextRoute() {
      if (this.isImportingMnemonics) {
        return `/ftu/encryption-pass?import=true`
      } else if (this.isImportingXprv) {
        return `/ftu/encryption-pass?xprv=true`
      } else {
        return `/ftu/encryption-pass`
      }
    },
    previousRoute() {
      if (this.isImportingMnemonics) {
        return '/ftu/import-wallet'
      } else if (this.isImportingXprv) {
        return `/ftu/wallet-birthdate`
      } else {
        return '/ftu/seed-validation'
      }
    },
    title: {
      set(val) {
        this.setWalletDescription({ title: val })
      },
      get() {
        return this.walletTitle
      },
    },
    description: {
      set(val) {
        this.setWalletDescription({ description: val })
      },
      get() {
        return this.walletDescription
      },
    },
  },
  methods: {
    ...mapMutations(['setWalletDescription']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.paragraph {
  margin-bottom: 32px;
}

.form-row {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 16px;
  max-width: 500px;

  &.password {
    display: flex;
    justify-content: space-between;
    max-width: none;
  }

  &.form-row:last-of-type {
    margin: 0;
  }

  .password {
    width: 350px;
  }
}
</style>

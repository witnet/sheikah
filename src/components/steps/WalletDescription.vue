<template>
  <NavigationCard
    title="Identify your wallet"
    previous-text="Back"
    next-text="Next"
    :previous-step="() => $router.push(previousRoute)"
    :next-step="() => $router.push(nextRoute)"
  >
    <p class="paragraph">
      Keep track of and describe your Witnet wallet by filling in the boxes
      below.
    </p>
    <div class="form-row password">
      <p>
        Name
        <el-tooltip trigger="hover" effect="light">
          <font-awesome-icon class="info" icon="info-circle" />
          <div slot="content" class="info-message">
            Give your wallet a name (e.g. "Main", "HODL", "For Smart
            Contracts"). Note: Your wallet's title will be visible from your
            wallet list in Sheikah's homepage
          </div>
        </el-tooltip>
      </p>

      <el-input v-model="title" class="password" />
    </div>
    <div class="form-row password">
      <p>
        Description
        <el-tooltip trigger="hover" effect="light">
          <font-awesome-icon class="info" icon="info-circle" />
          <div slot="content" class="info-message">
            Let your future self know the main functions and details of the
            wallet. Note: the description will be visible only after you open
            your wallet
          </div>
        </el-tooltip>
      </p>
      <el-input
        v-model="description"
        type="textarea"
        class="password"
        resize="none"
        :rows="3"
        :maxlength="300"
      />
    </div>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import { mapMutations, mapState } from 'vuex'

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
        return `/ftu/import-xprv`
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

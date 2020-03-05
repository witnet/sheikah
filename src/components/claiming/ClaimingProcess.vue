<template>
  <div>
    <Card class="introduction" v-if="sessionId" :width="600" :height="440">
      <template v-slot:header>
        <div class="header">
          Claiming process
        </div>
      </template>
      <ul class="list">
        <div class="wallets">
          <li>
            <RedirectionOption
              type="forward"
              link="/ftu/import-wallet"
              name="Already claimed my tokens"
            />
          </li>
        </div>
        <li>
          <RedirectionOption
            data-test="create-wallet"
            type="forward"
            link="/ftu/claiming-info"
            name="Start claiming process"
          />
        </li>
      </ul>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/card/Card'
import RedirectionOption from '@/components/RedirectionOption'

export default {
  name: 'claimingProcess',
  components: {
    Card,
    RedirectionOption,
  },
  data() {
    return {
      subtitle: 'Already claimed your tokens?',
      texts: {
        0: 'A wallet is an app that keeps your credentials safe and lets you interface with the Witnet blockchain in many ways: from transferring Wit to someone else to creating smart contracts.',
      },
    }
  },
  computed: {
    sessionId() {
      const walletInfosLength = this.$store.state.wallet.walletInfos.length
      return walletInfosLength > 0
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.introduction {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header {
  align-items: center;
  background: $sheikah-gradient;
  display: flex;
  font-size: 24px;
  font-weight: 100;
  height: 100px;
  padding: 0 24px;
  color: $white;
}
</style>

<template>
  <div data-test="welcome-back" class="welcome-back">
    <div class="bar">
      <CustomIcon class-name="row sheikah-icon" :name="'sheikah-icon'" />
      <p class="row title">{{ $t('welcome_back') }}</p>
      <p class="row subtitle">
        {{ $t('sheikah_description') }}
      </p>
      <div class="icon-container" @click="$router.push('/settings/general')">
        <font-awesome-icon icon="cog" class="icon" />
      </div>
    </div>
    <Version />
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CustomIcon from '@/components/CustomIcon.vue'
import Version from '@/components/Version.vue'

export default {
  name: 'WelcomeBack',
  components: {
    CustomIcon,
    Version,
  },
  computed: {
    ...mapState({
      status: state => state.wallet.networkStatus,
    }),
  },
  watch: {
    status(status) {
      if (status === 'error') {
        this.$router.push('/wallet-not-found')
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.welcome-back {
  align-items: center;
  background-color: var(--app-background-color);
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  .bar {
    color: var(--text-medium-emphasis);
    display: flex;
    flex-direction: column;
    margin-right: 100px;
    padding: 20px;
    width: 400px;

    .row {
      margin-bottom: 24px;
      text-align: left;
    }

    .icon-container {
      cursor: pointer;
      margin: -10px;
      padding: 10px;
    }

    .icon {
      color: var(--text-medium-emphasis);
      font-size: 20px;
    }

    .title {
      font-family: 'Raleway', sans-serif;
      font-size: 48px;
      font-weight: bold;
      line-height: inherit;
    }

    .sheikah-icon {
      width: 70px;
    }
  }
}
</style>

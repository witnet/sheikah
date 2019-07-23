<template>
<div class="welcome-back">
  <div class="layout">
    <div class="bar">
      <p class="title">Welcome Back</p>
      <p class="settings">
        <font-awesome-icon icon="cog" />
        App Settings
      </p>
    </div>

    <div class="content">
      <router-view />
    </div>
  </div>
</div>
</template>

<script>
import Card from '@/components/card/Card'

export default {
  name: 'WelcomeBack',
  components: {
    Card,
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.welcome-back {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .layout {
    height: 400px;
    width: 600px;
    display: grid;
    grid-template-columns: 160px 1fr;
    box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);

    .bar {
      background: $sheikah-gradient;
      padding: 20px;
      justify-content: space-between;
      display: flex;
      flex-direction: column;

      .title {
        font-size: 22px;
        color: white;
        border: none;
      }

      .settings {
        color: white;
      }
    }

    .content {
      padding: 30px;
    }
  }
}
</style>

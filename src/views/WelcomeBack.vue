<template>
<div class="centered">
  <BaseCard class="card">
    <div class="sidebar">
      <p class="title">Welcome Back</p>
      <p class="settings">
        <font-awesome-icon icon="cog" />
        App Settings
      </p>
    </div>

    <router-view />
  </BaseCard>
</div>
</template>

<script>
import BaseCard from '@/components/BaseCard'

export default {
  name: 'WelcomeBack',
  components: {
    BaseCard,
  },
}
</script>

<style scoped lang="scss">
  @import '@/styles/theme.scss';
  @import '@/styles/_colors.scss';

.centered {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  height: 400px;
  min-width: 600px;
  display: grid;
  grid-template-columns: 30% 1fr;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);

  .sidebar {
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
    .text {
      margin-bottom: 30px;
    }
    .list {
      height: 240px;
      overflow: auto;

      .option {
        margin-bottom: 10px;
        background: white;
        border: 1px solid #ececec;
        color: #4d4d4d;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        height: 60px;
        justify-content: space-between;
        padding: 0 20px;
        width: 100%;
        border-radius: 3px;

        &:hover {
          border-color: $blue-6;
          color: $blue-6;
        }
      }

      a {
        text-decoration:none;
      }
    }
  }
}
</style>

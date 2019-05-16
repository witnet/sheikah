<template>
  <div>
    <el-header class="el-header">
      <div>
        <router-link to="/wallet/transaction">Transaction</router-link>
      </div>
      <div>
        <router-link to="/wallet/receive">Receive</router-link>
      </div>
      <div>
        <router-link to="/wallet/send">Send</router-link>
      </div>
    </el-header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Wallet',
}
</script>

<style scoped>
.el-header {
  font-size: 12px;
  display: flex;
}
.el-header > div {
  margin: 0 20px;
}
</style>

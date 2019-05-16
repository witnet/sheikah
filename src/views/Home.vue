<template>

<div class="grid">
  <div class="sidebar">

    <router-link class="logo" to="/">
      Sheikah
    </router-link>

    <router-link class="link" to="/wallet">
      <i class="el-icon-message"></i><span class="label">Wallet</span>
    </router-link>

    <router-link class="link" to="/request">
      <i class="el-icon-message"></i><span class="label">Data request</span>
    </router-link>

    <router-link class="link" to="/marketplace">
      <i class="el-icon-message"></i><span class="label">Marketplace</span>
    </router-link>

    <router-link class="link" to="/community">
      <i class="el-icon-message"></i><span class="label">Community</span>
    </router-link>
  </div>

  <div class="main">
    <router-view></router-view>
  </div>
</div>

  <!-- <el-container class="container">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu>
        <el-menu-item index="2">
          <template slot="title">
            <router-link to="/wallet">
              <i class="el-icon-message"></i> Wallet
            </router-link>
          </template>
        </el-menu-item>
      </el-menu>

      <el-menu>
        <el-menu-item index="2">
          <template slot="title">
            <router-link to="/request">
              <i class="el-icon-message"></i>Data request
            </router-link>
          </template>
        </el-menu-item>
      </el-menu>

      <el-menu>
        <el-menu-item index="2">
          <template slot="title">
            <router-link to="/marketplace">
              <i class="el-icon-message"></i>Marketplace
            </router-link>
          </template>
        </el-menu-item>
      </el-menu>

      <el-menu>
        <el-menu-item index="2">
          <template slot="title">
            <router-link to="/community">
              <i class="el-icon-message"></i>Community
            </router-link>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <router-view></router-view>
  </el-container> -->
</template>

<script>
export default {
  data () {
    const item = {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    }
    return {
      tableData: Array(20).fill(item),
    }
  },
}
</script>

<style>
.label {
  margin-left: 5px;
}

.logo {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  font-size: 24px;
  font-weight: 900;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #ffffff;
  text-decoration: none;
  height: 50px;
}

.link {
  align-items: center;
  border-left: 5px solid lightgray;
  color: grey;
  display: flex;
  flex-flow: row nowrap;
  font-size: 16px;
  font-weight: 700;
  margin-top: 5px;
  padding: 10px;
  text-decoration: none;
  height: 40px;
}

.grid {
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 30% 1fr;
  height: 100%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  grid-column: 1;
  /* justify-content: space-between */
}

.el-header {
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.container {
  height: 100vh;
}

  .sidebar {
    width: 15vw;
  }

  .main {
    height: 100vh;
    overflow-y: auto;
    width: 100%;
  }

</style>

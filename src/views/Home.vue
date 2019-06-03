<template>
  <div class="wrapper">
      <Sidebar />
      <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: 'Home',
  components: {
    Sidebar,
  },
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

@import url('https://fonts.googleapis.com/css?family=Titillium+Web:300,300i,400,400i,600,600i&display=swap');

.wrapper {
  display: flex;
  flex-flow: row nowrap
}

.main {
  background-color: none;
  height: 100vh;
  overflow-y: auto;
  width: 85vw;
  background-color: none;
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

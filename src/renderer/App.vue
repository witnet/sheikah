
<template lang="pug">
  #app Basic pug {{ msg }}
    #nav 
      router-link(to="/") Home
      |  |  
      router-link(to="/counter") Counter 
    router-view
</template>


<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      msg: "boilerplate"
    }
  }
})
</script>


<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>


<template lang="pug">
  #main
    #nav
      router-link(to="/") Home
      |  |  
      router-link(to="/about") About 
    router-view
</template>


<script lang='ts'>
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class App extends Vue {}
</script>

<style lang="stylus">
#main {
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

<template lang="pug">
    div
        h3 Welcome
        | This is the counter page
        div
          #counter  {{ count }} 
          button(@click="increment") Increment
</template>

<script lang='ts'>
  import Vue from "vue"
  import Component from "vue-class-component"

  @Component
  export default class About extends Vue {
    count: number = 0
    public data () {
      return {
        count: 0
      }
    }

    public increment () {
      this.count++
    }
  }
</script>

<style lang="stylus" >
  #counter {
    padding : 20px;
  }
</style>
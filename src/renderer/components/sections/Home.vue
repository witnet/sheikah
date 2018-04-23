<template lang="pug">
  div
    img#logo(src="~@/assets/logo.png")
    h3.title Welcome 
    | This is the Home page 
</template>

<script lang='ts'>
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class Home extends Vue {}
</script>

<style lang="stylus">
  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }
</style>



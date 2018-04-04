// import Vue from 'vue'
import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  "routes": [
    {
      "path": "/",
      "name": "Home",
      "component": require("../components/sections/Home.vue").default,
    },
    {
      "path": "/about",
      "name": "About",
      "component": require("../components/sections/About.vue").default,
    },
    {
      "path": "*",
      "redirect": "/",
    },
  ],
})

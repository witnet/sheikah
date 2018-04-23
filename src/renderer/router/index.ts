import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: require("@/components/sections/Home").default
    },
    {
      path: "/counter",
      name: "counter",
      component: require("@/components/sections/Counter").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
})

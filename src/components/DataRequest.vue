<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'DataRequest',
  components: {
    TopBar,
  },
  data () {
    return {
      tabs: [
        { name: 'Templates', link: '/request/templates' },
      ],
    }
  },
}
</script>

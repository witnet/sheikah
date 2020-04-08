<template>
  <div class="layout" >
    <Sidebar />
    <slot></slot>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'LayoutSidebar',
  components: {
    Sidebar,
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Titillium+Web:300,300i,400,400i,600,600i&display=swap');

.layout {
  display: grid;
  grid-template: 1fr / auto 1fr;
}
</style>

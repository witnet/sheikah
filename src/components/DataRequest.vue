 <template>
  <div>
    <TopBar :tabs="tabs" />
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'

export default {
  name: 'DataRequest',
  components: {
    TopBar,
  },
  data () {
    return {
      tabs: [
        { name: 'Editor', link: '/request/editor' },
        { name: 'Templates', link: '/request/templates' },
      ],
    }
  },
}
</script>

<style scoped>
.el-header {
  font-size: 12px;
  display: flex;
}
.el-header > div {
  margin: 0 20px;
}
</style>

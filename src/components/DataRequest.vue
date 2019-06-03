 <template>
  <div>
    <el-header style="font-size: 12px">
      <div>
        <router-link to="/request/editor">Editor</router-link>
      </div>
      <div>
        <router-link to="/request/templates">Templates</router-link>
      </div>
    </el-header>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'DataRequest',
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

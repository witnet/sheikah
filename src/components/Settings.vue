<template>
<div>
    <el-dropdown @command="handleCommand">
        <el-button split-button type="primary" >
        <font-awesome-icon class="icon" icon="cog"/>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(setting, index) in settings" :key="setting.label" :command="index">
            {{setting.label}}
          </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</div>
</template>

<script>
export default {
  name: 'Settings',
  props: {
    settings: Array,
  },
  methods: {
    handleCommand (index) {
      this.settings[index].action()
    },
  },
}
</script>

<style scoped lang="scss">
.el-dropdown-menu{
  padding: 5px 0;
}
.el-dropdown-menu__item {
  padding: 0px 10px;
  font-weight: bold;
  color:#909090;
  &:not(.is-disabled):hover{
    color: #1a6cfb;
    font-weight: bold;
  }
}
.el-button {
  cursor: pointer;
  background: none;
  color: inherit;
  border: none;
}
.icon{
  color: inherit;
  font-size: 18px;
}
.el-button, .el-dropdown-selfdefine :hover {
  cursor: pointer;
  background: none;
  color: inherit;
  border: none;

  &:hover .icon{
  background: none;
  border: none;
  }
}
.el-button--primary:focus, .el-button--primary:hover, .el-button--primary:active{
  background: none;
  color: inherit;
}
</style>

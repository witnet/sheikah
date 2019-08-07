<template>
  <div class="top-bar">
    <router-link class="back" to="/request/templates">
    <img class="back-btn" src="@/resources/svg/arrow-to-left.svg">
    </router-link>
    <button v-for="tab in tabs" :key="tab.icon" :class="tab.class" :to="tab.action">{{ tab.icon }}</button>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  methods:{
    tryDataRequest: function () {
      this.$store.dispatch('tryDataRequest')
    },
  },
  data(){
    return{
      tabs: [
        {icon: 'Redo', 
        action: 'redo changes' ,
        class:'end'
        },
        {icon: 'Undo', 
        action: 'Undo changes',
        class:'end'
        },
        {icon: 'Save', 
        action: 'Save changes',
        class:'end'
        },
        {icon: 'Try data request', 
        action: this.tryDataRequest,
        class:'end'
        }
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.top-bar{
  border-bottom: 1px solid $grey-4;
  display: flex;
  flex-flow: row wrap;
  height: 64px;
  justify-content: flex-end;

  .first, 
  .end {
    color: #b3b3b3;
    font-family: 'Titillium Web';
    font-weight: bold;
    font-size: 1em;
    padding: 20px;
    background-color: transparent;
    border: none;

    &:active,
    &:focus,
    &:hover {
      outline: none;
    }

    &:hover {
      cursor: pointer;
      background-color: #ecf5ff;
    }
  }

  .first {
    margin-right: auto;
  }

  .back {
    margin-right: auto;
    padding: 20px 30px 20px 30px;

    &:hover {
      background-color: #ecf5ff;
    }

    .back-btn {
      width: 20px;
    }
  }
} 
</style>
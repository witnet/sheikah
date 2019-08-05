<template>
  <div class="stage-bar">
    <button v-for="stage in stages" :key="stage.name" class="link-btn" @click="()=>changeStage(stage.name)">{{ stage.name }}</button>
  </div>
</template>

<script>
export default {
  name: 'StageBar',
  methods: {
    changeStage: function(stage){
      this.$emit('change-stage', stage)
    }
  },
  data(){
    return {
      stages: [
        {name: 'retrieve'},
        {name: 'aggregate'},
        {name: 'consensus'},
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.stage-bar {
  border-bottom: 1px solid $grey-4;
  display: flex;
  flex-flow: row wrap;
  height: 64px;
  justify-content: flex-start;
  padding-left: 20px;

  .link-btn {
    color: $grey-6;
    font-weight: bold;
    height: 64px;
    line-height: 25px;
    padding: 20px;
    text-decoration: none;
    border: none;

    .link-btn:active {
      outline: none;
      border-bottom: 2px solid $blue-6;
      color: $blue-6;
    }
  }
}

</style>

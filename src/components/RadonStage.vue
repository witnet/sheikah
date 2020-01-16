<template>
  <div class v-if="stage === 'retrieve'">
    <Carousel
      :sources="
        script.map((x, index) => {
          x.index = index
          return x
        })
      "
    />
  </div>
  <div v-else-if="stage === 'aggregate'">
    <RadonAggregateTallyScript
      class="script"
      v-show="!error.aggregate"
      stage="aggregate"
      :script="script"
    />
    <p class="error" v-show="error.aggregate">There is an error in the aggregate stage</p>
  </div>

  <div v-else-if="stage === 'tally'">
    <RadonAggregateTallyScript
      class="script"
      v-show="!error.tally"
      stage="tally"
      :script="script"
    />
    <p class="error" v-show="error.tally">There is an error in the tally stage</p>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import RadonAggregateTallyScript from '@/components/RadonAggregateTallyScript'

export default {
  name: 'RadonStage',
  components: {
    RadonAggregateTallyScript,
    Carousel,
  },
  props: {
    stage: String,
    script: [Array, Object],
  },
  data() {
    return {
      error: {
        retrieve: false,
        aggregate: false,
        tally: false,
      },
    }
  },
  methods: {
    pushRetrieve: function() {
      this.$store.commit('pushRetrieve')
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/fonts.scss';

.script {
  width: 300px;
}
*:focus {
  outline: none;
}

.query {
  padding: 24px;
}

.stage {
  display: flex;
  flex-direction: column;
  min-height: 100px;
}

.name {
  font-size: $font-size-30;
  font-weight: 200;
  color: lightgrey;
  margin: 16px 0;
}

.source {
  margin: 0 16px 16px 0;
}

.header {
  width: 300px;

  .tag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .text {
      font-size: 24px;
      font-weight: 800;
      margin: 0;
      padding: 0;
    }

    .number {
      color: $blue-6;
      font-weight: 800;
      font-size: 16px;
    }
  }

  .select {
    margin: 0 0 8px 0;
  }

  .input {
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 400;
    background-color: $blue-1;
    color: $grey-5;
    border: 1px solid $blue-0;
    width: 100%;
    padding: 8px;
  }
}

.error {
  color: lightcoral;
}

.sources {
  display: flex;
  margin: 16px;
}

.column {
  display: flex;
  flex-flow: column nowrap;
  margin: 24px;
}

.textarea {
  width: 400px;
}

.circle {
  outline: none;
  border: 2px solid grey;
  box-shadow: none;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  position: relative;
  margin: 0 40px;
  display: inline-block;
  vertical-align: middle;
  background: transparent;
}

.circle:before,
.circle:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.circle.plus:before,
.circle.plus:after {
  cursor: pointer;
  background: grey;
}
.circle.plus:before {
  width: 2px;
  margin: 8px auto;
}
.circle.plus:after {
  margin: auto 8px;
  height: 2px;
  box-shadow: none;
}
</style>

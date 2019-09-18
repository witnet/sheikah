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
    <p>Aggregate</p>
    <RadonScript class="script" v-show="!error.aggregate" stage="aggregate" :script="script" />
    <p class="error" v-show="error.aggregate">There is an error in the aggregate stage</p>
  </div>

  <div v-else-if="stage === 'tally'">
    <p>Tally</p>
    <RadonScript class="script" v-show="!error.tally" stage="tally" :script="script" />
    <p class="error" v-show="error.tally">There is an error in the tally stage</p>
  </div>
</template>

<script>
import RadonScript from '@/components/RadonScript.vue'
import Carousel from '@/components/Carousel'

export default {
  name: 'RadonStage',
  components: {
    RadonScript,
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
  margin: 10px 0;
}

.add-source {
  border-color: grey;
  color: grey;
  font-size: $font-size-12;
  font-weight: 800;
  height: 26px;
  line-height: 0%;
  padding: 0 5px;

  &:hover {
    color: lightgray;
    border-color: lightgrey;
  }
}

.source {
  margin: 0 10px 10px 0;
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
      color: #1a6cfb;
      font-weight: 800;
      font-size: 18px;
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
    background-color: #d2dffb;
    color: #4d4d4d;
    border: 1px solid #d2dffb;
    width: 100%;
    padding: 8px;
  }
}

.error {
  color: lightcoral;
}

.sources {
  display: flex;
  margin: 10px;
}

.column {
  display: flex;
  flex-flow: column nowrap;
  margin: 20px;
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
  margin: 3px auto;
}
.circle.plus:after {
  margin: auto 3px;
  height: 2px;
  box-shadow: none;
}
</style>

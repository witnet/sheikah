<template>
  <div v-if="stage === 'retrieve'" data-test="retrieve-script" class>
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
      v-show="!error.aggregate"
      data-test="aggregate-script"
      class="script"
      stage="aggregate"
      :script="script"
    />
    <p v-show="error.aggregate" class="error"
      >There is an error in the aggregate stage</p
    >
  </div>
  <div v-else-if="stage === 'tally'">
    <RadonAggregateTallyScript
      v-show="!error.tally"
      data-test="tally-script"
      class="script"
      stage="tally"
      :script="script"
    />
    <p v-show="error.tally" class="error"
      >There is an error in the tally stage</p
    >
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import RadonAggregateTallyScript from '@/components/RadonAggregateTallyScript'
import { mapMutations } from 'vuex'

export default {
  name: 'RadonStage',
  components: {
    RadonAggregateTallyScript,
    Carousel,
  },
  props: {
    stage: {
      type: String,
      default: '',
    },
    script: {
      type: [Array, Object],
      required: true,
    },
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
    ...mapMutations({
      pushRetrieve: 'pushRetrieve',
    }),
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
  color: lightgrey;
  font-size: $font-size-30;
  font-weight: 200;
  margin: 16px 0;
}

.source {
  margin: 0 16px 16px 0;
}

.header {
  width: 300px;

  .tag {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .text {
      font-size: 24px;
      font-weight: 800;
      margin: 0;
      padding: 0;
    }

    .number {
      color: $purple-4;
      font-size: 16px;
      font-weight: 800;
    }
  }

  .select {
    margin: 0 0 8px 0;
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
  background: transparent;
  border: 2px solid grey;
  border-radius: 100%;
  box-shadow: none;
  display: inline-block;
  height: 30px;
  margin: 0 40px;
  outline: none;
  position: relative;
  vertical-align: middle;
  width: 30px;
}

.circle::before,
.circle::after {
  bottom: 0;
  content: '';
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.circle.plus::before,
.circle.plus::after {
  background: grey;
  cursor: pointer;
}

.circle.plus::before {
  margin: 8px auto;
  width: 2px;
}

.circle.plus::after {
  box-shadow: none;
  height: 2px;
  margin: auto 8px;
}
</style>

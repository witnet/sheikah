<template>
  <div>
    <div v-for="(operator, index) in script" :key="operator.toString() + index">
      <RadonOperator
        :operator="operator"
        :stage="stage"
        :sourceIndex="sourceIndex"
        :showUnionIcon="index !== script.length - 1"
      />
    </div>
    <div class="button-container">
      <button class="add-operators-btn" @click="pushOperator()">
        Add operator
      </button>
    </div>
  </div>
</template>
<script>
import { PUSH_OPERATOR } from '@/store/mutation-types'
import RadonOperator from '@/components/RadonOperator'

export default {
  name: 'RadonScript',
  components: { RadonOperator },
  props: {
    stage: String,
    sourceIndex: Number,
    script: Array,
  },
  methods: {
    pushOperator() {
      this.$store.commit(PUSH_OPERATOR, { scriptId: this.script[0].scriptId })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.circle {
  outline: none;
  border: 2px solid grey;
  box-shadow: none;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  position: relative;
  margin: 16px 0;
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
.button-container {
  text-align: center;

  .add-operators-btn {
    cursor: pointer;
    margin: 32px;
    width: 150px;
    padding: 8px;
    font-size: 16px;
    background-color: $blue-6;
    border-radius: 5px;
    color: $white;
    font-family: 'Titillium Web';
    font-weight: bold;

    &:active,
    &:focus {
      outline: none;
    }
  }
}
</style>

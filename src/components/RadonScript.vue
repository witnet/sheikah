<template>
  <div>
    <div v-for="(operator, index) in script" :key="operator.toString() + index">
      <RadonOperator
        data-test="radon-operator"
        :operator="operator"
        :stage="stage"
        :scriptId="scriptId"
        :sourceIndex="sourceIndex"
        :showUnionIcon="index !== script.length - 1"
      />
    </div>
    <div class="button-container">
      <el-button data-test="add-operator-btn" @click="pushOperator" type="primary">
        Add operator
      </el-button>
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
    scriptId: Number,
  },
  methods: {
    pushOperator() {
      // TODO: get scriptId in a more consistent way
      this.$store.commit(PUSH_OPERATOR, {
        scriptId: this.script[0] ? this.script[0].scriptId : this.scriptId,
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.circle {
  outline: none;
  border: 2px solid $alt-grey-3;
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
  background: $alt-grey-3;
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
  margin-top: 16px;
  text-align: center;

  .add-operators-btn {
    cursor: pointer;
    margin: 32px;
    width: 150px;
    padding: 8px;
    font-size: 16px;
    background-color: $purple-4;
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

<template>
  <div class="radon-script">
    <div class="script-header">
      <p class="url">
        {{ url }} <span class="kind">({{ kind }})</span>
      </p>
    </div>
    <div class="icon-container">
      <img class="row sheikah-icon" src="@/resources/svg/operator-arrow.svg" />
    </div>
    <div v-for="(operator, index) in script" :key="operator.toString() + index">
      <RadonOperator
        data-test="radon-operator"
        :operator="operator"
        :stage="stage"
        :scriptId="scriptId"
        :sourceIndex="sourceIndex"
        :showOutputType="index !== script.length - 1"
        @add-operator="addOperator"
      />
    </div>
    <div class="script-footer">
      <p class="text">
        Return and past into aggregator
      </p>
    </div>
  </div>
</template>
<script>
import { PUSH_OPERATOR } from '@/store/mutation-types'
import RadonOperator from '@/components/RadonOperator'
import { mapMutations } from 'vuex'

export default {
  name: 'RadonScript',
  components: { RadonOperator },
  props: {
    stage: String,
    sourceIndex: Number,
    script: Array,
    scriptId: Number,
    kind: String,
    url: String,
  },
  methods: {
    ...mapMutations({
      pushOperator: PUSH_OPERATOR,
    }),
    addOperator() {
      // TODO: get scriptId in a more consistent way
      this.pushOperator({
        scriptId: this.script[0] ? this.script[0].scriptId : this.scriptId,
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
.script-header {
  border: $operator-dashed-border;
  display: flex;
  align-items: center;
  .url {
    margin: 16px;
    color: $grey-3;
    font-weight: medium;
    font-size: 14px;
    .kind {
      font-size: 12px;
    }
  }
}
.script-footer {
  border: $operator-dashed-border;
  display: flex;
  align-items: center;
  .text {
    margin: 16px;
    color: $grey-3;
    font-weight: medium;
    font-size: 14px;
  }
}
.icon-container {
  margin-left: 16px;
}
.radon-script {
  width: 100%;
  padding: 16px 24px;
}

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
    font-family: 'Roboto';
    font-weight: bold;

    &:active,
    &:focus {
      outline: none;
    }
  }
}
</style>

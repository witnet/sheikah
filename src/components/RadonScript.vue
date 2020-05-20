<template>
  <div class="radon-script">
    <div class="script-header">
      <p class="url">
        {{ url }} <span class="protocol">({{ protocol }})</span>
      </p>
    </div>
    <div class="icon-container">
      <img v-if="emptyScript" class="row sheikah-icon" src="@/resources/svg/long-arrow.svg" />
      <img v-else class="row sheikah-icon" src="@/resources/svg/operator-arrow.svg" />
      <div v-if="emptyScript" class="add-operator-container">
        <img @click="addOperator" class="add-operator" src="@/resources/svg/add-operator.svg" />
        <p class="add-operator-text">Click to add an operator</p>
      </div>
    </div>
    <div v-for="(operator, index) in script" :key="operator.toString() + index">
      <RadonOperator
        data-test="radon-operator"
        :operator="operator"
        :stage="stage"
        :script-id="scriptId"
        :source-index="sourceIndex"
        :show-output-type="index !== script.length - 1"
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
    stage: {
      type: String,
      default: '',
    },
    sourceIndex: {
      type: Number,
      required: true,
    },
    script: {
      type: Array,
      required: true,
    },
    scriptId: {
      type: Number,
      required: true,
    },
    protocol: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },
  computed: {
    emptyScript() {
      return this.script.length < 1
    },
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
  align-items: center;
  border: $operator-dashed-border;
  display: flex;

  .url {
    color: $grey-3;
    font-size: 14px;
    font-weight: medium;
    margin: 16px;

    .protocol {
      font-size: 12px;
    }
  }
}

.script-footer {
  align-items: center;
  border: $operator-dashed-border;
  display: flex;

  .text {
    color: $grey-3;
    font-size: 14px;
    font-weight: medium;
    margin: 16px;
  }
}

.icon-container {
  margin-left: 16px;
  position: relative;
  .add-operator-container {
    cursor: pointer;
    display: flex;
    position: absolute;
    width: max-content;
    bottom: 24px;
    left: -4px;
    .add-operator-text {
      margin-left: 16px;
      font-size: 12px;
      font-weight: medium;
      color: $grey-4;
    }
  }
}

.radon-script {
  padding: 16px 24px;
  width: 100%;
}

.circle {
  background: transparent;
  border: 2px solid $alt-grey-3;
  border-radius: 100%;
  box-shadow: none;
  display: inline-block;
  height: 30px;
  margin: 16px 0;
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
  background: $alt-grey-3;
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

.button-container {
  margin-top: 16px;
  text-align: center;

  .add-operators-btn {
    background-color: $purple-4;
    border-radius: 5px;
    color: $white;
    cursor: pointer;
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: bold;
    margin: 32px;
    padding: 8px;
    width: 150px;

    &:active,
    &:focus {
      outline: none;
    }
  }
}
</style>

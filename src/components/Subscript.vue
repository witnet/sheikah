<template>
  <div class="radon-script">
    <div class="operator-bottom">
      <div v-if="emptyScript" class="icon-container">
        <CustomIcon name="OperatorArrow" />
        <div @click="addOperator">
          <CustomIcon
            class-name="add-operator"
            data-test="add-operator"
            name="AddOperator"
          />
          <p class="add-operator-text">{{ $t('add_operator') }}</p>
        </div>
      </div>
    </div>
    <div class="operators">
      <div
        v-for="(operator, index) in script"
        :key="operator.toString() + index"
        class="operator-container"
      >
        <RadonOperator
          data-test="radon-operator"
          class="operator"
          :operator="operator"
          :script-id="scriptId"
          :show-output-type="index !== script.length - 1"
          :subscript="true"
          :operator-output="
            subscriptPartialResults && subscriptPartialResults[subscriptIndex]
              ? subscriptPartialResults[subscriptIndex][index + 1][0]
              : null
          "
          :hide-delete="index === 0"
          @add-operator="addOperator"
          @delete-operator="removeOperator(operator.scriptId, operator.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { PUSH_OPERATOR, DELETE_OPERATOR } from '@/store/mutation-types'
import CustomIcon from '@/components/CustomIcon.vue'

export default {
  name: 'Subscript',
  components: {
    RadonOperator: () => import('@/components/RadonOperator.vue'),
    CustomIcon,
  },
  props: {
    script: {
      type: Array,
      required: true,
    },
    scriptId: {
      type: Number,
      default: 2,
    },
    subscriptPartialResults: {
      type: Array,
      default: null,
    },
    subscriptId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState({
      subscriptIds: state => state.rad.subscriptIds,
      radRequestResult: state => state.rad.radRequestResult,
    }),
    subscriptIndex() {
      return this.subscriptIds.findIndex(id => id === this.subscriptId)
    },
    emptyScript() {
      return this.script.length < 1
    },
  },
  created() {
    this.setSubscriptId({ id: this.subscriptId })
  },
  beforeUnmount() {
    this.clearSubscriptIds()
  },
  methods: {
    ...mapMutations({
      pushOperator: PUSH_OPERATOR,
      deleteOperator: DELETE_OPERATOR,
      clearDataRequestResult: 'clearDataRequestResult',
      setSubscriptId: 'setSubscriptId',
      clearSubscriptIds: 'clearSubscriptIds',
    }),
    removeOperator(scriptId, operatorId) {
      this.deleteOperator({ scriptId, operatorId })
    },
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

.radon-script {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content;

  .operator-bottom {
    align-items: flex-start;
    display: flex;

    .icon-container {
      margin-left: 16px;
    }

    .output {
      margin-top: 16px;
    }
  }

  .operators {
    grid-column-end: -1;
    grid-column-start: 1;

    .operator-container {
      display: grid;
      grid-template-rows: min-content;
      margin: 16px;

      .operator {
        margin: 0 16px;
      }
    }
  }
}
</style>

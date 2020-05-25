<template>
  <div>
    <p>Filters</p>
    <div>
      <div
        v-for="(operator, index) in filters"
        :key="operator.toString() + index"
      >
        <RadonOperator
          :operator="operator"
          :stage="stage"
          :source-index="sourceIndex"
          :show-output-type="false"
          :show-union-icon="index !== filters.length - 1"
          :script-id="operator.scriptId"
        />
      </div>
      <div class="button-container">
        <button
          class="add-operators-btn"
          @click="pushOperator({ scriptId: reducer.scriptId })"
        >
          Add Filter
        </button>
      </div>
    </div>
    <p>Reducer</p>
    <RadonOperator
      :operator="reducer"
      :stage="stage"
      :source-index="sourceIndex"
      :show-output-type="false"
      :script-id="reducer.scriptId"
    />
  </div>
</template>

<script>
import { PUSH_OPERATOR } from '@/store/mutation-types'
import RadonOperator from '@/components/RadonOperator'
import { mapMutations } from 'vuex'

export default {
  name: 'RadonAggregateTallyScript',
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
      type: Object,
      required: true,
    },
  },
  computed: {
    filters() {
      return this.script.filters
    },
    reducer() {
      return this.script.reducer
    },
  },
  methods: {
    ...mapMutations({
      pushOperator: PUSH_OPERATOR,
    }),
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.circle {
  background: transparent;
  border: 2px solid $alt-grey-5;
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
  background: $alt-grey-5;
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

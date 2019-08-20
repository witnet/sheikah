<template>
  <div>
    <div v-for="(operator, index) in script" :key="operator.toString() + index">
      <RadonOperator :operator="operator" :stage="{ ...stage, sourceIndex: index }" />
    </div>
    <div class="button-container">
      <button class="add-operators-btn" @click="pushOperator()">
        Add operators
      </button>
    </div>
  </div>
</template>
<script>
import RadonOperator from '@/components/RadonOperator'

export default {
  name: 'RadonScript',
  components: { RadonOperator },
  props: {
    stage: String,
    sourceIndex: Number,
    script: Array,
  },
  data() {
    return {}
  },
  methods: {
    pushOperator() {
      console.log('stage---->', this.stage)
      console.log('source index---->', this.sourceIndex)
      this.$store.commit('pushOperator', { stage: this.stage, sourceIndex: this.sourceIndex })
    },
  },
}
</script>

<style scoped lang="scss">
.circle {
  outline: none;
  border: 2px solid grey;
  box-shadow: none;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  position: relative;
  margin: 20px 0;
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
.button-container {
  text-align: center;

  .add-operators-btn {
    cursor: pointer;
    margin: 30px;
    width: 150px;
    padding: 5px;
    font-size: 18px;
    background-color: #1a6cfb;
    border-radius: 5px;
    color: white;
    font-family: 'Titillium Web';
    font-weight: bold;

    &:active,
    &:focus {
      outline: none;
    }
  }
}
</style>

<template>
  <div class="query">
    <div class="stage">
      <div class="sources">
        <div v-for="(source, index) in retrieve" class="source" :key="source.kind+index">
          <div class="header">
            <div class="tag">
              <p class="text">SOURCE</p>
              <p class="text">#{{ index }}</p>
            </div>
            <div class="request-type">
              <select class="select">
                <option value="HTTPS_GET">HTTPS GET</option>
              </select>
              <input class="input" placeholder="url" type="text" v-model="source.url">
            </div>
          </div>
          <div>
            <RadonScript
              class="script"
              v-show="!error.retrieve"
              :path="{stage: 'retrieve', retrieveIndex: index}"
              :script="source.script"
            />
            <p class="error" v-show="error.retrieve">There is an error in the retrieve stage</p>
          </div>
        </div>
        <div>
          <Button class="add-source" type="dashed" :onClick="pushRetrieve">+ ADD SOURCE</button>
        </div>
      </div>
      <p class="name">Retrieval</p>
    </div>

    <div class="stage">
      <RadonScript
        class="script"
        v-show="!error.aggregate"
        :path="{stage: 'aggregate'}"
        :script="aggregate.script"
      />
      <p class="error" v-show="error.aggregate">There is an error in the aggregate stage</p>
      <p class="name">Aggregation</p>
    </div>

    <div class="stage">
      <RadonScript
        class="script"
        v-show="!error.consensus"
        :path="{stage: 'consensus'}"
        :script="consensus.script"
      />
      <p class="error" v-show="error.consensus">There is an error in the consensus stage</p>
      <p class="name">Consensus</p>
    </div>
    <div class="stage">
      <input class="deliver" placeholder="url">
        <p class="name">Deliver</p>
      <div class>
      </div>
    </div>
    <div>
      <p>Retrieval</p>
      <textarea
        class="textarea"
        :value="JSON.stringify(retrieve)"
        v-on:keyup.enter="e => updateStage(e, 'retrieve')"
      />
      <p>Aggregation</p>
      <textarea
        class="textarea"
        :value="JSON.stringify(aggregate)"
        v-on:keyup.enter="e => updateStage(e, 'aggregate')"
      />
      <p>Consensus</p>
      <textarea
        class="textarea"
        :value="JSON.stringify(consensus)"
        v-on:keyup.enter="e => updateStage(e, 'consensus')"
      />

      <button @click="tryDataRequest">Try data request</button>
    </div>
  The result of the data request is:
  {{ radRequestResult }}

  </div>
</template>

<script>
import { mapState } from 'vuex'

import RadonScript from '@/components/RadonScript.vue'
import Button from '@/components/Button.vue'

import {
  HashFunctionCodes,
  ReducingFunctionCodes,
  FilteringFunctionCodes,
} from '@/radon'

export default {
  name: 'RadonQuery',
  components: {
    RadonScript,
    Button,
  },
  props: {
    radRequest: Object,
  },
  data () {
    return {
      error: {
        retrieve: false,
        aggregate: false,
        consensus: false,
      },
    }
  },
  methods: {
    tryDataRequest: function () {
      this.$store.dispatch('tryDataRequest')
    },

    updateStage: function (event, stage) {
      try {
        const result = JSON.parse(event.target.value)
        this[stage] = result
        this.error[stage] = false
      } catch (err) {
        this.error[stage] = true
      }
    },
    pushRetrieve: function () {
      this.$store.commit('pushRetrieve')
    },
  },
  computed: {
    ...mapState({
      radRequestError: state => state.wallet.dataRequestError,
      radRequestResult: state => state.wallet.radRequestResult,
      retrieve: state => state.rad.radRequest.retrieve,
      aggregate: state => state.rad.radRequest.aggregate,
      consensus: state => state.rad.radRequest.consensus,
      deliver: state => state.rad.radRequest.deliver,
    }),
    hashFunctionCodes: function () {
      return Object.entries(HashFunctionCodes)
        .slice(0, Object.entries(HashFunctionCodes).length / 2)
    },
    filteringFunctionCodes: function () {
      return Object.entries(FilteringFunctionCodes)
        .slice(0, Object.entries(FilteringFunctionCodes).length / 2)
    },
    reducingFunctionCodes: function () {
      return Object.entries(ReducingFunctionCodes)
        .slice(0, Object.entries(ReducingFunctionCodes).length / 2)
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/fonts.scss';
.script {
  width: 300px;
}
.deliver {
  width: 300px;
  margin: 20px 0;
  height: 30px;
}
*:focus {
  outline: none;
}

.query {
  padding: 24px;
}

.stage {
  display: flex;
  min-height: 100px;
  border-bottom: 2px dashed lightgrey;
  justify-content: space-between;
}

.name {
  font-size: $font-size-30;
  font-weight: 200;
  color: lightgrey;
  margin: 10px 0;
}

.add-source {
  font-size: $font-size-12;
  color: grey;
  border-color: grey;
  padding: 0 5px;
  height: 26px;
  line-height: 0%;
  font-weight: 800;

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
  border: 1px solid grey;
  border-radius: 2%;

  .tag {
    border: 1px solid grey;
    display: flex;
    justify-content: space-between;
    background: grey;
    padding: 0 5px;

    .text {
      color:white;
      font-weight: 800;
      margin: 0;
      padding: 0;
    }
  }

  .request-type {
    display: flex;
    flex-direction: column;
    padding: 10px;

    .select {
      cursor: pointer;
      width: 100px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 400;
      height: 32px;
      line-height: 1.5;
      padding: 0 15px;
      text-align: center;
      background-color:white;
      color: grey;
      margin-bottom: 10px;
    }

    .input {
      border-radius: 4px;
      font-size: 14px;
      font-weight: 400;
      height: 32px;
      line-height: 1.5;
      padding: 0 15px;
      background-color:white;
      color: grey;
      border: 1px solid grey;
    }
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
</style>
